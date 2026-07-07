import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProfileDto {
  @IsString()
  @ApiProperty({ example: 'John Smith' })
  name!: string;

  @IsEmail()
  @ApiProperty({ example: 'bOYtI@example.com' })
  email!: string;

  @IsString()
  @ApiProperty({ example: 'New York' })
  location!: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  experience!: number;

  @IsString()
  @ApiProperty({ example: 'B.Sc' })
  education!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Employment Visa' })
  visaStatus!: string | null;

  @IsString()
  @ApiProperty({ example: 'About me' })
  aboutProfile!: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: 'Java, Python' })
  topSkills!: string[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: 'Frontend, Backend' })
  roles!: string[];

  @IsString()
  @ApiProperty({ example: 'Resume' })
  resumeUrl!: string;

  @IsString()
  @ApiProperty({ example: 'Title' })
  title!: string;

  @IsString()
  @ApiProperty({ example: 'New York' })
  educationCountry!: string;

  @IsString()
  @ApiProperty({ example: 'Oxford' })
  educationInstitue!: string;
}
