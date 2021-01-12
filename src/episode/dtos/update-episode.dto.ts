import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { Episode } from '../entities/episode.entity';

@InputType()
export class UpdateEpisodeInput extends PartialType(
  OmitType(Episode, ['id', 'podcast']),
) {
  @Field(() => Number)
  @IsNumber()
  episodeId: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  podcastId?: number;
}

@ObjectType()
export class UpdateEpisodeOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
