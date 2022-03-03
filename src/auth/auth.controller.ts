import { Controller, Request, Get, Logger, Post, UseGuards, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) { }

    @ApiOperation({ summary: 'Return a JWT Token for authentication after.' })
    @Post('login')
    async login(@Body() user: LoginDto) {
        Logger.log("return a JWT Token for authentication");
        return this.authService.login(user);
    }

    @ApiOperation({ summary: 'Register a new User.' })
    @Post('register')
    async register(@Body() user: RegisterDto) {
        Logger.log("return a JWT Token for authentication");
        return this.authService.register(user);
    }
}
