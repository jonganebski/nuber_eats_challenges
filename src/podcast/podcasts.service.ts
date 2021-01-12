import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from './dtos/delete-podcast.dto';
import { GetPodcastInput, GetPodcastOutput } from './dtos/get-podcast.dto';
import { AllPodcastsOutput } from './dtos/get-podcasts.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private readonly podcasts: Repository<Podcast>,
  ) {}

  async getPodcasts(): Promise<AllPodcastsOutput> {
    try {
      const podcasts = await this.podcasts.find();
      return { podcasts };
    } catch {
      return { err: 'Failed to get podcasts.' };
    }
  }

  async createPodcast({
    title,
    category,
    about,
  }: CreatePodcastInput): Promise<CreatePodcastOutput> {
    try {
      const { id } = await this.podcasts.save(
        this.podcasts.create({ title, category, about }),
      );
      return { id };
    } catch {
      return { err: 'Failed to create podcast.' };
    }
  }

  async getPodcast({ id }: GetPodcastInput): Promise<GetPodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne(
        { id },
        { relations: ['episodes'] },
      );
      return { podcast };
    } catch {
      return { err: 'Failed to get podcast.' };
    }
  }

  async deletePodcast(
    user: Users,
    { id }: DeletePodcastInput,
  ): Promise<DeletePodcastOutput> {
    try {
      const { podcast, err: findErr } = await this.getPodcast({ id });
      if (findErr) {
        return { err: findErr };
      }
      if (podcast.host.id !== user.id) {
        return { err: 'You are not authorized.' };
      }
      await this.podcasts.delete({ id });
      return {};
    } catch {
      return {};
    }
  }

  async updatePodcast({
    podcastId,
    ...update
  }: UpdatePodcastInput): Promise<UpdatePodcastOutput> {
    try {
      const { podcast, err: findErr } = await this.getPodcast({
        id: podcastId,
      });
      if (findErr) {
        return { err: findErr };
      }
      await this.podcasts.save([{ ...podcast, ...update }]);
      return {};
    } catch {
      return { err: 'Failed to update podcast.' };
    }
  }
}
