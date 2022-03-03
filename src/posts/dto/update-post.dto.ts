import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
 
export class UpdatePostDto { 
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message?: string;
}