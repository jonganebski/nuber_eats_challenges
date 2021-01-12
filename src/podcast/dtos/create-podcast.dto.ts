import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
  'title',
  'category',
  'about',
]) {}

@ObjectType()
export class CreatePodcastOutput {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  err?: string;
}
