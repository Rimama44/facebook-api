import { Body, Controller, Delete, Get, Logger, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { FindOneParams } from '../utils/findOneParams';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiOperation({ summary: 'Return a list of User\'s posts.' })
    @ApiParam({name: 'User\'s id', type: String})
    @UseGuards(JwtAuthGuard)
    @Get(':id/posts')
    getPostByUserId(@Param() { id }: FindOneParams) {
        Logger.log("return a list of User's posts.");
        return this.usersService.getPostByUserId(String(id));
    }

    @ApiOperation({ summary: 'Return a User\'s profile.' })
    @ApiParam({name: 'User\'s id', type: String})
    @UseGuards(JwtAuthGuard)
    @Get(':id/profile')
    getProfileById(@Param() { id }: FindOneParams) {
        Logger.log("return a User's profile");
        return this.usersService.getProfileById(Number(id));
    }

    @ApiOperation({ summary: 'Update a User\'s profile.' })
    @ApiParam({name: 'User\'s id', type: String})
    @UseGuards(JwtAuthGuard)
    @Patch(':id/profile')
    async updateProfile(
        @Param() { id }: FindOneParams,
        @Body() profile: UpdateProfileDto,
    ) {
        Logger.log("update a User's profile");
        return this.usersService.updateProfile(Number(id), profile);
    }

    @ApiOperation({ summary: 'Delete an user by it\'s id.' })
    @ApiParam({name: 'User\'s id', type: String})
    @Delete(':id')
    async deleteUser(@Param() { id }: FindOneParams) {
        Logger.log("delete an user by it's id");
        return this.usersService.deleteUser(String(id));
    }

    // @UseGuards(JwtAuthGuard)
    // @Get(':id/posts')
    // findAll(id: string): Promise<User> {
    //     Logger.log('return a list of User\'s posts')
    //     return this.usersService.findMany(id);
    // }

    //   @Post()
    //   create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    //   }
}

