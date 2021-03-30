import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, password, email } = createUserDto;

    if (await this.checkExists(email)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'This email already exists',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const user = new this.userModel();
    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    await user.save();

    return { name, email, userId: user._id };
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }

    return null;
  }

  async findUserById(userId: string) {
    const user = await this.userModel.findById(userId);

    if (user) {
      return user;
    }

    return null;
  }

  async checkExists(email: string) {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }
}
