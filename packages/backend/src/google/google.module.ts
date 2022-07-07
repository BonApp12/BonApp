import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [GoogleController],
  providers: [GoogleService, ConfigService, AuthService],
  imports: [
    AuthModule,
    UsersModule,
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get(
              'JWT_ACCCESS_TOKEN_EXPIRATION_TIME_WEB',
          )}s`,
        },
      }),
    }),
  ]
})
export class GoogleModule {}
