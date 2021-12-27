import {Membership} from '@prisma/client';
import {instanceToPlain} from 'class-transformer';

import {MembershipRole} from '@/common/types';

export class MembershipModel {
  id: string;
  orgId: string;
  userId: string;
  role: MembershipRole;

  static fromEntity(entity: Membership) {
    const membershipModel = new MembershipModel();
    membershipModel.id = entity.id;
    membershipModel.role = entity.role;
    membershipModel.orgId = entity.orgId;
    membershipModel.userId = entity.userId;

    return membershipModel;
  }

  static toJSON(model: MembershipModel) {
    return instanceToPlain(model);
  }
}
