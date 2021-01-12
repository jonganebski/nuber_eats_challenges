import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class UpdatePodcastInput extends PartialType(
  OmitType(Podcast, ['id', 'episodes']),
) {
  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class UpdatePodcastOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
