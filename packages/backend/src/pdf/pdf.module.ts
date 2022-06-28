import {Global, Module} from '@nestjs/common';
import {PdfService} from "./pdf.service";
import { PdfController } from './pdf.controller';
import {OrdersModule} from "../orders/orders.module";
import {OrdersService} from "../orders/orders.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "../orders/entities/order.entity";
import {HttpModule} from "@nestjs/axios";
import {OrderPlateService} from "../order-plate/order-plate.service";
import {OrderPlate} from "../order-plate/entities/order-plate.entity";

@Global()
@Module({
    imports: [
        OrdersModule,
        TypeOrmModule.forFeature([Order]),
        TypeOrmModule.forFeature([OrderPlate]),
        HttpModule
    ],
    providers: [PdfService, OrdersService, OrderPlateService],
    exports: [PdfService],
    controllers: [PdfController],
})
export class PdfModule {}