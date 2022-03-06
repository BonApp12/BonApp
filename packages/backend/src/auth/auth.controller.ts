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
import { JwtService } from '@nestjs/jwt';
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
      private readonly jwtService: JwtService,
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
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);

    req.res.setHeader('Set-Cookie', [accessTokenCookie]);
    delete user.password;

    return {statusCode: 200, user: user};
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

  @Post('/logout')
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
    res.clearCookie('Authentication');
    req.res.send();
  }

  @Post('/register')
  async register(@Body() registrationData: CreateUsersDto) {
    return this.authService.register(registrationData);
  }
}
