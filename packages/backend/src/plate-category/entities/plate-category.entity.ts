import {Plate} from '../../plate/entities/plate.entity';
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,} from 'typeorm';

@Entity()
export class PlateCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 100})
    name: string;

    @ManyToMany(() => Plate, (plate: Plate) => plate.categories)
    @JoinTable()
    plates: Plate[];
}
