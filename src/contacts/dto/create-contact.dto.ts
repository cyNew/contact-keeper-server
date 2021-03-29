import { IsEmail, IsIn, IsString } from 'class-validator';

export enum ContactType {
  PERSONAL = 'personal',
  PROFESSIONAL = 'professional',
}

export class CreateContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsIn(['personal', 'professional'])
  type: ContactType;
}
