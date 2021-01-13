import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { Users } from 'src/user/entities/user.entity';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from './dtos/delete-podcast.dto';
import { GetPodcastInput, GetPodcastOutput } from './dtos/see-podcast.dto';
import { AllPodcastsOutput } from './dtos/see-podcasts.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Role(['Any'])
  @Query(() => AllPodcastsOutput)
  getPodcasts(): Promise<AllPodcastsOutput> {
    return this.podcastsService.getPodcasts();
  }

  @Role(['Host'])
  @Mutation(() => CreatePodcastOutput)
  createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Role(['Any'])
  @Query(() => GetPodcastOutput)
  getPodcast(
    @Args('input') getPodcastInput: GetPodcastInput,
  ): Promise<GetPodcastOutput> {
    return this.podcastsService.getPodcast(getPodcastInput);
  }

  @Role(['Host'])
  @Mutation(() => UpdatePodcastOutput)
  updatePodcast(
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): Promise<UpdatePodcastOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }

  @Role(['Host'])
  @Mutation(() => DeletePodcastOutput)
  deletePodcast(
    @AuthUser() user: Users,
    @Args('input') deletePodcastInput: DeletePodcastInput,
  ): Promise<DeletePodcastOutput> {
    return this.podcastsService.deletePodcast(user, deletePodcastInput);
  }
}
