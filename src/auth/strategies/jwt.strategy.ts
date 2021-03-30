import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, Payload } from '../auth.interface';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<Payload> {
    // retrieve and parse the jwt (Authorization field) from request header
    // the object which returned will be assigned to req.user

    // 从请求头中获取 Authorization 字段获取 JWT 并解析
    // 然后挂载到 req 的 user 字段中
    return {
      name: payload.name,
      userId: payload.sub,
      email: payload.email,
    };
  }
}
