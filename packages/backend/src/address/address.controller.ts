import {Controller, Get, Param, UseGuards,} from '@nestjs/common';
import {AddressService} from './address.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.addressService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('restaurant/:id')
    findAddressRestaurant(@Param('id') id: string) {
        return this.addressService.findbyRestaurantId(id);
    }
}
