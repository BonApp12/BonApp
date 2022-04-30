import {IsEmail} from 'class-validator';
import { UserRole } from '../UserRole.enum';

export class CreateUsersDto {
  firstname: string;
  lastname: string;

  @IsEmail({}, {message: 'Votre email n\'est pas valide'})
  email: string;

  password?: string;

  role: UserRole;
}
