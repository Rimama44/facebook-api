import { IsNumber } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';
 
export class FindOneParams {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}