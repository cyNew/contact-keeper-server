import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByName(email);

    if (user && user.password === (await bcrypt.hash(password, user.salt))) {
      const { email, name, _id } = user;

      return { email, name, userId: _id };
    }

    return null;
  }

  async login(user) {
    const payload = {
      sub: user.userId,
      name: user.name,
    };

    return {
      // 返回 JWT 到响应体中
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { name, email, _id: userId } = await this.usersService.createUser(
      createUserDto,
    );

    return await this.login({
      name,
      email,
      userId,
    });
  }

  async getProfile(userId: string) {
    return this.usersService.findUserById(userId);
  }
}
