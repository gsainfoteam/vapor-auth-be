import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';

@Injectable()
export class GroupsStrategy extends PassportStrategy(Strategy, 'groups') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<User> {
    return this.authService.validateUser(token);
  }
}
