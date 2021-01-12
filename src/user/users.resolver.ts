import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import {
  DeleteAccountInput,
  DeleteAccountOutput,
} from './dtos/delete-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { SeeProfileInput, SeeProfileOutput } from './dtos/see-profile.dto';
import { Users } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Role(['Any'])
  @Query(() => Users)
  me(@AuthUser() user: Users) {
    return user;
  }

  @Role(['Any'])
  @Query(() => SeeProfileOutput)
  seeProfile(@Args('input') seeProfileInput: SeeProfileInput) {
    return this.usersService.seeProfile(seeProfileInput);
  }

  @Mutation(() => CreateAccountOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Role(['Any'])
  @Mutation(() => EditProfileOutput)
  editProfile(
    @AuthUser() user: Users,
    @Args('input') EditProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(user.id, EditProfileInput);
  }

  @Role(['Any'])
  @Mutation(() => DeleteAccountOutput)
  deleteAccount(
    @AuthUser() user: Users,
    @Args('input') deleteAccountInput: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    return this.usersService.deleteAccount(user, deleteAccountInput);
  }
}
