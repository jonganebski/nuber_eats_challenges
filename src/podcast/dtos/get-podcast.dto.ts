import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class GetPodcastInput extends PickType(Podcast, ['id']) {}

@ObjectType()
export class GetPodcastOutput {
  @Field(() => Podcast, { nullable: true })
  podcast?: Podcast;

  @Field(() => String, { nullable: true })
  err?: string;
}
