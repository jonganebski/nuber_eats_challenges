import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class UpdatePodcastInput extends PartialType(
  PickType(Podcast, ['title', 'category', 'rating', 'episodes']),
) {
  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class UpdatePodcastOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
