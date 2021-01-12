import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { Podcast } from 'src/podcast/entities/podcast.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  Host = 'Host',
  Listener = 'Listener',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Users {
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch {
        throw new InternalServerErrorException();
      }
    }
  }

  async verifyPassword(
    password: string,
  ): Promise<{ result?: boolean; err?: string }> {
    try {
      const result = await bcrypt.compare(password, this.password);
      return { result };
    } catch {
      return { err: 'Failed to verity password.' };
    }
  }

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
  @Column({ unique: true })
  @IsString()
  email: string;

  @Field(() => String)
  @Column({ select: false })
  @IsString()
  password: string;

  @Field(() => String)
  @Column()
  @IsString()
  username: string;

  @Field(() => UserRole)
  @Column({ type: 'simple-enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => [Podcast])
  @OneToMany(() => Podcast, (podcast) => podcast.host)
  podcasts: Podcast[];

  @Field(() => [Podcast])
  @OneToMany(() => Podcast, (podcast) => podcast.subscriber)
  subscribed: Podcast[];
}
