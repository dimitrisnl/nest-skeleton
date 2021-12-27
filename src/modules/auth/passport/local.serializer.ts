import {Injectable} from '@nestjs/common';
import {PassportSerializer} from '@nestjs/passport';

import {UserModel} from '@/models';
import {PrismaService} from '@/modules/shared';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  serializeUser(user: UserModel, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.prismaService.user.findUnique({
      where: {id: userId},
      include: {
        memberships: {
          include: {
            org: true,
          },
        },
      },
    });
    const userModel = UserModel.fromEntity(user);

    done(null, userModel);
  }
}
