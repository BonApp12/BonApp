import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Restaurant} from 'src/restaurant/entities/restaurant.entity';
import {Ingredient} from 'src/ingredients/entities/ingredient.entity';
import {PlateCategory} from 'src/plate-category/entities/plate-category.entity';

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

    @OneToMany(() => Ingredient, (ingredient) => ingredient.plates)
    ingredients: Ingredient[];

    @ManyToOne(() => PlateCategory, (plateCategory) => plateCategory.name)
    category: PlateCategory;
}
