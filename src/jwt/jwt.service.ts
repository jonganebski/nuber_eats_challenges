import { Inject, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { CONFIG_OPTIONS } from 'src/common/common.constans';
import { IJwtModuleOptions } from './jwt.interfaces';
@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: IJwtModuleOptions,
  ) {}
  signToken(userId: number) {
    return sign({ id: userId }, this.options.jwtSecret);
  }
  verifyToken(token: string) {
    return verify(token, this.options.jwtSecret);
  }
}
