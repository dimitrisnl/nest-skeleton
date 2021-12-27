import {createParamDecorator, ExecutionContext} from '@nestjs/common';

import {MembershipModel} from '@/models';

import {
  MembershipNotFoundException,
  OrgIdRequiredException,
} from '../exceptions';
import {RequestWithUser} from '../interfaces';

export const GetMembership = createParamDecorator(
  (_data, ctx: ExecutionContext): MembershipModel => {
    const req: RequestWithUser = ctx.switchToHttp().getRequest();

    const orgId = req.headers['org-id'];

    if (!orgId) {
      // should never happen, use after RoleGuard
      throw new OrgIdRequiredException();
    }

    const membership = req.user.memberships.find(
      (membership) => membership.orgId === orgId,
    );

    if (!membership) {
      throw new MembershipNotFoundException();
    }

    return membership;
  },
);
