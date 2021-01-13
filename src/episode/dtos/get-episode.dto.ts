import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class GetEpisodeInput extends PickType(Episode, ['id']) {}

@ObjectType()
export class GetEpisodeOutput {
  @Field(() => Episode, { nullable: true })
  episode?: Episode;

  @Field(() => String, { nullable: true })
  err?: string;
}
