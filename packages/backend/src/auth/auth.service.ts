import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {CreateUsersDto} from '../users/dto/create-users.dto';
import {ConfigService} from '@nestjs/config';
import {UTILS} from "../app.utils";
import {UsersDto} from "../users/dto/users.dto";
import {MailService} from "../mail/mail.service";
import {v4 as uuidv4} from 'uuid';
import {UserRole} from "../users/UserRole.enum";
import {UserAdapter} from "../Adapter/UserAdapter";

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

  public async register(registrationData: UsersDto) {
    try {
      if(!registrationData.password && registrationData.role === UserRole.CLIENT) {
        throw new HttpException("Mot de passe requis", HttpStatus.UNPROCESSABLE_ENTITY);
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
      return UserAdapter.toDtoUpdatePassword(await this.usersService.findBy({token: token}));
    } catch (e) {
      throw new HttpException("Vous n'avez pas accès", HttpStatus.UNAUTHORIZED);
    }
  }

  public async forgetPwd(usersDto: UsersDto = null) {
    try {
      const token = uuidv4();
      usersDto.token = token;
      const url = `${this.configService.get('URL_FRONTEND')}/update-password?token=${token}`;
      const user = UserAdapter.toDtoUpdatePassword(await this.usersService.getByEmail(usersDto.email));
      await this.usersService.updateUser(usersDto, user);
      return this.mailerService.sendMail(user.email,'forget_password','Mot de passe oublié',{name:user.firstname,url});
    }catch (e) {
      throw new HttpException("L'utilisateur n'existe pas",HttpStatus.BAD_REQUEST);
    }
  }

  public async changePwd(usersDto: UsersDto, token: string){
    try {
      const user = await this.checkToken(token);
      // set new password in updateDto.password
      if (usersDto.password) return this.usersService.updateUser(usersDto, user, true);
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
