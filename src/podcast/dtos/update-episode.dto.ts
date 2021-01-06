import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class UpdateEpisodeInput extends PartialType(
  PickType(Episode, ['title', 'category', 'rating']),
) {
  @Field(() => Number)
  episodeId: number;
}

@ObjectType()
export class UpdateEpisodeOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
