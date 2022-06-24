import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import {AddressService} from './address.service';
import {CreateAddressDto} from './dto/create-address.dto';
import {UpdateAddressDto} from './dto/update-address.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('restaurant/:id')
  findAddressRestaurant(@Param('id') id: string) {
    return this.addressService.findbyRestaurantId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
