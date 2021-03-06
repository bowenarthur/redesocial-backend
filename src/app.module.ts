/* eslint-disable prettier/prettier */
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userProviders } from './auth/user.providers';
import { PostService } from './posts/post.service';
import { PostController } from './posts/post.controller';
import { postProviders } from './posts/post.providers';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './uploads3/upload.controller';
import { UploadService } from './uploads3/upload.service';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [
    PostController,
    AppController,
    AuthController,
    UploadController,
  ],
  providers: [
    PostService,
    AppService,
    AuthService,
    JwtStrategy,
    UploadService,
    ...userProviders,
    ...postProviders,
  ],
})
export class AppModule {}
