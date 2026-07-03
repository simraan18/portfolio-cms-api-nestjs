import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TechnologyDto {
  @IsString()
  @ApiProperty({ example: 'Javascript' })
  name!: string;
}
