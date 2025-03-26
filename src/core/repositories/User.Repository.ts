import { Injectable } from '@nestjs/common';
import { FirestoreCollectionName } from '../configs/firestoreCollectionName';
import { User } from '../models/User';
import { FirebaseAbstract } from './FirebaseAbstract.Repository';

@Injectable()
export class UserRepository extends FirebaseAbstract<User> {
  constructor() {
    super(FirestoreCollectionName.USERS);
  }
}
