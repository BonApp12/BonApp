import {Module} from '@nestjs/common';
import {AddressService} from './address.service';
import {AddressController} from './address.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Address} from './entities/address.entity';
import {Restaurant} from "../restaurant/entities/restaurant.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Address, Restaurant])],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService],
})
export class AddressModule {
}
