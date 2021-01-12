import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { PodcastsService } from 'src/podcast/podcasts.service';
import { Users } from 'src/user/entities/user.entity';
import {
  CreateEpisodeOutput,
  CreateEpisodeInput,
} from './dtos/create-episode.dto';
import {
  DeleteEpisodeOutput,
  DeleteEpisodeInput,
} from './dtos/delete-episode.dto';
import { GetEpisodesOutput, GetEpisodesInput } from './dtos/get-episodes.dto';
import {
  UpdateEpisodeOutput,
  UpdateEpisodeInput,
} from './dtos/update-episode.dto';
import { Episode } from './entities/episode.entity';
import { EpisodesService } from './episodes.service';

@Resolver(() => Episode)
export class EpisodesResolver {
  constructor(private readonly episodesService: EpisodesService) {}

  @Role(['Any'])
  @Query(() => GetEpisodesOutput)
  getEpisodes(
    @Args('input') getEpisodesInput: GetEpisodesInput,
  ): Promise<GetEpisodesOutput> {
    return this.episodesService.getEpisodes(getEpisodesInput);
  }

  @Role(['Host'])
  @Mutation(() => CreateEpisodeOutput)
  createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.episodesService.createEpisode(createEpisodeInput);
  }

  @Role(['Host'])
  @Mutation(() => UpdateEpisodeOutput)
  updateEpisode(
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<UpdateEpisodeOutput> {
    return this.episodesService.updateEpisode(updateEpisodeInput);
  }

  @Role(['Host'])
  @Mutation(() => DeleteEpisodeOutput)
  deleteEpisode(
    @AuthUser() user: Users,
    @Args('input') deleteEpisodeInput: DeleteEpisodeInput,
  ): Promise<DeleteEpisodeOutput> {
    return this.episodesService.deleteEpisode(user.id, deleteEpisodeInput);
  }
}
