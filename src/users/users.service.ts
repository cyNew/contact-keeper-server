import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { name, password, email } = createUserDto;

    if (await this.checkExists(email)) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'This email does exists',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const user = new this.userModel();
    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    user.save();
  }

  async checkExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return true;
    }

    return false;
  }
}
