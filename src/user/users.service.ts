import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: number): Promise<{ user?: Users; err?: string }> {
    try {
      const user = await this.users.findOne({ id });
      if (!user) {
        return { err: 'User not found' };
      }
      return { user };
    } catch {
      return { err: 'Failed to find user.' };
    }
  }

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const existingUser = await this.users.findOne({ email });
      if (existingUser) {
        return { err: 'This email already exists.' };
      }
      const username = email.split('@')[0];
      await this.users.save(
        this.users.create({ email, password, username, role }),
      );
      return {};
    } catch {
      return { err: 'Failed to create account.' };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return { err: 'User not found.' };
      }
      if (!user.verifyPassword(password)) {
        return { err: 'Wrong password.' };
      }
      const token = await this.jwtService.signToken(user.id);
      return { token };
    } catch {
      return { err: 'Failed to login.' };
    }
  }

  async editProfile(
    id: number,
    editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne({ id });
      const isChangingEmail = Boolean(editProfileInput.email !== user.email);
      if (isChangingEmail) {
        const existingUser = await this.users.findOne({
          email: editProfileInput.email,
        });
        if (existingUser) {
          return { err: 'This email already exists.' };
        }
      }
      await this.users.save([{ ...user, ...editProfileInput }]);
      return {};
    } catch (err) {
      return { err: 'Failed to edit profile.' };
    }
  }

  async seeProfile({ id }: SeeProfileInput): Promise<SeeProfileOutput> {
    try {
      const { user, err } = await this.findById(id);
      if (err) {
        return { err };
      }
      return { user };
    } catch {
      return { err: 'Failed to load profile.' };
    }
  }

  async deleteAccount(
    user: Users,
    { password }: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    try {
      if (!user.verifyPassword(password)) {
        return { err: 'Wrong password.' };
      }
      await this.users.delete({ id: user.id });
      return {};
    } catch {
      return { err: 'Failed to delete account.' };
    }
  }
}
