import {Injectable, Logger} from '@nestjs/common';

import {
  MembershipNotFoundException,
  OrgNotFoundException,
} from '@/common/exceptions';
import {MembershipRole} from '@/common/types';
import {OrgModel} from '@/models';
import {PrismaService} from '@/modules/shared';

import {CreateOrgRequest, UpdateOrgRequest} from './dto';

@Injectable()
export class OrgService {
  private logger = new Logger(OrgService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createOrg(
    createOrgRequest: CreateOrgRequest,
    userId: string,
  ): Promise<OrgModel> {
    const {name} = createOrgRequest;

    // todo: Check if the user can create more orgs on their plan
    const org = await this.prismaService.org.create({
      data: {
        name,
        Membership: {
          create: {
            role: MembershipRole.OWNER,
            userId: userId,
          },
        },
      },
    });

    return OrgModel.fromEntity(org);
  }

  async getOrgs(userId: string): Promise<Array<OrgModel>> {
    const orgs = await this.prismaService.org.findMany({
      where: {
        Membership: {
          some: {userId: userId},
        },
      },
    });

    return orgs.map(OrgModel.fromEntity);
  }

  async getOrg(orgId: string, userId: string): Promise<OrgModel> {
    const org = await this.prismaService.org.findFirst({
      where: {
        id: orgId,
        Membership: {
          some: {userId: userId},
        },
      },
    });

    if (!org) {
      throw new OrgNotFoundException();
    }

    return OrgModel.fromEntity(org);
  }

  async updateOrg(
    orgId: string,
    updateOrgRequest: UpdateOrgRequest,
    userId: string,
  ): Promise<void> {
    const membership = await this.prismaService.membership.findFirst({
      where: {userId, orgId},
    });

    if (!membership) {
      this.logger.verbose(
        `User ${userId} has no active membership on org ${orgId}`,
      );
      throw new MembershipNotFoundException();
    }

    try {
      const affectedLines = await this.prismaService.org.updateMany({
        data: updateOrgRequest,
        where: {
          id: orgId,
          Membership: {
            some: {userId: userId},
          },
        },
      });

      if (affectedLines.count === 0) {
        throw new OrgNotFoundException();
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrg(orgId: string, userId: string): Promise<void> {
    const membership = await this.prismaService.membership.findFirst({
      where: {userId, orgId},
    });

    if (!membership) {
      this.logger.verbose(
        `User ${userId} has no active membership on org ${orgId}`,
      );
      throw new MembershipNotFoundException();
    }

    try {
      const affectedLines = await this.prismaService.org.deleteMany({
        where: {
          id: orgId,
          Membership: {
            some: {userId: userId},
          },
        },
      });

      if (affectedLines.count === 0) {
        throw new OrgNotFoundException();
      }

      return null;
    } catch (error) {
      throw error;
    }
  }
}
