import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastsModule } from 'src/podcast/podcasts.module';
import { Episode } from './entities/episode.entity';
import { EpisodesResolver } from './episodes.resolver';
import { EpisodesService } from './episodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode]), PodcastsModule],
  providers: [EpisodesResolver, EpisodesService],
})
export class EpisodesModule {}
