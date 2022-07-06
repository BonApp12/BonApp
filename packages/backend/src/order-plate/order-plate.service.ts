import {Injectable} from '@nestjs/common';
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

    async findBestPlate(restaurantId: string, manyPlate = false) {
        const query = this.orderPlateRepository.createQueryBuilder("op")
            .select("p.name", "plateName")
            .addSelect("SUM(op.quantity)", "count")
            .innerJoin("op.order", "o")
            .innerJoin("o.restaurant", "r")
            .innerJoin("op.plate", "p")
            .where("r.id = :restaurant", {restaurant: restaurantId})
            .groupBy("p.name")
            .orderBy("count", "DESC");
        if (manyPlate) {
            return await query.getRawMany();
        }
        return await query.getRawOne();
    }

    findOne(id: number) {
        return this.orderPlateRepository.findOne(id, {relations: ['order', 'plate']});
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
