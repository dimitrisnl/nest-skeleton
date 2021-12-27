import {MembershipRole} from '../types/membership-role.type';

const {OWNER, ADMIN, USER} = MembershipRole;

// todo: Needs something cleverer
const roleCoverage: Record<MembershipRole, Array<MembershipRole>> = {
  [OWNER]: [OWNER, ADMIN, USER],
  [ADMIN]: [ADMIN, USER],
  [USER]: [USER],
};

export function isRoleSufficient({
  currentRole,
  requiredRole,
}: {
  currentRole: MembershipRole;
  requiredRole: MembershipRole;
}) {
  return roleCoverage[currentRole].includes(requiredRole);
}
