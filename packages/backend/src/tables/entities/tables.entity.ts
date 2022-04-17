import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Order} from "../../orders/entities/order.entity";
import {Restaurant} from "../../restaurant/entities/restaurant.entity";

@Entity()
export class Tables extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 10})
    libelle: string;

    @ManyToOne(() => Order, (order: Order) => order.table)
    order: Order;

    @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.table)
    restaurant: Restaurant;
    table: any;
}
