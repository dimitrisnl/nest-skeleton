import {CanActivate, ExecutionContext, mixin, Type} from '@nestjs/common';

import {
  NotEnoughPermissionsException,
  OrgIdRequiredException,
} from '../exceptions';
import {RequestWithUser} from '../interfaces';
import {MembershipRole} from '../types';
import {isRoleSufficient} from '../utils';
import {CookieAuthGuard} from './cookie-auth.guard';

export const RoleGuard = (requiredRole: MembershipRole): Type<CanActivate> => {
  class RoleGuardMixin extends CookieAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      const userMemberships = user.memberships;

      let orgId = request.headers['org-id'];

      if (!orgId && userMemberships.length === 1) {
        orgId = userMemberships[0].orgId;
      } else {
        throw new OrgIdRequiredException();
      }

      const orgMembership = userMemberships.find(
        (membership) => membership.orgId === orgId,
      );

      if (!orgMembership.role) {
        throw new NotEnoughPermissionsException();
      }

      if (isRoleSufficient({currentRole: orgMembership.role, requiredRole})) {
        return true;
      } else {
        throw new NotEnoughPermissionsException();
      }
    }
  }

  return mixin(RoleGuardMixin);
};
