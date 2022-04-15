import {PartialType} from '@nestjs/mapped-types';
import {RestaurantDto} from './restaurant.dto';

export class UpdateRestaurantDto extends PartialType(RestaurantDto) {}
