import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StepDto } from './step.dto';

export class CreateDTO {
  @ApiProperty({ description: 'ID from the user logged', required: true })
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Article title', required: true })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Article description', required: true })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Topic ID', required: true })
  @IsOptional()
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
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  steps: StepDto[];
}
