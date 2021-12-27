import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';

import {MailerModule} from '@/modules/shared/mailer/mailer.module';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {EmailService} from './email.service';
import {LocalStrategy} from './passport/local.strategy';
import {PasswordService} from './password.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({defaultStrategy: 'local'}),
    MailerModule,
  ],
  providers: [AuthService, EmailService, PasswordService, LocalStrategy],
  controllers: [AuthController],
  exports: [LocalStrategy, PassportModule],
})
export class AuthModule {}
