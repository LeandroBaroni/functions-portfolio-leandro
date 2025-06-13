import { Step } from '@interfaces/Step';
import { BaseModel } from './BaseModel';

export interface Article extends BaseModel {
  active: boolean;
  userId: string;
  title: string;
  description: string;
  topicId: string;
  cover: string | null;
  tagIds: string[];
  steps: Step[];
}
