import {Injectable} from '@nestjs/common';
import {RestaurantDto} from './dto/restaurant.dto';
import {UpdateRestaurantDto} from './dto/update-restaurant.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Restaurant} from './entities/restaurant.entity';
import {Repository} from 'typeorm';
import {Users} from "../users/entities/users.entity";
import {UsersDto} from "../users/dto/users.dto";
import {UserAdapter} from "../Adapter/UserAdapter";
import {RestaurantAdapter} from "../Adapter/RestaurantAdapter";
import {Tables} from "../tables/entities/tables.entity";

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Tables)
        private tableRepository: Repository<Tables>,
        // private addressService: AddressService,
    ) {
    }
    /**
     *
     * @param createRestaurantDto
     * @Deprecated
     */
    create(createRestaurantDto: RestaurantDto) {
        return 'This action adds a new restaurant';
    }

    async findAll(): Promise<RestaurantDto[]> {
        return (await this.restaurantRepository.find({relations: ['address', 'plates']}))
            .map(restaurant => RestaurantAdapter.toDto(restaurant));
    }

    async findOne(id: number): Promise<RestaurantDto> {
        return RestaurantAdapter.toDto(await this.restaurantRepository.findOne(id, {
            relations: ['address', 'plates', 'plates.ingredients'],
        }));
    }

    /**
     *
     * @param id
     * @param updateRestaurantDto
     * @Deprecated
     */
    async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
        //FIXME: à supprimer
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
    /**
     * @Deprecated
     * @param restaurant
     */
    async handleRegisterForm(restaurant: RestaurantDto) {
        return;
    }

    /**
     * @Deprecated
     * @param restaurant
     */
    async handleUpdateForm(restaurant: UpdateRestaurantDto) {
       return;
    }

    async findTeamMembers(id: number): Promise<UsersDto[]> {
        return (await this.userRepository.find({where: {restaurant: id}}))
            .map((teamMember: Users) => UserAdapter.toDto(teamMember))
    }

    addTable(table: Tables) {
        return this.tableRepository.save(table);

    }

    findAllTables(number: number) {
        return this.tableRepository.find({where: {restaurant: number}});
    }

    deleteTable(id: number) {
        return this.tableRepository.delete(id);
    }
}
