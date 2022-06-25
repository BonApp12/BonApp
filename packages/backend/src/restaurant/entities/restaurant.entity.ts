import {Address} from '../../address/entities/address.entity';
import {Plate} from '../../plate/entities/plate.entity';
import {Users} from '../../users/entities/users.entity';
import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Order} from "../../orders/entities/order.entity";
import {Tables} from "../../tables/entities/tables.entity";

@Entity()
export class Restaurant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 100})
    name: string;

    @Column('char', {length: 13})
    siren: string;

    /* Spécifique au formulaire de contact, pas systématique donc nullable. */
    @Column('varchar', {length: 150, nullable: true})
    contact_firstname: string;

    @Column('varchar', {length: 150, nullable: true})
    contact_lastname: string;

    @Column('varchar', {length: 255, nullable: true})
    contact_email: string;

    @Column('char', {length: 10, nullable: true})
    contact_phone: string;

    @ManyToOne(() => Address, (address: Address) => address.restaurant, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    address: number;

    @OneToMany(() => Plate, (plate: Plate) => plate.restaurant, {onDelete: 'CASCADE'})
    plates: Plate[];

    @OneToMany(() => Users, (user: Users) => user.restaurant, {onDelete: 'CASCADE'})
    users: Users[];

    @OneToMany(() => Order, (order: Order) => order.restaurant, {onDelete: 'CASCADE'})
    orders: Order[];

    @OneToMany(() => Tables, (table: Tables) => table.restaurant, {onDelete: 'CASCADE'})
    tables: Tables[];
}
