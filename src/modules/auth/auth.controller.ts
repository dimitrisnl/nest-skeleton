import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {GetUser} from '@/common/decorators';
import {CookieAuthGuard, LogInWithCredentialsGuard} from '@/common/guards';
import {RequestWithUser} from '@/common/interfaces';
import {UserModel} from '@/models';

import {AuthService} from './auth.service';
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from './dto';
import {EmailService} from './email.service';
import {LocalSerializer} from './passport/local.serializer';
import {PasswordService} from './password.service';

@Controller('auth')
@UseInterceptors(LocalSerializer)
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
    private passwordService: PasswordService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() registerRequest: RegisterRequest): Promise<void> {
    await this.authService.signUp(registerRequest);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LogInWithCredentialsGuard)
  async login(@GetUser() user: UserModel): Promise<UserModel> {
    return user;
  }

  @Get('whoami')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieAuthGuard)
  async authenticate(@GetUser() user: UserModel): Promise<UserModel> {
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieAuthGuard)
  async logout(@Req() request: RequestWithUser): Promise<void> {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }

  @Get('/verify')
  @HttpCode(HttpStatus.OK)
  async verifyMail(@Query('token') token: string): Promise<void> {
    await this.emailService.verifyEmail(token);
  }

  @Post('/resend-verification')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieAuthGuard)
  async resendVerificationMail(@GetUser() user: UserModel): Promise<void> {
    await this.emailService.resendVerificationMail(user.email, user.id);
  }

  @Post('/change-email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieAuthGuard)
  async sendChangeEmailMail(
    @GetUser() user: UserModel,
    @Body() changeEmailRequest: ChangeEmailRequest,
  ): Promise<void> {
    await this.emailService.sendChangeEmailMail(
      changeEmailRequest,
      user.id,
      user.email,
    );
  }

  @Get('/change-email')
  @HttpCode(HttpStatus.OK)
  async changeEmail(@Query('token') token: string): Promise<void> {
    await this.emailService.changeEmail(token);
  }

  @Post('/forgot-password/:email')
  @HttpCode(HttpStatus.OK)
  async sendResetPassword(@Param('email') email: string): Promise<void> {
    await this.passwordService.sendResetPasswordMail(email);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    await this.passwordService.resetPassword(resetPasswordRequest);
  }

  @Post('/change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieAuthGuard)
  async changePassword(
    @Body() changePasswordRequest: ChangePasswordRequest,
    @GetUser() user: UserModel,
  ): Promise<void> {
    await this.passwordService.changePassword(changePasswordRequest, user.id);
  }
}
