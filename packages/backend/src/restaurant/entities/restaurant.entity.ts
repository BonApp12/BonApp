import { Address } from 'src/address/entities/address.entity';
import { Plate } from 'src/plate/entities/plate.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('char', { length: 13 })
  siren: string;

  @ManyToOne(() => Address, (address) => address.restaurant)
  address: number;

  @OneToMany(() => Plate, (plate) => plate.restaurant)
  plates: Plate[];
}
