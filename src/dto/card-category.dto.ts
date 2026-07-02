import { IsString } from 'class-validator';

export class CardCategoryDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;
}
