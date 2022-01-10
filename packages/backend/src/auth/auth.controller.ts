import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Response,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const user = await this.authService.login(req.user);
    res.cookie('access_token', user.access_token, { httpOnly: true });
    res.json({ user });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return this.authService.getCompleteUser(req.user);
  }
}
