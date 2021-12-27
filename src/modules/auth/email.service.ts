import {Injectable, Logger} from '@nestjs/common';

import {
  EmailAlreadyExistsException,
  InvalidTokenException,
  TokenNotFoundException,
} from '@/common/exceptions';
import {getUniqueId} from '@/common/utils';

import {MailerService, PrismaService} from '../shared';
import {ChangeEmailRequest} from './dto';

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);

  // todo: add cron, delete outstanding tokens

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {email},
      select: {email: true},
    });

    return user === null;
  }

  async verifyEmail(token: string): Promise<void> {
    if (!token) {
      throw new TokenNotFoundException();
    }

    const emailVerification =
      await this.prismaService.emailVerification.findUnique({
        where: {token},
      });

    const tokenIsValid =
      emailVerification !== null && emailVerification.validUntil > new Date();

    if (!tokenIsValid) {
      Logger.log(`Verify email called with invalid email token ${token}`);
      throw new InvalidTokenException();
    }

    const {email} = await this.prismaService.user.update({
      select: {email: true},
      where: {id: emailVerification.userId},
      data: {
        emailVerifiedAt: new Date(),
      },
    });

    // invalidate token
    await this.prismaService.emailVerification.deleteMany({
      where: {userId: emailVerification.userId},
    });

    Logger.log(`User ${email} verified their email`);
  }

  async resendVerificationMail(email: string, userId: string): Promise<void> {
    // delete old email verification tokens if exist
    const deletePrevEmailVerificationIfExist =
      this.prismaService.emailVerification.deleteMany({
        where: {userId},
      });

    const token = getUniqueId();

    const createEmailVerification = this.prismaService.emailVerification.create(
      {data: {userId, token}, select: null},
    );

    await this.prismaService.$transaction([
      deletePrevEmailVerificationIfExist,
      createEmailVerification,
    ]);

    await this.mailerService.sendVerifyEmailMail(email, token);
  }

  async sendChangeEmailMail(
    changeEmailRequest: ChangeEmailRequest,
    userId: string,
    oldEmail: string,
  ): Promise<void> {
    const emailAvailable = await this.isEmailAvailable(
      changeEmailRequest.newEmail,
    );
    if (!emailAvailable) {
      Logger.log(
        `User with id ${userId} tried to change its email to already used ${changeEmailRequest.newEmail}`,
      );
      throw new EmailAlreadyExistsException();
    }

    const deletePrevEmailChangeIfExist =
      this.prismaService.emailChange.deleteMany({
        where: {userId},
      });

    const token = getUniqueId();

    const {newEmail} = changeEmailRequest;

    const createEmailChange = this.prismaService.emailChange.create({
      data: {userId, token, newEmail},
      select: null,
    });

    await this.prismaService.$transaction([
      deletePrevEmailChangeIfExist,
      createEmailChange,
    ]);

    await this.mailerService.sendChangeEmailMail(oldEmail, newEmail, token);
  }

  async changeEmail(token: string): Promise<void> {
    const emailChange = await this.prismaService.emailChange.findUnique({
      where: {token},
    });

    const isEmailChangeValid =
      emailChange !== null && emailChange.validUntil > new Date();

    if (!isEmailChangeValid) {
      Logger.log(`Invalid email change token ${token} is rejected.`);
      throw new InvalidTokenException();
    }

    await this.prismaService.user.update({
      where: {id: emailChange.userId},
      data: {
        email: emailChange.newEmail.toLowerCase(),
      },
      select: null,
    });

    // invalidate token
    await this.prismaService.emailChange.deleteMany({
      where: {userId: emailChange.userId},
    });
  }
}
