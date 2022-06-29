import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OrderPlate} from "./entities/order-plate.entity";

@Injectable()
export class OrderPlateService {
  constructor(
      @InjectRepository(OrderPlate)
      private orderPlateRepository: Repository<OrderPlate>) {}

  findAll() {
    return this.orderPlateRepository.find({relations: ['order', 'plate']});
  }

  findOne(id: number) {
    return this.orderPlateRepository.findOne(id,{relations: ['order', 'plate']});
  }

  findByOrder(orderId: number) {
    return this.orderPlateRepository.find({
      relations: ['order', 'plate'],
      where: {
        order: orderId
      }
    });
  }
}
