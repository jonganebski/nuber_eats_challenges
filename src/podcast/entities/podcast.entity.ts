import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Episode } from './episode.entity';

@InputType('PodcastInputType', { isAbstract: true })
@ObjectType()
export class Podcast {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;

  @Field(() => Number)
  rating: number;

  @Field(() => [Episode])
  episodes: Episode[];
}
