import {Injectable, UnprocessableEntityException} from '@nestjs/common';

import {UserNotFoundException} from '@/common/exceptions';
import {MembershipRole} from '@/common/types';
import {PrismaService} from '@/modules/shared';
import {isRecordDoesNotExistError} from '@/modules/shared/prisma/prisma-error';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteUser(userId: string): Promise<void> {
    const membershipsAsOwner = await this.prismaService.membership.findMany({
      where: {userId, role: MembershipRole.OWNER},
    });

    if (membershipsAsOwner.length > 0) {
      // We can't delete if they're a owning an organizations, unless it's their sole member
      // todo: check if there other members, otherwise delete
      throw new UnprocessableEntityException(
        'Please delete existing orgs or delegate before deleting your account',
      );
    }

    try {
      await this.prismaService.user.delete({where: {id: userId}});
      return null;
    } catch (error) {
      if (isRecordDoesNotExistError(error)) {
        throw new UserNotFoundException();
      }
      throw error;
    }
  }
}
