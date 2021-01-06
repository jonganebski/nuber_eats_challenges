import { Field, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@ObjectType()
export class AllPodcastsOutput {
  @Field(() => [Podcast])
  podcasts: Podcast[];

  @Field(() => String, { nullable: true })
  err?: string;
}
