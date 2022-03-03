import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
 
export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName?: string;
 
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName?: string;
}