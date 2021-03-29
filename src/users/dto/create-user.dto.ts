import { IsString, MaxLength, MinLength } from 'class-validator';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;
}
