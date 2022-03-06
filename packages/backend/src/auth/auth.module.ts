import {MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature([Users]),
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
    ConfigModule,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {//implements NestModule{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //       .apply(AuthMiddleware)
  //       .forRoutes('auth','restaurant');
  // }
}
