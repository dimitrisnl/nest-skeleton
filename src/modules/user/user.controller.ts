import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
} from '@nestjs/common';

import {GetUser} from '@/common/decorators';
import {CookieAuthGuard} from '@/common/guards';
import {UserModel} from '@/models';

import {UserService} from './user.service';

@UseGuards(CookieAuthGuard)
@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieAuthGuard)
  deleteOrg(@GetUser() user: UserModel): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting their account`);
    return this.userService.deleteUser(user.id);
  }
}
