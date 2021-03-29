import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ContactType } from './create-contact.dto';

export class UpdateContactDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsEnum(ContactType)
  @IsOptional()
  type: ContactType;
}
