import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private refresh: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if(request?.cookies?.Authentication !== undefined){
            return this.authService.refreshToken(request)
                .then(refresh => {
                  request.cookies.Authentication = refresh;
                  request.res.setHeader('Set-cookie',request.cookies.Authentication);
                  return request.cookies.Authentication;
                })
                .catch(e => console.log('error : '+ e));
          }else{
            console.log('coucou');
            return request?.cookies?.Authentication;
          }
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('validate');
    return this.userService.getById(payload.userId);
  }
}
