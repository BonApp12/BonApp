import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Restaurant} from 'src/restaurant/entities/restaurant.entity';
import {Ingredient} from 'src/ingredients/entities/ingredient.entity';
import {PlateCategory} from 'src/plate-category/entities/plate-category.entity';
import {Order} from "../../orders/entities/order.entity";
import {Ratings} from "../../ratings/entities/ratings.entity";
import {UserRole} from "../../users/UserRole.enum";
import {PlateRole} from "../PlateRole.enum";

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
    role: UserRole;

    @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.plates)
    ingredients: Ingredient[];

    @OneToMany(() => Order, (order: Order) => order.plate)
    orders: Order[];

    @OneToMany(() => PlateCategory, (category: PlateCategory) => category.plates)
    category: PlateCategory;

    @OneToMany(() => Ratings, (rating: Ratings) => rating.user)
    ratings: Ratings[];
}
