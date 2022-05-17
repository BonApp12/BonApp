import {PartialType} from '@nestjs/mapped-types';
import {RatingsDto} from "./ratings.dto";

export class UpdateRatingsDto extends PartialType(RatingsDto) {
}