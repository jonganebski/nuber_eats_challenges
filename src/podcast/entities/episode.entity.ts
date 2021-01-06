import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('EpisodeInputType', { isAbstract: true })
@ObjectType()
export class Episode {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;

  @Field(() => Number)
  rating: number;
}
