import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserByIdDTO {
  @ApiProperty({ description: "The user's ID" })
  @IsNotEmpty()
  @IsString()
  id: string;
}
