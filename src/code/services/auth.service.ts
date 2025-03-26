import { Injectable } from '@nestjs/common';
import { CreateRequest, UpdateRequest, UserRecord, getAuth } from 'firebase-admin/auth';
import { UserPermission } from '../enums/UserPermission';
import { UserType } from '../enums/UserType';

const fireAuth = getAuth();

interface ParamsCreate extends CreateRequest {
  email: string;
  password: string;
}

interface ParamsUpdate extends UpdateRequest {
  id: string;
}

interface ClaimsParams {
  permissions: UserPermission[];
  type: UserType;
}

@Injectable()
export class AuthService {
  async create(data: ParamsCreate): Promise<string> {
    const { uid } = await fireAuth.createUser(data);
    return uid;
  }

  async delete(id: string): Promise<void> {
    await fireAuth.deleteUser(id);
  }

  async update({ id, ...data }: ParamsUpdate): Promise<void> {
    await fireAuth.updateUser(id, data);
  }

  getUserByEmail(email: string): Promise<UserRecord> {
    return fireAuth.getUserByEmail(email);
  }

  async revokeRefreshTokens(id: string): Promise<void> {
    await fireAuth.revokeRefreshTokens(id);
  }

  generatePasswordResetLink(email: string): Promise<string> {
    return fireAuth.generatePasswordResetLink(email);
  }

  setCustomClaims(userId: string, customUserClaims: ClaimsParams): Promise<void> {
    return fireAuth.setCustomUserClaims(userId, customUserClaims);
  }

  async getById(userId: string): Promise<UserRecord> {
    return fireAuth.getUser(userId);
  }
}
