import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class PhoneDTO {
  @ApiProperty({ description: "The user's phone number" })
  @IsString()
  @IsNotEmpty()
  @Length(10, 11, { message: 'The phone must minimal length between 10 and 11 characters' })
  phoneNumber: string;

  @ApiProperty({ description: "The user's phone type" })
  @IsString()
  @IsNotEmpty()
  @IsIn(['tel', 'residential', 'fax'])
  type: 'tel' | 'residential' | 'fax';
}
