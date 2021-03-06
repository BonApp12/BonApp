import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Restaurant} from '../../restaurant/entities/restaurant.entity';
import {Exclude, instanceToPlain} from 'class-transformer';
import {Order} from '../../orders/entities/order.entity';
import * as bcrypt from 'bcryptjs';
import {Ratings} from "../../ratings/entities/ratings.entity";
import {UserRole} from "../UserRole.enum";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 150})
    firstname: string;

    @Column('varchar', {length: 150})
    lastname: string;

    @Column('varchar', {length: 150, unique: true})
    email: string;

    @Exclude({toPlainOnly: true})
    @Column('varchar', {length: 255, nullable: true})
    password?: string;

    @Column('varchar', {length: 150, unique: true, nullable: true})
    token?: string;

    @Column('varchar', {length: 150, unique: true, nullable: true})
    expoToken?: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CLIENT,
    })
    role: UserRole;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.users, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    restaurant: Restaurant;

    @OneToMany(() => Order, (order) => order.user, {
        onDelete: 'CASCADE',
    })
    orders: Order[];

    @OneToMany(() => Ratings, (rating: Ratings) => rating.user, {
        onDelete: 'CASCADE',
    })
    ratings: Ratings[];

    @BeforeUpdate()
    @BeforeInsert()
    async setPassword(password: string) {
        if (password || this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(password || this.password, salt);
        }
    }

    toJson() {
        return instanceToPlain(this);
    }
}
