import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { UserRole } from '../UserRole.enum';
import { Exclude, instanceToPlain } from 'class-transformer';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 150 })
  firstname: string;

  @Column('varchar', { length: 150 })
  lastname: string;

  @Column('varchar', { length: 150, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.users)
  restaurant: Restaurant;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  toJson() {
    return instanceToPlain(this);
  }
}
