import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import fetch from "node-fetch";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private configService: ConfigService) {}

    async sendMail(to, template: string, subject: string, context: object) {
        return this.mailerService.sendMail({
            to,
            subject,
            template,
            context
        });
    }

    async sendMailWithSendInBlue(templateId: number, to: string, params: object) {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'api-key': this.configService.get('SENDINBLUE_API_KEY'),
            },
            body: JSON.stringify({
                sender: {email: this.configService.get('MAIL_FROM')},
                to: [{email: to}],
                replyTo: {email: this.configService.get('MAIL_USER')},
                params: {...params},
                templateId: templateId
            })
        };
        const mail = () => fetch(this.configService.get('SENDINBLUE_URL_API'), options);
        await mail();
    }
}