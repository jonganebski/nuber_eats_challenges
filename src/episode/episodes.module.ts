import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from 'src/podcast/entities/podcast.entity';
import { PodcastsModule } from 'src/podcast/podcasts.module';
import { PodcastsResolver } from 'src/podcast/podcasts.resolver';
import { PodcastsService } from 'src/podcast/podcasts.service';
import { Episode } from './entities/episode.entity';
import { EpisodesResolver } from './episodes.resolver';
import { EpisodesService } from './episodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode]), PodcastsModule],
  providers: [EpisodesResolver, EpisodesService],
})
export class EpisodesModule {}
