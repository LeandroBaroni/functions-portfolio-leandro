import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserType } from 'src/code/enums/UserType';

export class RegisterUserDTO {
  @ApiProperty({ description: "The user's name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "The user's email" })
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
}
