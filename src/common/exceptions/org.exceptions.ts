import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export class OrgNotFoundException extends NotFoundException {
  constructor() {
    super(`Organization not found`);
  }
}

export class NotOrgOwnerException extends ForbiddenException {
  constructor() {
    super(`Only owners can perform this action`);
  }
}

export class OrgIdRequiredException extends BadRequestException {
  constructor() {
    super(`OrgId is required`);
  }
}
