import {IsNotEmpty, MaxLength, MinLength} from 'class-validator';

export class CreateOrgRequest {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  name: string;
}
