import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class GetEpisodesInput {
  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class GetEpisodesOutput {
  @Field(() => [Episode], { nullable: true })
  episodes?: Episode[];

  @Field(() => String, { nullable: true })
  err?: string;
}
