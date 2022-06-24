import {Injectable} from '@nestjs/common';
import {CreateAddressDto} from './dto/create-address.dto';
import {UpdateAddressDto} from './dto/update-address.dto';
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

    create(createAddressDto: CreateAddressDto) {
        return 'This action adds a new address';
    }

    findAll() {
        return `This action returns all address`;
    }

    findOne(id: number) {
        return this.addressRepository.findOne(id);
        //return `This action returns a #${id} address`;
    }

    findByAddress(address: string) {
        return 'This action returns an address if it already exists.';
    }

    update(id: number, updateAddressDto: UpdateAddressDto) {
        return `This action updates a #${id} address`;
    }

    remove(id: number) {
        return `This action removes a #${id} address`;
    }

    findbyRestaurantId(id: number) {
        return this.restaurantRepository.findOne(id, {relations: ['address']});
    }
}
