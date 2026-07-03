import { IsString } from 'class-validator';

export class ResponsibilityDto {
  @IsString()
  content!: string;
}
