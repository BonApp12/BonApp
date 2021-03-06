import {Plate} from '../../plate/entities/plate.entity';
import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @ManyToOne(() => Plate, (plates) => plates.ingredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  plates: Plate[];
}
