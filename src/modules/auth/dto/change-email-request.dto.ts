import {Transform} from 'class-transformer';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class ChangeEmailRequest {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({value}) => value.toLowerCase())
  newEmail: string;
}
