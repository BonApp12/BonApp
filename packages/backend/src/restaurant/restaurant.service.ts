import {Injectable} from '@nestjs/common';
import {CreateRestaurantDto} from './dto/create-restaurant.dto';
import {UpdateRestaurantDto} from './dto/update-restaurant.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Restaurant} from './entities/restaurant.entity';
import {Repository} from 'typeorm';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        // private addressService: AddressService,
    ) {
    }

    create(createRestaurantDto: CreateRestaurantDto) {
        return 'This action adds a new restaurant';
    }

    findAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.find({relations: ['address', 'plates']});
    }

    findOne(id: number) {
        return this.restaurantRepository.findOne(id, {
            relations: ['address', 'plates', 'plates.ingredients'],
        });
    }

    async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
        //TODO: DEMANDER A WASS POURQUOI EST-CE QU'IL NE RENVOIE PAS DIRECTEMENT ÇA ET QU'IL EXECUTE 2 REQUETES
        // Et simplifier le update
        await this.restaurantRepository.update(id, {
            ...(updateRestaurantDto.name && {name: updateRestaurantDto.name}),
            ...(updateRestaurantDto.siren && {siren: updateRestaurantDto.siren}),
            ...(updateRestaurantDto.contact_firstname && {contact_firstname: updateRestaurantDto.contact_firstname}),
            ...(updateRestaurantDto.contact_lastname && {contact_lastname: updateRestaurantDto.contact_lastname}),
        });

        return this.restaurantRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.restaurantRepository.delete(id);
    }

    async handleRegisterForm(restaurant: CreateRestaurantDto) {
        // const restaurantEntity = RestaurantService.hydrateRestaurantEntity(restaurant);
        // Pour l'instant on rajoute l'adresse 1, mais faire en sorte de récupérer l'adresse depuis le front
        // const address = await this.addressService.findOne(1);

        // await Restaurant.save(restaurantEntity);
    }

    async handleUpdateForm(restaurant: UpdateRestaurantDto) {
        // const restaurantEntity = RestaurantService.hydrateRestaurantEntity(restaurant);
    }

    // private static hydrateRestaurantEntity(
    //     restaurant: CreateRestaurantDto | UpdateRestaurantDto,
    // ): Restaurant {
    //     const restaurantEntity: Restaurant = Restaurant.create();
    //
    //     restaurantEntity.id = restaurant.id;
    //     restaurantEntity.name = restaurant.name;
    //     restaurantEntity.siren = restaurant.siren;
    //     restaurantEntity.address = restaurant.address;
    //     restaurantEntity.contact_email = restaurant.contact_email;
    //     restaurantEntity.contact_firstname = restaurant.contact_firstname;
    //     restaurantEntity.contact_lastname = restaurant.contact_lastname;
    //     restaurantEntity.contact_phone = restaurant.contact_phone;
    //
    //     return restaurantEntity;
    // }
}
