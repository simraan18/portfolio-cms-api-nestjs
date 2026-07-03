import { IsString } from 'class-validator';

export class TechnologyDto {
  @IsString()
  name!: string;
}
