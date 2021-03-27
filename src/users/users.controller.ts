import { Controller, Post } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
  @Post()
  async createUser(): Promise<string> {
    return 'register a user';
  }
}
