import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { google, Auth } from 'googleapis';
import {AuthService} from "../auth/auth.service";
import {UsersService} from "../users/users.service";
import {plainToClass} from "class-transformer";
import {UsersDto} from "../users/dto/users.dto";

@Injectable()
export class GoogleService {
  private readonly oauthClient: Auth.OAuth2Client;
  constructor(private readonly configService: ConfigService, private readonly authService: AuthService, private readonly usersService: UsersService) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');
    
    this.oauthClient = new google.auth.OAuth2(
        clientID,
        clientSecret
    );
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const email = tokenInfo.email;
    const user = await this.usersService.getByEmail(email);
    if(user) return user;
    return this.registerUser(token);
  }

  async registerUser(token: string) {
    const userData = await this.getUserData(token);
    const createUserDto = plainToClass(UsersDto, {
      email: userData.email,
      firstname: userData.given_name,
      lastname: userData.family_name,
      password: null,
      role: 'CLIENT'
    });
    return this.usersService.create(createUserDto);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token
    })

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient
    });

    return userInfoResponse.data;
  }
}
