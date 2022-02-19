// user.factory.ts
import Faker from 'faker'
import {define} from 'typeorm-seeding';
import {Restaurant} from '../../restaurant/entities/restaurant.entity';

define(Restaurant, (faker: typeof Faker) => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName();

    const restaurant = new Restaurant()
    restaurant.name = faker.company.companyName();
    restaurant.contact_firstname = `${firstName}`;
    restaurant.contact_lastname = `${lastName}`;
    restaurant.contact_email = (`${firstName}.${lastName}@gmail.com`).toLowerCase();
    restaurant.siren = faker.finance.account();
    restaurant.contact_phone = '0610203010';
    return restaurant
})


