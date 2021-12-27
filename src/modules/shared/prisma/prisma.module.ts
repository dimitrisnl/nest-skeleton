import {Global, Module} from '@nestjs/common';

import {PrismaService} from './prisma.service';

// todo: should it be global? Should it live under /common then?
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
