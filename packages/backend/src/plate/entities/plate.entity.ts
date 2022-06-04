import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
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

    @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.plates, {nullable: true, cascade: true})
    restaurant: Restaurant;

    @Column('varchar', {length: 200})
    name: string;

    @Column('varchar', {length: 200, nullable: true})
    photo: string;

    @Column('text')
    description: string;

    @Column('float')
    price: number;

    @Column({
        type: 'enum',
        enum: PlateRole,
    })
    type: PlateRole;

    @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.plates, {nullable: true, cascade: true})
    ingredients: Ingredient[];

    @OneToMany(() => Order, (order: Order) => order.plate, {nullable: true, cascade: true})
    orders: Order[];

    @ManyToMany(() => PlateCategory,
        (category: PlateCategory) => category.plates,
        {nullable: true, cascade: true, onDelete: 'CASCADE'})
    categories: PlateCategory[];

    @OneToMany(() => Ratings, (rating: Ratings) => rating.plate)
    ratings: Ratings[];
}

