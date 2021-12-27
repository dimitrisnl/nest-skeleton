import {Transform} from 'class-transformer';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({value}) => value.toLowerCase())
  email: string;

  @IsString()
  password: string;
}
