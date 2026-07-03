import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OmitType } from '@nestjs/mapped-types';

export class SignUpDto {
  @IsString()
  @ApiProperty({ example: 'John Smith' })
  name!: string;

  @IsEmail()
  @ApiProperty({ example: 'bOYtI@example.com' })
  email!: string;

  @IsString()
  @ApiProperty({ example: 'password123' })
  password!: string;
}

export class SignInDto extends OmitType(SignUpDto, ['name'] as const) {}
