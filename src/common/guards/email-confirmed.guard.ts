import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import {RequestWithUser} from '../interfaces/req-with-user.interface';

@Injectable()
export class EmailConfirmedGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (!request.user?.emailVerifiedAt) {
      throw new UnauthorizedException('Confirm your email first');
    }

    return true;
  }
}
