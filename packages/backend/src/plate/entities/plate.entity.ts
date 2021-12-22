import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { PlateCategory } from 'src/plate-category/entities/plate-category.entity';
@Entity()
export class Plate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Restaurant, (Restaurant) => Restaurant.plates)
  restaurant: Restaurant;

  @Column('varchar', { length: 200 })
  name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.plates)
  ingredient: Ingredient[];

  @ManyToOne(() => PlateCategory, (PlateCategory) => PlateCategory.name)
  category: PlateCategory;
}
