import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaError } from '../utils/prismaError';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) { }

  async createPost(post: CreatePostDto) {
    return this.prismaService.post.create({
      data: post,
    });
  }

  findAll() {
    return this.prismaService.post.findMany();
  }

  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    try {
      return await this.prismaService.post.update({
        data: {
          ...post,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }

  async deletePost(id: number) {
    try {
      return this.prismaService.post.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }
}
