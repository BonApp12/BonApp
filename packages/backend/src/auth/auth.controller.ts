import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpException,
    HttpStatus,
    Injectable,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import {Response} from 'express';
import {LocalAuthGuard} from './local-auth.guard';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';
import {CreateUsersDto} from '../users/dto/create-users.dto';
import {UsersDto} from '../users/dto/users.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { plainToClass } from 'class-transformer';
import {UpdateUsersDto} from "../users/dto/update-users.dto";
import {SETTINGS} from "../app.utils";
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
  async update(@Body(SETTINGS.VALIDATION_PIPE) updateUserDto: UpdateUsersDto, @Req() req: RequestWithUser) {
    return this.authService.updateUser(updateUserDto, req.user);
  }

  @Post('/register')
  async register(@Body(SETTINGS.VALIDATION_PIPE) registrationData: CreateUsersDto) {
    return this.authService.register(registrationData);
  }
}
