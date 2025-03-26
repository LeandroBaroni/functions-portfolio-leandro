import { UserType } from '../enums/UserType';
import { Phone } from '../interfaces/Phone';
import { BaseModel } from './BaseModel';

export interface User extends BaseModel {
  active: boolean;
  name: string;
  email: string;
  phones: Phone[];
  type: UserType;
}
