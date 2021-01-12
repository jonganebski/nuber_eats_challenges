import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Users } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(Users, ['email', 'password']) {}

@ObjectType()
export class LoginOutput {
  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => String, { nullable: true })
  err?: string;
}
