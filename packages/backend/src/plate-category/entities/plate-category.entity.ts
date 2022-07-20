import {Plate} from '../../plate/entities/plate.entity';
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Restaurant} from "../../restaurant/entities/restaurant.entity";

@Entity()
export class PlateCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 100})
    name: string;

    @Column('varchar', {length: 100, default: 'lettuce.png'})
    icone: string;

    @ManyToMany(() => Plate, (plate: Plate) => plate.categories)
    @JoinTable()
    plates: Plate[];

    @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.categories, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    restaurant: Restaurant;
}
