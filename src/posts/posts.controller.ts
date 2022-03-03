import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindOneParams } from '../utils/findOneParams';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new Post.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    Logger.log("create a new Post");
    return this.postsService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Return a list of Post.' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    Logger.log("return a list of Post");
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Return a Post.' })
  @ApiParam({name: 'Post\'s id', type: String})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    Logger.log("return a Post");
    return this.postsService.getPostById(Number(id));
  }

  @ApiOperation({ summary: 'Update a Post.' })
  @ApiParam({name: 'Post\'s id', type: String})
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: UpdatePostDto,
  ) {
    Logger.log("update a Post");
    return this.postsService.updatePost(Number(id), post);
  }

  @ApiOperation({ summary: 'Delete a Post.' })
  @ApiParam({name: 'Post\'s id', type: String})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    Logger.log("delete a Post");
    this.postsService.deletePost(Number(id));
    return null;
  }
}
