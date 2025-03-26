import { Body, Controller, Post } from '@nestjs/common';
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
}
