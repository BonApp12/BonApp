import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Plate } from "../../plate/entities/plate.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 10, default: 'to-do'})
  status: string;

  @ManyToOne(() => Users, (user:Users) => user.orders)
  user: Users;

  @ManyToOne(() => Restaurant, (restaurant:Restaurant) => restaurant.orders)
  restaurant: Restaurant;

  @ManyToOne(() => Plate, (plate:Plate) => plate.orders)
  plate: Plate;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
