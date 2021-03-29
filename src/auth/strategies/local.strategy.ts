import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string) {
    // retrieve username(email) and password from request body
    // 从请求的 Body 中获取 username 和 password 字段
    const user = this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    // assign the returned object to req.user
    // 将 user 对象挂载到 req 上
    return user;
  }
}
