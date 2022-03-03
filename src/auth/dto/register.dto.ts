import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
 
export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;
 
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
 
export default RegisterDto;