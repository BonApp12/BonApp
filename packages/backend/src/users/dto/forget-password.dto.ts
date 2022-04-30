import {IsEmail, IsString} from "class-validator";

export class ForgetPasswordDto {
  @IsString()
  @IsEmail({}, {message: "L'email n'est pas valide"})
  email: string;
}