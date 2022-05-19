import {Injectable} from '@nestjs/common';
import {Restaurant} from "../restaurant/entities/restaurant.entity";
import {RestaurantDto} from "../restaurant/dto/restaurant.dto";
import {PlateAdapter} from "./PlateAdapter";

@Injectable()
export class RestaurantAdapter {

    static toDto(restaurant: Restaurant): RestaurantDto {
        const restaurantDto = new RestaurantDto();
        restaurantDto.id = restaurant?.id;
        restaurantDto.name = restaurant?.name;
        restaurantDto.address = restaurant?.address;
        restaurantDto.siren = restaurant?.siren;
        restaurantDto.plates = PlateAdapter.toDtoList(restaurant?.plates);
        restaurantDto.contact_firstname = restaurant?.contact_firstname;
        restaurantDto.contact_lastname = restaurant?.contact_lastname;
        restaurantDto.contact_phone = restaurant?.contact_phone;
        restaurantDto.contact_email = restaurant?.contact_email;
        return restaurantDto;
    }

    static toModel(restaurant: RestaurantDto) {
        const restaurantModel = new Restaurant();
        restaurantModel.id = restaurant?.id;
        restaurantModel.name = restaurant.name;
        restaurantModel.address = restaurant.address;
        restaurantModel.siren = restaurant.siren;
        restaurantModel.plates = restaurant?.plates?.map(plate => PlateAdapter.toModel(plate));
        restaurantModel.contact_firstname = restaurant.contact_firstname;
        restaurantModel.contact_lastname = restaurant.contact_lastname;
        restaurantModel.contact_phone = restaurant.contact_phone;
        restaurantModel.contact_email = restaurant.contact_email;
        return restaurantModel;
    }
    static toModelInsert(restaurant: RestaurantDto) {
        const restaurantModel = new Restaurant();
        restaurantModel.name = restaurant.name;
        restaurantModel.address = restaurant.address;
        restaurantModel.siren = restaurant.siren;
        restaurantModel.contact_firstname = restaurant.contact_firstname;
        restaurantModel.contact_lastname = restaurant.contact_lastname;
        restaurantModel.contact_phone = restaurant.contact_phone;
        restaurantModel.contact_email = restaurant.contact_email;
        return restaurantModel;
    }

}
