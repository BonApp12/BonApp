// user.factory.ts
import Faker from '@faker-js/faker'
import {define, factory} from 'typeorm-seeding';
import {Restaurant} from '../../restaurant/entities/restaurant.entity';
import {Plate} from "../../plate/entities/plate.entity";

define(Plate, (faker: typeof Faker) => {
    // const firstName = faker.name.firstName();
    // const lastName = faker.name.lastName();
    //
    // const restaurant = new Restaurant();
    // restaurant.name = faker.company.companyName();
    // restaurant.contact_firstname = `${firstName}`;
    // restaurant.contact_lastname = `${lastName}`;
    // restaurant.contact_email = (`${firstName}.${lastName}@gmail.com`).toLowerCase();
    // restaurant.siren = faker.finance.account();
    // restaurant.contact_phone = faker.phone.phoneNumber('06########');
    // restaurant.address = factory(Address)() as any;
    // return restaurant;
    const plate = new Plate()
    plate.name = faker.random.word();
    return plate;
});


