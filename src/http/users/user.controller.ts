import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ChangeActiveUserDTO } from './dtos/change-active-user.dto';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: RegisterUserDTO): Promise<string> {
    const id = await this.userService.createUser(dto);

    return id;
  }

  @Put(':id/active')
  async changeActiveUser(@Param() changeActiveDTO: ChangeActiveUserDTO) {
    await this.userService.changeActiveUser(changeActiveDTO);
  }
}
