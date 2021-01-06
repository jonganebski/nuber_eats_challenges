import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class DeleteEpisodeInput {
  @Field(() => Number)
  episodeId: number;
}

@ObjectType()
export class DeleteEpisodeOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
