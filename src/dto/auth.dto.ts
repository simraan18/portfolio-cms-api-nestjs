import { IsEmail, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class SignUpDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class SignInDto extends OmitType(SignUpDto, ['name'] as const) {}
