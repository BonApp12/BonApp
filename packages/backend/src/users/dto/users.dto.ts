import { IsEmail } from 'class-validator';
import { UserRole } from '../UserRole.enum';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Exclude } from 'class-transformer';

export class UsersDto {
    id: number;
    firstname: string;
    lastname: string;

    @IsEmail()
    email: string;

    @Exclude()
    password?: string;

    role: UserRole;
    restaurant: Restaurant;
}