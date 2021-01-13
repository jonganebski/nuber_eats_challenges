import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(6)
  password: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}

@ObjectType()
export class CreateAccountOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
