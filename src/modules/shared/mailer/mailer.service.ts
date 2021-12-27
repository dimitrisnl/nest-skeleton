import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {createTransport} from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

import {isDevEnv} from '@/config/environment-utils';

import {
  config,
  getChangeMailTemplate,
  getChangePasswordTemplate,
  getConfirmMailTemplate,
  getResetPasswordTemplate,
} from './templates';

@Injectable()
export class MailerService {
  private transporter: Mail;
  private logger = new Logger(MailerService.name);

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: this.configService.get('MAIL_SECURE'),
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });
  }

  async sendVerifyEmailMail(email: string, token: string): Promise<boolean> {
    const buttonLink = `${config.project.mailVerificationUrl}?token=${token}`;
    const mailContent = getConfirmMailTemplate(buttonLink);

    const mailOptions = {
      from: `"${config.sender.name}" <${config.sender.email}>`,
      to: email,
      subject: `Welcome to ${config.project.name}! Confirm your email`,
      html: mailContent,
    };

    return this.sendMail(mailOptions);
  }

  async sendChangeEmailMail(
    oldEmail: string,
    newEmail: string,
    token: string,
  ): Promise<boolean> {
    const buttonLink = `${config.project.mailChangeUrl}?token=${token}`;
    const mailContent = getChangeMailTemplate(buttonLink, newEmail);

    const mailOptions = {
      from: `"${config.sender.name}" <${config.sender.email}>`,
      to: oldEmail,
      subject: `Change your ${config.project.name} account email`,
      html: mailContent,
    };

    return this.sendMail(mailOptions);
  }

  async sendResetPasswordMail(email: string, token: string): Promise<boolean> {
    const buttonLink = `${config.project.resetPasswordUrl}?token=${token}`;
    const mailContent = getResetPasswordTemplate(buttonLink);

    const mailOptions = {
      from: `"${config.sender.name}" <${config.sender.email}>`,
      to: email,
      subject: `Reset your ${config.project.name} account Password`,
      html: mailContent,
    };

    return this.sendMail(mailOptions);
  }

  async sendPasswordChangeInfoMail(email: string): Promise<boolean> {
    const mailContent = getChangePasswordTemplate();

    const mailOptions = {
      from: `"${config.sender.name}" <${config.sender.email}>`,
      to: email,
      subject: `Your ${config.project.name} account Password has changed`,
      html: mailContent,
    };

    return this.sendMail(mailOptions);
  }

  async sendMail(mailOptions) {
    const env = this.configService.get('NODE_ENV');

    if (isDevEnv(env)) {
      Logger.log('Attaching mail contents:');
      console.log(mailOptions);
      return false;
    }

    return new Promise<boolean>((resolve) => {
      return this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          console.log(error);
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          );
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
