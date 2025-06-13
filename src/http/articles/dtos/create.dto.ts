import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StepDto } from './step.dto';

export class CreateDTO {
  @ApiProperty({ description: 'ID from the user logged' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Article title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Article description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Topic ID' })
  @IsString()
  topicId: string;

  @IsOptional()
  @Transform(({ value }) => (value === null ? null : value))
  @IsString()
  cover: string | null;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagIds: string[];

  @ApiProperty({ type: [StepDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  steps: StepDto[];
}
