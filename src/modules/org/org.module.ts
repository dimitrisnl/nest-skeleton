import {Module} from '@nestjs/common';

import {AuthModule} from '@/modules/auth/auth.module';

import {OrgController} from './org.controller';
import {OrgService} from './org.service';

@Module({
  imports: [AuthModule],
  providers: [OrgService],
  controllers: [OrgController],
})
export class OrgModule {}
