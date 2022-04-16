import {PlateDto} from "../../plate/dto/plate.dto";

export class RestaurantDto {
  id: number;
  name: string;
  siren: string;
  address: number;
  contact_firstname: string;
  contact_lastname: string;
  contact_email: string;
  contact_phone: string;
  plates: PlateDto[];
}