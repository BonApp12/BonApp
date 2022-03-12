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
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UsersDto } from '../users/dto/users.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService
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
  //TODO: TEST:
  // 1/ Test si tout fonctionnel -> a) Status 200 + token | b) UserDto
  // 2/ mot de passe ou email incorrect -> test le retour
  // 3/ mauvais objet (mauvais format) -> return 400
  async login(@Req() req: RequestWithUser) {
    const userDto = plainToClass(UsersDto,req.user);
    req.res.setHeader('Set-Cookie', [this.authService.getCookieWithJwtAccessToken(userDto.id)]);
    return {statusCode: 200, user: userDto};
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
