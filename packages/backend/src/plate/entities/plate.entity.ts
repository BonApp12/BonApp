import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Order} from "../../orders/entities/order.entity";
import {Ratings} from "../../ratings/entities/ratings.entity";
import {PlateRole} from "../PlateRole.enum";
import {Restaurant} from "../../restaurant/entities/restaurant.entity";
import {Ingredient} from "../../ingredients/entities/ingredient.entity";
import {PlateCategory} from "../../plate-category/entities/plate-category.entity";

@Entity()
export class Plate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.plates)
    restaurant: Restaurant;

    @Column('varchar', {length: 200})
    name: string;

    @Column('text')
    description: string;

    @Column('float')
    price: number;

    @Column({
        type: 'enum',
        enum: PlateRole,
    })
    type: PlateRole;

    @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.plates)
    ingredients: Ingredient[];

    @OneToMany(() => Order, (order: Order) => order.plate)
    orders: Order[];

    @OneToMany(() => PlateCategory, (category: PlateCategory) => category.plates)
    category: PlateCategory[];

    @OneToMany(() => Ratings, (rating: Ratings) => rating.plate)
    ratings: Ratings[];
}