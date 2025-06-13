import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetByIdDTO {
  @ApiProperty({ description: "Article's ID", required: true })
  @IsString()
  id: string;
}
