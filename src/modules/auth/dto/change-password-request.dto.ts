import {IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class ChangePasswordRequest {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(10)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  newPassword: string;
}
