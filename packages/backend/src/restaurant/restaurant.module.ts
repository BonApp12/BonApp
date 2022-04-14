import {Module} from '@nestjs/common';
import {RestaurantService} from './restaurant.service';
import {RestaurantController} from './restaurant.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Restaurant} from './entities/restaurant.entity';
import {AddressModule} from '../address/address.module';
import {Users} from "../users/entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant, Users]), AddressModule],
    controllers: [RestaurantController],
    providers: [RestaurantService],
})
export class RestaurantModule {
}
