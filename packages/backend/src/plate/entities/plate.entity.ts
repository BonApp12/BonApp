import {BaseEntity, Column, Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { plateCategory } from '../../plate-category/entities/plate-category.entity';
import {Order} from "../../orders/entities/order.entity";

@Entity()
export class Plate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Restaurant, (Restaurant:Restaurant) => Restaurant.plates)
  restaurant: Restaurant;

  @Column('varchar', {length: 200})
  name: string;

  @Column('float')
  price: number;

  @OneToMany(() => Ingredient, (ingredient:Ingredient) => ingredient.plates)

  @ManyToOne(() => plateCategory, (plateCategory:plateCategory) => plateCategory.name)
  category: plateCategory;

  @OneToMany(() => Order, (order:Order) => order.plate)
  orders: Order[];
}
