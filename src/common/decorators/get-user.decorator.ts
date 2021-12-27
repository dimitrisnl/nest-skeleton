import {createParamDecorator, ExecutionContext} from '@nestjs/common';

import {UserModel} from '@/models';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserModel => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
