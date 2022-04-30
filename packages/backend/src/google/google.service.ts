import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {Auth, google} from 'googleapis';
import {AuthService} from "../auth/auth.service";
import {UsersService} from "../users/users.service";
import {UserAdapter} from "../Adapter/UserAdapter";
import {UserRole} from "../users/UserRole.enum";
import {Users} from "../users/entities/users.entity";

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
    if(user) return UserAdapter.toDto(user);
    return this.registerUser(token);
  }

  async registerUser(token: string) {
    const userData = await this.getUserData(token);
    const createUserDto = UserAdapter.toDto(<Users>{
      email: userData.email,
      firstname: userData.given_name || '',
      lastname: userData.family_name || '',
      role: UserRole.CLIENT
    });
    return this.usersService.create(createUserDto);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({access_token: token});

    const userInfoResponse = await userInfoClient.get({auth: this.oauthClient});
    return userInfoResponse.data;
  }
}
