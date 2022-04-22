import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [GoogleController],
  providers: [GoogleService, ConfigService, AuthService],
  imports: [
    AuthModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get(
              'JWT_ACCCESS_TOKEN_EXPIRATION_TIME',
          )}s`,
        },
      }),
    }),
  ]
})
export class GoogleModule {}
