import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {CreateUsersDto} from '../users/dto/create-users.dto';
import {ConfigService} from '@nestjs/config';
import {AuthErrorCode} from './auth-error-code.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.userId};
        const access_token = this.jwtService.sign(payload);
        return {
            user: user,
            access_token: access_token,
        };
    }

    async getCompleteUser(user: CreateUsersDto) {
        return this.usersService.findOne(user.email);
    }

    public async register(registrationData: CreateUsersDto) {
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            if (AuthErrorCode.USER_ALREADY_EXIST === error?.code) {
                throw new HttpException(
                    "L'email existe déjà",
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            }
            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await AuthService.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException(
                'Identifiants incorrects',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    private static async verifyPassword(
        plainTextPassword: string,
        hashedPassword: string,
    ) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword,
        );
        if (!isPasswordMatching) {
            throw new HttpException(
                'Wrong credentials provided (password <- dont forget to remove this after)',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    public getJwtAccessToken(userId: number) {
        const payload: TokenPayload = {userId};
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get(
                'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
            )}s`,
        });
    }

    public getCookieWithJwtAccessToken(userId: number) {
        const token = this.getJwtAccessToken(userId);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        )}`;
    }

    public getCookiesForLogOut() {
        return ['Authentication=; HttpOnly; Path=/ Max-Age=0'];
    }

    public isUserConnected(user) {
        console.log(user);
    }
}
