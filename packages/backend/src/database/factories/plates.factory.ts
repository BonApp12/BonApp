// user.factory.ts
import Faker from '@faker-js/faker'
import {define} from 'typeorm-seeding';
import {Plate} from "../../plate/entities/plate.entity";

define(Plate, (faker: typeof Faker) => {
    const plate = new Plate()
    plate.name = faker.random.word();
    plate.price = parseFloat(faker.commerce.price(1, 35, 2));
    return plate;
});


