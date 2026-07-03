import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ExperienceDto {
  @IsString()
  role!: string;

  @IsString()
  company!: string;

  @IsString()
  country!: string;

  @IsDateString()
  startDate!: Date;

  @IsDateString()
  @IsOptional()
  endDate!: Date | null;
}
