import { User } from '@models/User';
import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ChangeActiveUserDTO } from './dtos/change-active-user.dto';
import { GetUserByIdDTO } from './dtos/get-user-by-id.dto';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() dto: RegisterUserDTO): Promise<string> {
    const id = await this.userService.createUser(dto);

    return id;
  }

  @Put(':id/active')
  @HttpCode(200)
  async changeActiveUser(@Param() changeActiveDTO: ChangeActiveUserDTO): Promise<void> {
    await this.userService.changeActiveUser(changeActiveDTO);
  }

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param() getUserByIdDTO: GetUserByIdDTO): Promise<User> {
    const user = await this.userService.getUserById(getUserByIdDTO);

    return user;
  }
}
