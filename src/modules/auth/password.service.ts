import {Injectable, Logger} from '@nestjs/common';
import {nanoid} from 'nanoid';

import {
  InvalidPasswordException,
  InvalidTokenException,
  UserNotFoundException,
} from '@/common/exceptions';
import {hashPassword, validatePassword} from '@/common/utils';
import {MailerService, PrismaService} from '@/modules/shared';

import {ChangePasswordRequest, ResetPasswordRequest} from './dto';

@Injectable()
export class PasswordService {
  private logger = new Logger(PasswordService.name);

  // todo: add cron, delete outstanding tokens
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async sendResetPasswordMail(email: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: {email},
      select: {id: true, email: true},
    });

    if (user === null) {
      throw new UserNotFoundException();
    }

    const deletePrevPasswordResetIfExist =
      this.prismaService.passwordReset.deleteMany({
        where: {userId: user.id},
      });

    const token = nanoid();

    const createPasswordReset = this.prismaService.passwordReset.create({
      data: {userId: user.id, token},
      select: null,
    });

    await this.prismaService.$transaction([
      deletePrevPasswordResetIfExist,
      createPasswordReset,
    ]);

    await this.mailerService.sendResetPasswordMail(user.email, token);
  }

  async resetPassword(
    resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    const passwordReset = await this.prismaService.passwordReset.findUnique({
      where: {token: resetPasswordRequest.token},
    });

    const isPasswordResetValid =
      passwordReset !== null && passwordReset.validUntil > new Date();

    if (!isPasswordResetValid) {
      Logger.log(
        `Invalid reset password token ${resetPasswordRequest.token} is rejected`,
      );
      throw new InvalidTokenException();
    }

    const hashedPassword = await hashPassword(resetPasswordRequest.newPassword);
    await this.prismaService.user.update({
      select: null,
      where: {id: passwordReset.userId},
      data: {
        password: hashedPassword,
      },
    });

    // invalidate token
    await this.prismaService.passwordReset.deleteMany({
      where: {userId: passwordReset.userId},
    });
  }

  async changePassword(
    changePasswordRequest: ChangePasswordRequest,
    userId: string,
  ): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: {id: userId},
    });

    const passwordValid = await validatePassword(
      changePasswordRequest.oldPassword,
      user.password,
    );

    if (!passwordValid) {
      throw new InvalidPasswordException();
    }

    const hashedPassword = await hashPassword(
      changePasswordRequest.newPassword,
    );

    const {email} = await this.prismaService.user.update({
      where: {id: userId},
      data: {password: hashedPassword},
      select: {email: true},
    });

    // no need to wait for information email
    this.mailerService.sendPasswordChangeInfoMail(email);
  }
}
