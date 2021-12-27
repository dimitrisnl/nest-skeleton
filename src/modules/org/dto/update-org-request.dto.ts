import {IsNotEmpty, MaxLength, MinLength} from 'class-validator';

export class UpdateOrgRequest {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  name: string;
}
