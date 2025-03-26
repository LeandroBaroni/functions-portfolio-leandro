import { UserType } from '@enums/UserType';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsObject, IsString, Length, ValidateNested } from 'class-validator';
import { PhoneDTO } from 'src/core/DTOs/phone.dto';

export class RegisterUserDTO {
  @ApiProperty({ description: "The user's name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "The user's email address" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "The user's password" })
  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty({ description: "The user's type" })
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({ description: "The user's phone" })
  @IsObject()
  @ValidateNested()
  @Type(() => PhoneDTO)
  phone: PhoneDTO;
}
