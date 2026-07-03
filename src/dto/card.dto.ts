import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CardDto {
  @IsString()
  @ApiProperty({ example: 'title' })
  title!: string;

  @IsString()
  @ApiProperty({ example: 'description' })
  description!: string;

  @IsString()
  @ApiProperty()
  cardCategoryId!: string;
}
