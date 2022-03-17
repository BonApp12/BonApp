import {BaseEntity, Column, Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { PlateCategory } from '../../plate-category/entities/plate-category.entity';
import {Order} from "../../orders/entities/order.entity";
@Entity()
export class Plate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Restaurant, (Restaurant) => Restaurant.plates)
  restaurant: Restaurant;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('float')
  price: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.plates)
  ingredient: Ingredient[];

  @ManyToOne(() => PlateCategory, (PlateCategory) => PlateCategory.name)
  category: PlateCategory;

  @OneToMany(() => Order, (order) => order.plate)
  orders: Order[];
}
