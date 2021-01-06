import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class DeletePodcastInput extends PickType(Podcast, ['id']) {}

@ObjectType()
export class DeletePodcastOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
