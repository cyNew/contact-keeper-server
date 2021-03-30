import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload, Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Payload> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Cannot find this email!');
    }

    if (user && (await this.isMatched(user, password))) {
      const { email, name, _id } = user;

      return { email, name, userId: _id };
    } else {
      throw new UnauthorizedException('The password is wrong!');
    }
  }

  login(user: Payload) {
    const payload: JwtPayload = {
      sub: user.userId,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { name, email, userId } = await this.usersService.createUser(
      createUserDto,
    );

    return this.login({
      name,
      email,
      userId,
    });
  }

  async getProfile(userId: string) {
    const { email, name, _id } = await this.usersService.findUserById(userId);
    return { email, name, _id };
  }

  protected async isMatched(user: UserDocument, password: string) {
    return user.password === (await bcrypt.hash(password, user.salt));
  }
}
