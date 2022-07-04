import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {Order} from "../../orders/entities/order.entity";
import {Plate} from "../../plate/entities/plate.entity";
import {PlateDto} from "../../plate/dto/plate.dto";

@Entity("order_plate")
export class OrderPlate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(() => Order, order => order.orderPlates)
    @JoinColumn({name: "order_id"})
    order: Order;

    @JoinColumn({name: "plate_id"})
    @ManyToOne(() => Plate, plate => plate.orderPlates)
    plate: Plate | PlateDto;
}
