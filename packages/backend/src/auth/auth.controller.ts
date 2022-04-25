import {
  Controller,
  Post,
  Get,
  Headers,
  Req,
  UseGuards,
  Res,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable, Query
} from '@nestjs/common';
import {Response} from 'express';
import {LocalAuthGuard} from './local-auth.guard';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';
import {UsersDto} from '../users/dto/users.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { plainToClass } from 'class-transformer';
import {SETTINGS} from "../app.utils";
import {UpdateUsersDto} from "../users/dto/update-users.dto";
import {ForgetPasswordDto} from "../users/dto/forget-password.dto";
import {ConfigService} from "@nestjs/config";
import {UserRole} from "../users/UserRole.enum";

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {
    }

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
    async login(@Req() req: RequestWithUser, @Headers() headers: any) {
        const userDto = plainToClass(UsersDto, req.user);
        if ((headers.origin === this.configService.get("URL_FRONTMANAGER") && userDto.role !== UserRole.CLIENT)
            || (headers.origin === this.configService.get("URL_FRONTEND") && userDto.role === UserRole.CLIENT)) {
            return this.loginUser(req, userDto);
        }
        throw new HttpException(
            {type: "role", message: "Vous n'avez pas le droit d'accéder à cette ressource"},
            HttpStatus.UNAUTHORIZED,
        );
    }

    private loginUser(req, user) {
        req.res.setHeader('Set-Cookie', [
            this.authService.getCookieWithJwtAccessToken(user.id),
        ]);
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

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async update(@Body(SETTINGS.VALIDATION_PIPE) updateUserDto: UsersDto, @Req() req: RequestWithUser) {
    return this.authService.updateUser(updateUserDto, req.user);
  }

  @Post('/register')
  async register(@Body(SETTINGS.VALIDATION_PIPE) registrationData: UsersDto) {
      return this.authService.register(registrationData);
  }

  @Post('/forget-password')
  @HttpCode(200)
  async forgetPwd(@Body(SETTINGS.VALIDATION_PIPE) forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPwd(forgetPasswordDto);
  }

  @Post('/update-password')
  @HttpCode(204)
  async updatePwd(@Body(SETTINGS.VALIDATION_PIPE) updateUsersDto: UpdateUsersDto, @Query() {token}) {
    return this.authService.changePwd(updateUsersDto, token);
  }

  @Get('/check-token')
  @HttpCode(200)
  async checkToken(@Query() {token}) {
    return this.authService.checkToken(token);
  }
}
