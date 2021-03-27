import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  @Get()
  async getLoggedIn() {
    return 'get logged in user';
  }

  @Post()
  async login() {
    return 'user login';
  }
}
