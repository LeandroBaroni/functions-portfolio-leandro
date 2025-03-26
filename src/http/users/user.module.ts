import { Module } from '@nestjs/common';
import { UserRepository } from 'src/core/repositories/User.Repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService, UserRepository],
  providers: [UserService, UserRepository],
})
export class UserModule {}
