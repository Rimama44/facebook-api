import { NotFoundException } from '@nestjs/common';
 
export class PostByAuthorNotFoundException extends NotFoundException {
  constructor(postAuthor: string) {
    super(`Post with author ${postAuthor} not found`);
  }
}