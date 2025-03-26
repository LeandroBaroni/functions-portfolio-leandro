import { UserType } from '@enums/UserType';
import { Injectable } from '@nestjs/common';
import { FirebaseAuthError } from 'firebase-admin/auth';
import { ApiError } from 'src/core/exceptions/ApiError';
import { UserPermission } from '../../core/enums/UserPermission';
import { FirebaseService } from '../firebase/firebase.service';
import { RegisterUserDTO } from './dtos/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseService
    // private userRepository: UserRepository
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
        phoneNumber: phone.phoneNumber,
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

      // await this.userRepository.add({ name, email, active: true, type, phones: [] });

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
}
