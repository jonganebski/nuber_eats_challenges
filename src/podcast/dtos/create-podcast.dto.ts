import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
  'title',
  'category',
]) {}

@ObjectType()
export class CreatePodcastOutput {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  err?: string;
}
