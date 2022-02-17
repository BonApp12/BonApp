import {
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Res,
  Body,
  HttpCode,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import JwtRefreshGuard from './jwt-refresh-auth.guard';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user;
    user.password = undefined;
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: RequestWithUser) {
    const { user } = req;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    user.password = '';
    console.log(user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/isConnected')
  async isConnected(@Req() req) {
    return this.authService.isUserConnected(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    return this.authService.getCompleteUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req: RequestWithUser) {
    await this.usersService.removeRefreshToken(req.user.id);
    req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
    req.res.send();
  }

  @Post('/register')
  async register(@Body() registrationData: CreateUsersDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
