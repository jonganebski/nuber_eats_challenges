import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Users } from '../entities/user.entity';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(Users, ['email', 'username']),
) {}

@ObjectType()
export class EditProfileOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
