import {Body, Controller, HttpCode, Post, Req} from '@nestjs/common';
import { GoogleService } from './google.service';
import GoogleDto from "./dto/google.dto";
import { Request } from 'express';
import {AuthService} from "../auth/auth.service";

@Controller('google')
export class GoogleController {
  constructor(
      private readonly googleService: GoogleService,
      private readonly authService: AuthService
  ) {}

  @Post()
  @HttpCode(200)
  async authenticate(@Body() tokenGoogle: GoogleDto, @Req() req: Request) {
    const user = await this.googleService.authenticate(tokenGoogle.token);
    const token = this.authService.getCookieWithJwtAccessToken(user.id);
    req.res.setHeader('Set-Cookie', [token]);
    return {statusCode: 200, user: user};
  }
}
