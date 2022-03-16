import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    /* Récupération de toutes les commandes avec les relations User et Restaurant */
    return this.orderRepository.find({ relations: ['user', 'restaurant'] });
  }

  findOne(id: number) {
    // TODO : Remplacer ce findOne spécifiquement pour ne récupérer que les informations pertinentes. Pour l'instant, il renvoie même le mot de passe de l'utilisateur lié.
    return this.orderRepository.findOne(id, {
      relations: ['user', 'restaurant'],
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
