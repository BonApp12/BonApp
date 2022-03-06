import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    //TODO : Step 1 ->
    async use(req: Request, res: Response, next: NextFunction) {
        const authentication = req.cookies?.Authentication;
        const refresh = req.cookies?.Refresh;
        console.log('before check auth');
        console.log(authentication);
        if(authentication === undefined){
            if(refresh !== undefined){
                const verifyRefreshToken = await this.verifyRefreshToken(refresh);
                console.log(verifyRefreshToken);
                if(verifyRefreshToken){
                    req.res.setHeader('Set-Cookie', verifyRefreshToken);
                }else{
                    // console.log('chien refresh token');
                    // req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut()).status(401).send('Unauthorized gro fdp');
                }
            }
        }
        next();
    }

    public verifyRefreshToken(currentHashedRefreshToken): any {
        return this.usersService.findByRefreshToken(currentHashedRefreshToken)
            .then(res => {
                const date = new Date();
                if(date < res[0]?.expired_refresh_token){
                    return this.authService.getCookieWithJwtAccessToken(res[0]?.id);
                }
                this.usersService.removeRefreshToken(res[0]?.id);
                return false;
            });
    }
}
