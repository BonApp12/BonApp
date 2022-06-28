import { Injectable } from '@nestjs/common';
import { CreateOrderPlateDto } from './dto/create-order-plate.dto';
import { UpdateOrderPlateDto } from './dto/update-order-plate.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OrderPlate} from "./entities/order-plate.entity";

@Injectable()
export class OrderPlateService {
  constructor(
      @InjectRepository(OrderPlate)
      private orderPlateRepository: Repository<OrderPlate>) {}

  create(createOrderPlateDto: CreateOrderPlateDto) {
    return 'This action adds a new orderPlate';
  }

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

  update(id: number, updateOrderPlateDto: UpdateOrderPlateDto) {
    return `This action updates a #${id} orderPlate`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderPlate`;
  }
}
