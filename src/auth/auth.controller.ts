/* eslint-disable prettier/prettier */
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  login(@Req() req: Request, @Res() res: Response) {
    return this.authService.login(req, res);
  }
  @Post('signup')
  signup(@Req() req: Request, @Res() res: Response) {
    return this.authService.signup(req, res);
  }
  @UseGuards(JwtAuthGuard)
  @Post('verify')
  verifyToken(){
    return 
  }
}
