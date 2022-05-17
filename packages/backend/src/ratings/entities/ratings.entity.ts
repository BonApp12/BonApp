import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Users} from 'src/users/entities/users.entity';
import {Plate} from "src/plate/entities/plate.entity";

@Entity()
export class Ratings extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    notation: number;

    @Column('text')
    description: string;

    @ManyToOne(() => Plate, (plate: Plate) => plate.ratings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    plate: Plate;

    @ManyToOne(() => Users, (user: Users) => user.ratings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: Users;
}