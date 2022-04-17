import {PartialType} from '@nestjs/mapped-types';
import {CreateRatingsDto} from './create-ratings.dto';

export class UpdateRatingsDto extends PartialType(CreateRatingsDto) {
    id: number;
}
