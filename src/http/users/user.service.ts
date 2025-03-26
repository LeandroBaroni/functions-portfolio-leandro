import { Injectable } from '@nestjs/common';
import { FirebaseAuthError } from 'firebase-admin/auth';
import { UserType } from 'src/code/enums/UserType';
import { ApiError } from 'src/code/exceptions/ApiError';
import { FirebaseService } from '../firebase/firebase.service';
import { UserPermission } from './../../code/enums/UserPermission';
import { RegisterUserDTO } from './dtos/register-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createUser(registerUser: RegisterUserDTO) {
    const { email, name, password, type } = registerUser;
    let id: string = null;
    try {
      const { uid } = await this.firebaseService.createUser({ displayName: name, email, password });
      id = uid;

      if (type === UserType.ADMIN) {
        const permissions = [
          UserPermission.READ_ADMINS,
          UserPermission.WRITE_ADMINS,
          UserPermission.WRITE_USERS,
          UserPermission.READ_USERS,
        ];
        await this.firebaseService.setCustomClaims(id, { type, permissions });
      } else {
        const permissions = [UserPermission.WRITE_USERS, UserPermission.READ_USERS];
        await this.firebaseService.setCustomClaims(id, { type, permissions });
      }

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
