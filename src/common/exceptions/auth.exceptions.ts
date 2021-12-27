import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class TermsNotAcceptedException extends BadRequestException {
  constructor() {
    super(`Please accept the terms in order to signup`);
  }
}

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super(`Email not available`);
  }
}

export class EmailNotVerifiedException extends UnauthorizedException {
  constructor() {
    super(`Email not verified`);
  }
}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(`Please check your login credentials`);
  }
}

export class TokenNotFoundException extends NotFoundException {
  constructor() {
    super(`Token not found`);
  }
}

export class InvalidTokenException extends NotFoundException {
  constructor() {
    super(`Invalid token`);
  }
}
