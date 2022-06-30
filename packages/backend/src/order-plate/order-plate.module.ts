import { Module } from '@nestjs/common';
import { OrderPlateService } from './order-plate.service';
import { OrderPlateController } from './order-plate.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderPlate} from "./entities/order-plate.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderPlate])],
  controllers: [OrderPlateController],
  exports: [OrderPlateService],
  providers: [OrderPlateService]
})
export class OrderPlateModule {}
