import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Address} from './entities/address.entity';
import {Repository} from 'typeorm';
import {Restaurant} from "../restaurant/entities/restaurant.entity";

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private addressRepository: Repository<Address>,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) {
    }

    findOne(id: string) {
        return this.addressRepository.findOne(id);
    }

    findbyRestaurantId(id: string) {
        return this.restaurantRepository.findOne(id, {relations: ['address']});
    }
}
