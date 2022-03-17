import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { CreateDateColumn,UpdateDateColumn } from "typeorm";
import {Plate} from "../../plate/entities/plate.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 10, default: 'to-do'})
  status: string;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;

  @ManyToOne(() => Plate, (plate) => plate.orders)
  plate: Plate;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
