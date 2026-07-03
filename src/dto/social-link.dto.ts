import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class SocialLinkDto {
  @IsString()
  @ApiProperty({ example: 'Email' })
  title!: string;

  @IsString()
  @ApiProperty({ example: 'domain@example.com' })
  label!: string;

  @IsString()
  @ApiProperty()
  url!: string;

  @IsString()
  @ApiProperty({ example: 'Email' })
  platform!: string;
}
