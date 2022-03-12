// user.factory.ts
import Faker from '@faker-js/faker'
import {define, factory} from 'typeorm-seeding';
import {Restaurant} from '../../restaurant/entities/restaurant.entity';
import {Address} from '../../address/entities/address.entity';
import {Plate} from "../../plate/entities/plate.entity";

define(Restaurant, (faker: typeof Faker) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const restaurant = new Restaurant();
    restaurant.name = faker.company.companyName();
    restaurant.contact_firstname = `${firstName}`;
    restaurant.contact_lastname = `${lastName}`;
    restaurant.contact_email = (`${firstName}.${lastName}@gmail.com`).toLowerCase();
    restaurant.siren = faker.finance.account();
    restaurant.contact_phone = faker.phone.phoneNumber('06########');
    restaurant.address = factory(Address)() as any;
    restaurant.plates = factory(Plate)().createMany(30) as any;
    return restaurant;
});


