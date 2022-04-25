import {IsEmail, IsOptional, Length, Matches} from 'class-validator';
import { UserRole } from '../UserRole.enum';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import {MESSAGES, REGEX} from "../../app.utils";

export class UsersDto {
    id: number;
    firstname: string;
    lastname: string;

    @IsEmail({}, {message: "L'email n'est pas valide"})
    email: string;

    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
    @Length(8,15, {
        message: MESSAGES.PASSWORD_LENGTH
    })
    @IsOptional()
    password?: string;

    role: UserRole;
    restaurant: Restaurant;
    oldPassword?: string;
    token?: string;
}