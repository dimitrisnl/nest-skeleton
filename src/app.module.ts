import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ScheduleModule} from '@nestjs/schedule';

import {configValidationSchema} from './config/config-validation.schema';
import {AuthModule} from './modules/auth/auth.module';
import {OrgModule} from './modules/org/org.module';
import {MailerModule} from './modules/shared/mailer/mailer.module';
import {PrismaModule} from './modules/shared/prisma/prisma.module';
import {UserModule} from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      envFilePath: [`.env`],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    MailerModule,
    OrgModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
