import { UserPermission } from '@enums/UserPermission';
import { UserType } from '@enums/UserType';
import { ApiError } from '@exceptions/ApiError';
import { User } from '@models/User';
import { Injectable } from '@nestjs/common';
import { FirebaseAuthError } from 'firebase-admin/auth';
import { UserRepository } from 'src/core/repositories/User.Repository';
import { FirebaseService } from '../firebase/firebase.service';
import { ChangeActiveUserDTO } from './dtos/change-active-user.dto';
import { GetUserByIdDTO } from './dtos/get-user-by-id.dto';
import { RegisterUserDTO } from './dtos/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private userRepository: UserRepository
  ) {}

  async createUser(registerUser: RegisterUserDTO) {
    const { email, name, password, type, phone } = registerUser;
    let id: string = null;
    try {
      const { uid } = await this.firebaseService.createUser({
        displayName: name,
        email,
        password,
        disabled: false,
      });

      id = uid;

      if (type === UserType.ADMIN) {
        const permissions: UserPermission[] = [
          UserPermission.READ_ADMINS,
          UserPermission.WRITE_ADMINS,
          UserPermission.WRITE_USERS,
          UserPermission.READ_USERS,
        ];
        await this.firebaseService.setCustomClaims(id, { type, permissions });
      } else {
        const permissions: UserPermission[] = [UserPermission.WRITE_USERS, UserPermission.READ_USERS];
        await this.firebaseService.setCustomClaims(id, { type, permissions });
      }

      await this.userRepository.set({ id, name, email, active: true, type, phones: [phone] });

      return uid;
    } catch (error) {
      if (id) {
        await this.firebaseService.deleteUser(id);
      }

      if (error instanceof FirebaseAuthError) {
        throw new ApiError(error.message, error.code, 401);
      }
      throw error;
    }
  }

  async changeActiveUser(changeActiveDTO: ChangeActiveUserDTO): Promise<void> {
    try {
      const { id } = changeActiveDTO;
      const user = await this.firebaseService.getById(id);
      const disabled = !user.disabled;
      await this.firebaseService.update({ id, disabled });

      await this.userRepository.update({ id, active: !disabled });
    } catch (error) {
      if (error instanceof FirebaseAuthError) {
        throw new ApiError(error.message, error.code, 401);
      }
      throw error;
    }
  }

  async getUserById({ id }: GetUserByIdDTO): Promise<User> {
    try {
      const user = await this.userRepository.getById(id);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
