import { Episode } from "./episode.entity";
import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";
import { IsString, Min, Max, IsNumber, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, ManyToOne, RelationId } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Review } from "./review.entity";
import { User } from "../../users/entities/user.entity";

export enum Categories {
  Flex = "Flex",
  TVAndFilm = "TV & Film",
  Health = "Health",
  Arts = "Arts",
  Technology = "Technology",
  Business = "Business",
  Education = "Education",
  SportsAndRecreation = "Sports & Recreation",
  NewsAndPolitics = "News & Politics",
  Comedy = "Comedy",
  SocietyAndCulture = "Society & Culture",
}

registerEnumType(Categories, { name: "Categories" });

@Entity()
@ObjectType()
export class Podcast extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column({ type: "simple-enum", enum: Categories })
  @Field((type) => Categories)
  category: Categories;

  @Column({ default: "" })
  @Field(() => String, { defaultValue: "" })
  @IsString()
  @MaxLength(500)
  description: string;

  @Column({ default: 0 })
  @Field((type) => Number, { defaultValue: 0 })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.podcasts, {
    onDelete: "CASCADE",
  })
  creator: User;

  @RelationId((podcast: Podcast) => podcast.creator)
  creatorId: number;

  @OneToMany(() => Episode, (episode) => episode.podcast)
  @Field((type) => [Episode])
  episodes: Episode[];

  @OneToMany(() => Review, (review) => review.podcast)
  @Field((type) => [Review])
  reviews: Review[];
}
