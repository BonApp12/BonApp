import {Injectable} from '@nestjs/common';
import {Restaurant} from "../restaurant/entities/restaurant.entity";
import {RestaurantDto} from "../restaurant/dto/restaurant.dto";
import {Tables} from "../tables/entities/tables.entity";
import {PlateAdapter} from "./PlateAdapter";
import {Tables} from "../tables/entities/tables.entity";

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
        restaurantDto.tables = restaurant?.tables;
        return restaurantDto;
    }

    static fromTableToDto(table: Tables): RestaurantDto {
        const restaurantDto = new RestaurantDto();
        restaurantDto.id = table?.restaurant.id;
        restaurantDto.name = table?.restaurant.name;
        restaurantDto.address = table?.restaurant.address;
        restaurantDto.siren = table?.restaurant.siren;
        restaurantDto.plates = PlateAdapter.toDtoList(table?.restaurant.plates);
        restaurantDto.contact_firstname = table?.restaurant.contact_firstname;
        restaurantDto.contact_lastname = table?.restaurant.contact_lastname;
        restaurantDto.contact_phone = table?.restaurant.contact_phone;
        restaurantDto.contact_email = table?.restaurant.contact_email;

        delete table.restaurant; // Évite le doublon de restaurant dans le DTO
        restaurantDto.tables = table;

        return restaurantDto;
    }

    static fromTableToDto(table: Tables): RestaurantDto {
        const restaurantDto = new RestaurantDto();
        restaurantDto.id = table.restaurant.id;
        restaurantDto.name = table.restaurant.name;
        restaurantDto.address = table.restaurant.address;
        restaurantDto.siren = table.restaurant.siren;
        restaurantDto.plates = table.restaurant.plates;
        restaurantDto.contact_firstname = table.restaurant.contact_firstname;
        restaurantDto.contact_lastname = table.restaurant.contact_lastname;
        restaurantDto.contact_phone = table.restaurant.contact_phone;
        restaurantDto.contact_email = table.restaurant.contact_email;

        delete table.restaurant; // Évite le doublon de restaurant dans le DTO
        restaurantDto.tables = table;
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
        restaurantModel.id = restaurant?.id;
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
