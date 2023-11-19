import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {CreateUsersDto} from '../users/dto/create-users.dto';
import {ConfigService} from '@nestjs/config';
import {UTILS} from "../app.utils";
import {UsersDto} from "../users/dto/users.dto";
import {v4 as uuidv4} from 'uuid';
import {UserRole} from "../users/UserRole.enum";
import {UserAdapter} from "../Adapter/UserAdapter";
import {HttpService} from "@nestjs/axios";
import fetch from "node-fetch";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
    }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    const access_token = this.jwtService.sign(payload);
    return {
      user: user,
      access_token: access_token,
    };
  }

  async getCompleteUser(user: CreateUsersDto) {
    return this.usersService.findOne(user.email);
  }

  public async register(registrationData: UsersDto) {
    try {
      if(!registrationData.password && registrationData.role === UserRole.CLIENT) {
        throw new HttpException("Mot de passe requis", HttpStatus.UNPROCESSABLE_ENTITY);
      }
      if (registrationData.role === UserRole.CLIENT) {
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': this.configService.get('SENDINBLUE_API_KEY'),
          },
          body: JSON.stringify({
            sender: {email: this.configService.get('MAIL_FROM')},
            to: [{email: registrationData.email}],
            replyTo: {email: this.configService.get('MAIL_USER')},
            params: {firstname: registrationData.firstname},
            templateId: 2
          })
        };
        const mail = () => fetch(this.configService.get('SENDINBLUE_URL_API'), options);
        await mail();
      }
      return await this.usersService.create({
        ...registrationData,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status !== undefined ? error.status : HttpStatus.BAD_REQUEST);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const checkPwd = await UTILS.verifyPassword(plainTextPassword, user.password);
      if(!checkPwd) {
        throw new HttpException(
            'Wrong credentials provided (password <- dont forget to remove this after)',
            HttpStatus.BAD_REQUEST,
        );
      }
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException(
                'Identifiants incorrects',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async checkToken(token: string) {
    try {
      const user = await this.usersService.findBy({token: token});
      return UserAdapter.toDtoUpdatePassword(user);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  public async forgetPassword(usersDto: UsersDto = null): Promise<any> {
    try {
      const token = uuidv4();
      usersDto.token = token;
      const url = `${this.configService.get('URL_FRONTEND')}/update-password?token=${token}`;
      const user = UserAdapter.toDtoUpdatePassword(await this.usersService.getByEmail(usersDto.email));
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': this.configService.get('SENDINBLUE_API_KEY'),
        },
        body: JSON.stringify({
          sender: {email: this.configService.get('MAIL_FROM')},
          to: [{email: user.email}],
          replyTo: {email: this.configService.get('MAIL_USER')},
          params: {firstname: user.firstname, url: url},
          templateId: 1
        })
      };
      await this.usersService.updateUser(usersDto, user);
      return fetch(this.configService.get('SENDINBLUE_URL_API'), options)
    }catch (e) {
      throw new HttpException(e.message,e.status);
    }
  }

  public async changePassword(usersDto: UsersDto, token: string){
    try {
      const user = await this.checkToken(token);
      // set new password in updateDto.password
      return this.usersService.updateUser(usersDto, user, true);
    }catch(e){
      throw new HttpException(e.message,e.status);
    }
  }

  public getJwtAccessToken(userId: number, device = 'web') {
    const payload: TokenPayload = { userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
          `JWT_ACCESS_TOKEN_EXPIRATION_TIME_${device === 'mobile' ? 'MOBILE' : 'WEB'}`,
      )}s`,
    });
  }

    public getCookieWithJwtAccessToken(userId: number, device = 'web') {
        const token = this.getJwtAccessToken(userId,device);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            `JWT_ACCESS_TOKEN_EXPIRATION_TIME_${device === 'mobile' ? 'MOBILE' : 'WEB'}`,
        )}`;
    }

    public getCookiesForLogOut() {
        return ['Authentication=; HttpOnly; Path=/ Max-Age=0'];
    }

    public isUserConnected(user) {
    }
}
