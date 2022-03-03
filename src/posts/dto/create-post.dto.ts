import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { UsersService } from '../../users/users.service';
 
export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
 
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorId: string;
}

