// user.factory.ts
import Faker from 'faker'
import {define} from 'typeorm-seeding';
import {Address} from '../../address/entities/address.entity';

define(Address, (faker: typeof Faker) => {
    const address = new Address();
    address.address = faker.address.streetAddress();
    address.city = faker.address.city();
    address.postal_code = faker.address.zipCode('#####');
    return address;
});


