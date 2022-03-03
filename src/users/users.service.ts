import { Body, Controller, Logger, Post } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaError } from '../utils/prismaError';
import { ProfileNotFoundException } from '../exceptions/profileNotFound.exception';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { PostByAuthorNotFoundException } from '../exceptions/postByAuthorNotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  // async create(createUserDto: CreateUserDto) {
  //     const result = await this.prismaService.user.create({ data: createUserDto });
  //     Logger.log(`User has been created : ${JSON.stringify(result)}`)
  //     return result
  // }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  findAll() {
    return this.prismaService.profile.findMany();
  }

  async getPostByUserId(Id: string) {
    const post = await this.prismaService.post.findMany({
      where: {
        authorId: Id,
      },
    });
    if (!post) {
      throw new PostByAuthorNotFoundException(Id);
    }
    return post;
  }

  async getProfileById(id: number) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        id,
      },
    });
    if (!profile) {
      throw new ProfileNotFoundException(id);
    }
    return profile;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async updateProfile(id: number, profile: UpdateProfileDto) {
    try {
      return await this.prismaService.profile.update({
        data: {
          ...profile,
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
        throw new ProfileNotFoundException(id);
      }
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      await this.prismaService.post.deleteMany({
        where: {
          authorId: id,
        },
      });
      await this.prismaService.profile.delete({
        where: {
          userId: id,
        },
      });
      await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      return "delete an user by it's id.";
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new UserNotFoundException(id);
      }
      throw error;
    }
  }
}