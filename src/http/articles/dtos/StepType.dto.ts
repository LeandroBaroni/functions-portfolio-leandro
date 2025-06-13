import { IsIn } from 'class-validator';

export class StepTypeDto {
  @IsIn(['image', 'video', 'text', 'code', 'bash'])
  type: 'image' | 'video' | 'text' | 'code' | 'bash';
}
