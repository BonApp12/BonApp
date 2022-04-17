import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';

@Entity()
export class Ratings extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 200})
    notation: string;

    @Column('text')
    description: string;
}
