import { BaseModel } from './BaseModel';

export interface Tag extends BaseModel {
  active: boolean;
  name: string;
}
