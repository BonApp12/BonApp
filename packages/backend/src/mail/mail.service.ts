import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {UsersDto} from "../users/dto/users.dto";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private configService: ConfigService) {}

    async sendForgetMail(user: UsersDto, token: string, template: string) {
        const url = `${this.configService.get('URL_FRONTEND')}/update-password?token=${token}`;

        return this.mailerService.sendMail({
            to: user.email,
            subject: 'Mot de passe oublié',
            template: template,
            context: {
                name: user.firstname,
                url,
            },
        });
    }
}