import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongo://127.0.0.1/test'),
    AuthModule,
    ContactsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
