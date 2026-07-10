import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CardCategoryDto {
  @IsString()
  @ApiProperty({ example: 'name' })
  name!: string;

  @IsString()
  @ApiProperty({ example: 'description' })
  description!: string;
}
