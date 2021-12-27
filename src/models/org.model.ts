import {Org} from '@prisma/client';
import {instanceToPlain} from 'class-transformer';

export class OrgModel {
  id: string;
  name: string;

  static fromEntity(entity: Org) {
    const orgModel = new OrgModel();
    orgModel.id = entity.id;
    orgModel.name = entity.name;

    return orgModel;
  }

  static toJSON(model: OrgModel) {
    return instanceToPlain(model);
  }
}
