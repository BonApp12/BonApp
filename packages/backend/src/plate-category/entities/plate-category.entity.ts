import { Plate } from 'src/plate/entities/plate.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class plateCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @ManyToOne(() => Plate, (plates:Plate) => plates.category)
  plates: Plate[];
}
