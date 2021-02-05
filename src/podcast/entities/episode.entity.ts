import { ObjectType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Podcast } from "./podcast.entity";

@Entity()
@ObjectType()
export class Episode extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  description: string;

  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    onDelete: "CASCADE",
    eager: true,
  })
  @Field((type) => Podcast)
  podcast: Podcast;
}
