/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller()
export class PostController {
  constructor(private postService: PostService){};

  @UseGuards(JwtAuthGuard)
  @Get()
  getPosts(@Req() req, @Res() res) {
    return this.postService.getPosts(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Req() req, @Res() res) {
    return this.postService.createPost(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updatePost(@Req() req, @Res() res) {
    return this.postService.updatePost(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deletePost(@Req() req, @Res() res) {
    return this.postService.deletePost(req, res);
  }
}
