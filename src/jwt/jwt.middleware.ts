import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/user/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMidddlware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: Request, _: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const decoded = this.jwtService.verifyToken(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const { user, err } = await this.usersService.findById(decoded['id']);
          if (user && !err) {
            req['user'] = user;
          }
        }
      } catch {}
    }
    next();
  }
}
