// create-pets.seed.ts
import {Connection} from 'typeorm';
import {Factory, Seeder} from 'typeorm-seeding';
import {Restaurant} from '../../restaurant/entities/restaurant.entity';

export default class CreateRestaurant implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Restaurant)().createMany(30)
    }
}
