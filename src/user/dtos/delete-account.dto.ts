import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Users } from '../entities/user.entity';

@InputType()
export class DeleteAccountInput extends PickType(Users, ['password']) {}

@ObjectType()
export class DeleteAccountOutput {
  @Field(() => String, { nullable: true })
  err?: string;
}
