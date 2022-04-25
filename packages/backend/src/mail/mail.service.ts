import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendMail(to, template: string, subject: string, context: object) {
        return this.mailerService.sendMail({
            to,
            subject,
            template,
            context
        });
    }
}