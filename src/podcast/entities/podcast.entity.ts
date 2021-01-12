import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Users } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Episode } from '../../episode/entities/episode.entity';

@InputType('PodcastInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast {
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

  @Field(() => String)
  @Column()
  @IsString()
  category: string;

  @Field(() => String)
  @Column({ default: '' })
  @IsString()
  about: string;

  @Field(() => Number)
  @Column({ default: 0 })
  @IsNumber()
  rating: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  coverUrl?: string;

  @Field(() => Users)
  @ManyToOne(() => Users, (users) => users.podcasts, { onDelete: 'CASCADE' })
  host: Users;

  @Field(() => Users)
  @ManyToOne(() => Users, (users) => users.subscribed, {
    onDelete: 'NO ACTION',
  })
  subscriber: Users;

  @Field(() => [Episode])
  @OneToMany(() => Episode, (episode) => episode.podcast)
  episodes: Episode[];
}
