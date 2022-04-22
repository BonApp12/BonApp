import { IsString, MinLength, IsEmail } from 'class-validator';
import { UserRole } from '../UserRole.enum';
export class CreateUsersDto {
  firstname: string;
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  password: string;

  role: UserRole;
}
