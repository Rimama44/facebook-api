import { NotFoundException } from '@nestjs/common';
 
export class ProfileNotFoundException extends NotFoundException {
  constructor(profileId: number) {
    super(`Profile with id ${profileId} not found`);
  }
}