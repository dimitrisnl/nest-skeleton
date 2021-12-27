import {ForbiddenException} from '@nestjs/common';

export class MembershipNotFoundException extends ForbiddenException {
  constructor() {
    super(`Membership not found`);
  }
}

export class NotEnoughPermissionsException extends ForbiddenException {
  constructor() {
    super(`You don't have the required permissions to access this resource`);
  }
}
