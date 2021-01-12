import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Users } from '../entities/user.entity';

@InputType()
export class SeeProfileInput extends PickType(Users, ['id']) {}

@ObjectType()
export class SeeProfileOutput {
  @Field(() => Users, { nullable: true })
  user?: Users;

  @Field(() => String, { nullable: true })
  err?: string;
}
