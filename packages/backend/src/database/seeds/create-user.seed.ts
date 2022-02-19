// create-pets.seed.ts
import {Connection} from 'typeorm';
import {Factory, Seeder} from 'typeorm-seeding';
import {Users} from '../../users/entities/users.entity';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Users)().createMany(10)
    }
}
