import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => AllPodcastsOutput)
  getPodcasts(): AllPodcastsOutput {
    return this.podcastsService.getPodcasts();
  }

  @Mutation(() => CreatePodcastOutput)
  createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput,
  ): CreatePodcastOutput {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query(() => GetPodcastOutput)
  getPodcast(
    @Args('input') getPodcastInput: GetPodcastInput,
  ): GetPodcastOutput {
    return this.podcastsService.getPodcast(getPodcastInput);
  }

  @Mutation(() => UpdatePodcastOutput)
  updatePodcast(
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): UpdatePodcastOutput {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }

  @Mutation(() => DeletePodcastOutput)
  deletePodcast(
    @Args('input') deletePodcastInput: DeletePodcastInput,
  ): DeletePodcastOutput {
    return this.podcastsService.deletePodcast(deletePodcastInput);
  }
}

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query(() => GetEpisodesOutput)
  getEpisodes(
    @Args('input') getEpisodesInput: GetEpisodesInput,
  ): GetEpisodesOutput {
    return this.podcastService.getEpisodes(getEpisodesInput);
  }

  @Mutation(() => CreateEpisodeOutput)
  createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): CreateEpisodeOutput {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Mutation(() => UpdateEpisodeOutput)
  updateEpisode(
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): UpdateEpisodeOutput {
    return this.podcastService.updateEpisode(updateEpisodeInput);
  }

  @Mutation(() => DeleteEpisodeOutput)
  deleteEpisode(
    @Args('input') deleteEpisodeInput: DeleteEpisodeInput,
  ): DeleteEpisodeOutput {
    return this.podcastService.deleteEpisode(deleteEpisodeInput);
  }
}
