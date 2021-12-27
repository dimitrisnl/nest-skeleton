import {Prisma} from '@prisma/client';
import {instanceToPlain, Transform} from 'class-transformer';

import {MembershipModel} from '@/models';

type UserWithMembership = Prisma.UserGetPayload<{
  include: {
    memberships: {
      include: {
        org: true;
      };
    };
  };
}>;

export class UserModel {
  id: string;

  @Transform(({value}) => value.toLowerCase())
  email: string;

  acceptedTermsAt: Date;

  emailVerifiedAt: Date | null;

  memberships: Array<MembershipModel>;

  static fromEntity(entity: UserWithMembership) {
    const userModel = new UserModel();
    userModel.id = entity.id;
    userModel.email = entity.email;
    userModel.acceptedTermsAt = entity.acceptedTermsAt;
    userModel.emailVerifiedAt = entity.emailVerifiedAt;

    const memberships = (entity.memberships || []).map(
      MembershipModel.fromEntity,
    );

    userModel.memberships = memberships;

    return userModel;
  }

  static toJSON(model: UserModel) {
    return instanceToPlain(model);
  }
}
