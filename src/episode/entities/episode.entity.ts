import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Podcast } from 'src/podcast/entities/podcast.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@InputType('EpisodeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  @IsString()
  title: string;

  @Field(() => Number)
  @Column({ default: 0 })
  @IsNumber()
  rating: number;

  @Field(() => String)
  @Column({ default: '' })
  @IsString()
  about: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  url?: string;

  @Field(() => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  podcast: Podcast;
}
