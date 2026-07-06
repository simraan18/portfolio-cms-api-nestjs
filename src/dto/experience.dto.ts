import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class ExperienceDto {
  @IsString()
  @ApiProperty({ example: 'Software Engineer' })
  role!: string;

  @IsString()
  @ApiProperty({ example: 'ABC Company' })
  company!: string;

  @IsString()
  @ApiProperty({ example: 'New York' })
  country!: string;

  @IsDateString()
  @ApiProperty({ example: new Date().toISOString() })
  startDate!: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: new Date().toISOString() })
  endDate!: Date | null;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false, default: false })
  isCurrent!: boolean | null;
}
