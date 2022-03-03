import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Prisma, prisma, PrismaClient } from '@prisma/client';
import { UserNotFoundException } from 'src/exceptions/userNotFound.exception';
import LoginDto from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: LoginDto) {
        const userlogin = await this.usersService.findOne(user.email);
        if (!user) {
            throw new UserNotFoundException(user.email);
        }
        if (user.password == userlogin.password) {
            Logger.log("password OK");
            return {
                user: user.email,
                token: this.jwtService.sign(userlogin),
            };
        }
        else {
            Logger.log("password Error");
            return "Wrong password";
        }
    }

    async register(user: RegisterDto) {
        await this.prismaService.user.create({
            data: user,
        });
        return {
            user: user.email,
        };
    }
}