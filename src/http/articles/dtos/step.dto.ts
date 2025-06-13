import { ApiProperty } from '@nestjs/swagger';
import { StepType } from '@typings/StepType';
import { IsIn, IsString } from 'class-validator';

export class StepDto {
  @ApiProperty({ description: 'Step content' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Step type' })
  @IsIn(['image', 'video', 'text', 'code', 'bash'])
  type: StepType;
}
