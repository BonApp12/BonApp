import {Injectable} from '@nestjs/common';
import {Restaurant} from "../restaurant/entities/restaurant.entity";
import {RestaurantDto} from "../restaurant/dto/restaurant.dto";

@Injectable()
export class RestaurantAdapter {

    static toDto(restaurant: Restaurant): RestaurantDto {
        const restaurantDto = new RestaurantDto();
        restaurantDto.id = restaurant.id;
        restaurantDto.name = restaurant.name;
        restaurantDto.address = restaurant.address;
        restaurantDto.siren = restaurant.siren;
        // A convertir ici aussi en DTO
        restaurantDto.plates = restaurant.plates;
        restaurantDto.contact_firstname = restaurant.contact_firstname;
        restaurantDto.contact_lastname = restaurant.contact_lastname;
        restaurantDto.contact_phone = restaurant.contact_phone;
        restaurantDto.contact_email = restaurant.contact_email;
        return restaurantDto;
    }
}
