import {BadRequestException, NotFoundException} from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(`User not found`);
  }
}

export class InvalidPasswordException extends BadRequestException {
  constructor() {
    super(`Invalid password`);
  }
}
