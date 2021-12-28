import { Address } from 'src/address/entities/address.entity';
import { Plate } from 'src/plate/entities/plate.entity';
import { Users } from '../../users/entities/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('char', { length: 13 })
  siren: string;

  /* Spécifique au formulaire de contact, pas systématique donc nullable. */
  @Column('varchar', { length: 150, nullable: true })
  contact_firstname: string;

  @Column('varchar', { length: 150, nullable: true })
  contact_lastname: string;

  @Column('varchar', { length: 255, nullable: true })
  contact_email: string;

  @Column('char', { length: 10, nullable: true })
  contact_phone: string;

  @ManyToOne(() => Address, (address) => address.restaurant)
  address: number;

  @OneToMany(() => Plate, (plate) => plate.restaurant)
  plates: Plate[];

  @OneToMany(() => Users, (user) => user.restaurant)
  users: Users[];
}
