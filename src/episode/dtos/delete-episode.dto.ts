import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class DeleteEpisodeInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class DeleteEpisodeOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
