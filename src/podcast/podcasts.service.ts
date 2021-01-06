import { Injectable } from '@nestjs/common';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from './dtos/delete-episode.dto';
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from './dtos/delete-podcast.dto';
import { GetEpisodesInput, GetEpisodesOutput } from './dtos/get-episodes.dto';
import { GetPodcastInput, GetPodcastOutput } from './dtos/get-podcast.dto';
import { AllPodcastsOutput } from './dtos/get-podcasts.dto';
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from './dtos/update-episode.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getPodcasts(): AllPodcastsOutput {
    return { podcasts: this.podcasts, err: null };
  }

  createPodcast({ title, category }: CreatePodcastInput): CreatePodcastOutput {
    const id = Date.now();
    this.podcasts.push({ id, title, category, rating: 0, episodes: [] });
    return { id, err: null };
  }

  getPodcast({ id }: GetPodcastInput): GetPodcastOutput {
    const foundPodcasts = this.podcasts.filter((podcast) => podcast.id === id);
    if (foundPodcasts.length === 0) {
      return { podcast: null, err: 'Podcast not found.' };
    }
    if (foundPodcasts.length === 1) {
      return { podcast: foundPodcasts[0], err: null };
    }
    if (foundPodcasts.length > 2) {
      return { podcast: null, err: 'More than one items with same id.' };
    }
  }

  deletePodcast({ id }: DeletePodcastInput): DeletePodcastOutput {
    this.podcasts = this.podcasts.filter((p) => p.id !== +id);
    return { err: null };
  }

  updatePodcast({
    podcastId,
    ...update
  }: UpdatePodcastInput): UpdatePodcastOutput {
    const { podcast, err: findErr } = this.getPodcast({ id: podcastId });
    if (findErr) {
      return { err: findErr };
    }
    const { err: deleteErr } = this.deletePodcast({ id: podcastId });
    if (deleteErr) {
      return { err: deleteErr };
    }
    this.podcasts.push({ ...podcast, ...update });
    return { err: null };
  }

  getEpisodes({ podcastId }: GetEpisodesInput): GetEpisodesOutput {
    const { podcast, err } = this.getPodcast({ id: podcastId });
    if (err) {
      return { episodes: null, err };
    }
    return { episodes: podcast.episodes, err: null };
  }

  createEpisode({
    podcastId,
    title,
    category,
  }: CreateEpisodeInput): CreateEpisodeOutput {
    const { podcast, err: findErr } = this.getPodcast({ id: podcastId });
    if (findErr) {
      return { episodeId: null, err: findErr };
    }
    const episodeId = Date.now();
    const newEpisode: Episode = { id: episodeId, title, category, rating: 0 };
    const { err } = this.updatePodcast({
      podcastId,
      ...podcast,
      episodes: [...podcast.episodes, newEpisode],
    });
    if (err) {
      return { episodeId: null, err };
    }
    return { episodeId, err: null };
  }

  findEpisode(
    episodeId: number,
  ): { podcastId: number | null; episode: Episode | null; err: string | null } {
    let podcastId: number;
    let episode: Episode;
    for (let i = 0; i < this.podcasts.length; i++) {
      const foundEpisode = this.podcasts[i].episodes.find(
        (episode) => episode.id === episodeId,
      );
      if (foundEpisode) {
        podcastId = this.podcasts[i].id;
        episode = foundEpisode;
        break;
      }
    }
    if (!episode) {
      return { podcastId: null, episode: null, err: 'Episode not found' };
    }
    return { podcastId, episode, err: null };
  }

  deleteEpisode({ episodeId }: DeleteEpisodeInput): DeleteEpisodeOutput {
    const { podcastId, err: findEpisodeErr } = this.findEpisode(episodeId);
    if (findEpisodeErr) {
      return { err: findEpisodeErr };
    }
    const { podcast, err: findErr } = this.getPodcast({ id: podcastId });
    if (findErr) {
      return { err: findErr };
    }
    const { err } = this.updatePodcast({
      podcastId,
      episodes: podcast.episodes.filter((episode) => episode.id !== +episodeId),
    });
    if (err) {
      return { err };
    }
    return { err: null };
  }

  updateEpisode({
    episodeId,
    ...update
  }: UpdateEpisodeInput): UpdateEpisodeOutput {
    const { podcastId, episode, err: findEpisodeErr } = this.findEpisode(
      episodeId,
    );
    if (findEpisodeErr) {
      return { err: findEpisodeErr };
    }
    const { err: deleteErr } = this.deleteEpisode({ episodeId });
    if (deleteErr) {
      return { err: deleteErr };
    }
    const { podcast, err: fundPodcastErr } = this.getPodcast({ id: podcastId });
    if (fundPodcastErr) {
      return { err: fundPodcastErr };
    }
    this.updatePodcast({
      podcastId,
      ...podcast,
      episodes: [...podcast.episodes, { ...episode, ...update }],
    });
    return { err: null };
  }
}
