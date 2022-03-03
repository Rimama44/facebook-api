import { NotFoundException } from '@nestjs/common';
 
export class UserNotFoundException extends NotFoundException {
  constructor(email: String) {
    super(`User with email ${email} not found`);
  }
}