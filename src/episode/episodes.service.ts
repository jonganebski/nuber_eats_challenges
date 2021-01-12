import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PodcastsService } from 'src/podcast/podcasts.service';
import { Repository } from 'typeorm';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from './dtos/delete-episode.dto';
import { GetEpisodeInput, GetEpisodeOutput } from './dtos/get-episode.dto';
import { GetEpisodesInput, GetEpisodesOutput } from './dtos/get-episodes.dto';
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from './dtos/update-episode.dto';
import { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode) private readonly episodes: Repository<Episode>,
    private readonly podcastsService: PodcastsService,
  ) {}

  async createEpisode({
    podcastId,
    title,
    category,
  }: CreateEpisodeInput): Promise<CreateEpisodeOutput> {
    try {
      const { podcast, err: findErr } = await this.podcastsService.getPodcast({
        id: podcastId,
      });
      if (findErr) {
        return { err: findErr };
      }
      const { id: episodeId } = await this.episodes.save(
        this.episodes.create({ title, category, podcast }),
      );
      return { episodeId };
    } catch {
      return { err: 'Failed to create episode.' };
    }
  }

  async getEpisodes({
    podcastId,
  }: GetEpisodesInput): Promise<GetEpisodesOutput> {
    try {
      const { podcast, err } = await this.podcastsService.getPodcast({
        id: podcastId,
      });
      if (err) {
        return { err };
      }
      return { episodes: podcast.episodes };
    } catch {
      return { err: 'Failed to get episodes.' };
    }
  }

  async getEpisode({ id }: GetEpisodeInput): Promise<GetEpisodeOutput> {
    try {
      const episode = await this.episodes.findOne(
        { id },
        { relations: ['podcast', 'podcast.host'] },
      );
      return { episode };
    } catch {
      return { err: 'Failed to get episode.' };
    }
  }

  async deleteEpisode(
    userId: number,
    { id }: DeleteEpisodeInput,
  ): Promise<DeleteEpisodeOutput> {
    try {
      const { episode, err: findErr } = await this.getEpisode({ id });
      if (findErr) {
        return { err: findErr };
      }
      if (episode.podcast.host.id !== userId) {
        return { err: 'You are not authorized.' };
      }
      await this.episodes.delete({ id });
      return {};
    } catch {
      return {};
    }
  }

  async updateEpisode({
    episodeId,
    podcastId,
    ...update
  }: UpdateEpisodeInput): Promise<UpdateEpisodeOutput> {
    try {
      const episode = await this.episodes.findOne({ id: episodeId });
      if (podcastId) {
        const {
          podcast,
          err: podcastFindErr,
        } = await this.podcastsService.getPodcast({ id: podcastId });
        if (podcastFindErr) {
          return { err: podcastFindErr };
        }
        episode.podcast = podcast;
      }
      await this.episodes.save([{ ...episode, ...update }]);
      return {};
    } catch {
      return { err: 'Failed to update episode.' };
    }
  }
}
