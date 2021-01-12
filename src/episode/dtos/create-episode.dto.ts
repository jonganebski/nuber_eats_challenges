import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class CreateEpisodeInput extends PickType(Episode, [
  'title',
  'category',
]) {
  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class CreateEpisodeOutput {
  @Field(() => Number, { nullable: true })
  episodeId?: number;

  @Field(() => String, { nullable: true })
  err?: string;
}
