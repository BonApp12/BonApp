import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {CreateUsersDto} from '../users/dto/create-users.dto';
import {ConfigService} from '@nestjs/config';
import {AuthErrorCode} from './auth-error-code.enum';
import {UTILS} from "../app.utils";
import {plainToClass} from "class-transformer";
import {UsersDto} from "../users/dto/users.dto";
import {MailService} from "../mail/mail.service";
import {UpdateUsersDto} from "../users/dto/update-users.dto";
import {ForgetPasswordDto} from "../users/dto/forget-password.dto";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private mailerService: MailService
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
      return plainToClass(UsersDto, await this.usersService.findBy({token: token}));
    } catch (e) {
      throw new HttpException("Vous n'avez pas accès", HttpStatus.UNAUTHORIZED);
    }
  }

  private static async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async updateUser(updateDto: UpdateUsersDto, user) {
    const newUser = {
      ...user,
      ...updateDto,
    };

    if(updateDto?.oldPassword?.trim().length){
      const checkPassword = await AuthService.verifyPassword(newUser.oldPassword, user.password);
      if(!checkPassword){
        throw new HttpException(
            'Wrong credentials provided (password <- dont forget to remove this after)',
            HttpStatus.BAD_REQUEST,
        );
      }
      delete newUser.oldPassword;
    }else{
      delete newUser.password;
    }
    return this.usersService.update(newUser);
  }

  public async forgetPwd(updateDto: ForgetPasswordDto = null) {
    try {
      const token = uuidv4();
      const user = plainToClass(UsersDto, await this.usersService.getByEmail(updateDto.email));
      await this.usersService.updateUser({token}, user);
      return this.mailerService.sendForgetMail(user, token, 'forget_password');
    }catch (e) {
      throw new HttpException("L'utilisateur n'existe pas",HttpStatus.BAD_REQUEST);
    }
  }

  public async changePwd(updateDto: UpdateUsersDto, token: string){
    try {
      const user = plainToClass(UsersDto, await this.checkToken(token));
      // set new password in updateDto.password
      if (updateDto.password) return this.usersService.updateUser(updateDto, user, true);
      throw new HttpException("Le mot de passe est vide", HttpStatus.BAD_REQUEST);
    }catch(e){
      throw new HttpException(`${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  public getJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
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
