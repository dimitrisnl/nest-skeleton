import {Request} from 'express';

import {UserModel} from '@/models';

export interface RequestWithUser extends Request {
  user: UserModel;
}
