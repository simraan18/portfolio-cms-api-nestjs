import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponsibilityDto {
  @IsString()
  @ApiProperty({ example: 'Responsibility' })
  content!: string;
}
