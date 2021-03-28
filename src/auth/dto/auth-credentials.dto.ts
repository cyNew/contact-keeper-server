import { IsEmail, IsString, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  // @Matches(/[0-9]{6, 18}/, { message: 'The password is too weak' })
  password: string;
}
