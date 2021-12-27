import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {MembershipRole} from '@prisma/client';

import {GetUser} from '@/common/decorators';
import {CookieAuthGuard, EmailConfirmedGuard, RoleGuard} from '@/common/guards';
import {OrgModel, UserModel} from '@/models';

import {CreateOrgRequest, UpdateOrgRequest} from './dto';
import {OrgService} from './org.service';

@Controller('org')
export class OrgController {
  private logger = new Logger(OrgController.name);

  constructor(private orgService: OrgService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(EmailConfirmedGuard) // triggers after CookieAuthGuard, bottom to top
  @UseGuards(CookieAuthGuard) // no role needed
  createOrg(
    @Body() createOrgRequest: CreateOrgRequest,
    @GetUser() user: UserModel,
  ): Promise<OrgModel> {
    this.logger.verbose(`User "${user.email}" creating an org.`);
    return this.orgService.createOrg(createOrgRequest, user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RoleGuard(MembershipRole.USER))
  getOrgs(@GetUser() user: UserModel): Promise<Array<OrgModel>> {
    return this.orgService.getOrgs(user.id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RoleGuard(MembershipRole.USER))
  getOrg(
    @Param('id') id: string,
    @GetUser() user: UserModel,
  ): Promise<OrgModel> {
    return this.orgService.getOrg(id, user.id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RoleGuard(MembershipRole.USER))
  updateOrg(
    @Param('id') id: string,
    @Body() updateOrgRequest: UpdateOrgRequest,
    @GetUser() user: UserModel,
  ): Promise<void> {
    this.logger.verbose(`User "${user.email}" updating an org.`);
    return this.orgService.updateOrg(id, updateOrgRequest, user.id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RoleGuard(MembershipRole.OWNER))
  deleteOrg(
    @Param('id') id: string,
    @GetUser() user: UserModel,
  ): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting an org. Id: ${id}`);
    return this.orgService.deleteOrg(id, user.id);
  }
}
