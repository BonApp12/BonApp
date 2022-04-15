import {IsString, IsNotEmpty, IsEmail, Length, Matches} from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';
import { UserRole } from '../UserRole.enum';

export class CreateUsersDto {
  firstname: string;
  lastname: string;

  @IsEmail({}, {message: 'Votre email n\'est pas valide'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8,15, {
    message: MESSAGES.PASSWORD_LENGTH
  })
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  role: UserRole;
}
