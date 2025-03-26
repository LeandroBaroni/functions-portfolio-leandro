import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ChangeActiveUserDTO {
  @ApiProperty({ description: "The user's ID" })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
