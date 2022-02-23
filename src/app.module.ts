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

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [PostController, AppController, AuthController],
  providers: [
    PostService,
    AppService,
    AuthService,
    JwtStrategy,
    ...userProviders, ...postProviders
  ],
})
export class AppModule {}
