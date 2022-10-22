import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Users} from '../../users/entities/users.entity';
import {Restaurant} from '../../restaurant/entities/restaurant.entity';
import {Tables} from "../../tables/entities/tables.entity";
import {OrderPlate} from "../../order-plate/entities/order-plate.entity";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 10, default: 'to-do'})
    status: string;

    @ManyToOne(() => Users, (user: Users) => user.orders, {nullable: true})
    user: Users;

    @Column('varchar', {length: 250, nullable: true})
    nickname: string;

    @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.orders, {onDelete: 'CASCADE'})
    restaurant: Restaurant;

    @OneToMany(() => OrderPlate, (orderPlate: OrderPlate) => orderPlate.order)
    orderPlates!: OrderPlate[];

    @ManyToOne(() => Tables, (table: Tables) => table.orders, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    table: Tables;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;
}
