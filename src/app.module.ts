/* eslint-disable prettier/prettier */
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userProviders } from './auth/user.providers';
import { AuthenticateMiddleware } from './middleware/authenticate.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, AuthenticateMiddleware, ...userProviders],
})
export class AppModule {}
