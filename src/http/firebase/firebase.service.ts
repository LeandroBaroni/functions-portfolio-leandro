import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { CreateRequest, UpdateRequest, UserRecord } from 'firebase-admin/auth';
import { UserPermission } from 'src/code/enums/UserPermission';
import { UserType } from 'src/code/enums/UserType';

interface ParamsUpdate extends UpdateRequest {
  id: string;
}

interface ClaimsParams {
  permissions: UserPermission[];
  type: UserType;
}

@Injectable()
export class FirebaseService {
  createUser(props: CreateRequest): Promise<UserRecord> {
    return firebaseAdmin.auth().createUser(props);
  }

  async deleteUser(id: string): Promise<void> {
    await firebaseAdmin.auth().deleteUser(id);
  }

  async update({ id, ...data }: ParamsUpdate): Promise<void> {
    await firebaseAdmin.auth().updateUser(id, data);
  }

  getUserByEmail(email: string): Promise<UserRecord> {
    return firebaseAdmin.auth().getUserByEmail(email);
  }

  async revokeRefreshTokens(id: string): Promise<void> {
    await firebaseAdmin.auth().revokeRefreshTokens(id);
  }

  generatePasswordResetLink(email: string): Promise<string> {
    return firebaseAdmin.auth().generatePasswordResetLink(email);
  }

  setCustomClaims(userId: string, customUserClaims: ClaimsParams): Promise<void> {
    return firebaseAdmin.auth().setCustomUserClaims(userId, customUserClaims);
  }

  async getById(userId: string): Promise<UserRecord> {
    return firebaseAdmin.auth().getUser(userId);
  }
}
