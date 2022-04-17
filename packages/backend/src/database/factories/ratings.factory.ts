import Faker from '@faker-js/faker'
import {define} from 'typeorm-seeding';
import {Ratings} from "src/ratings/entities/ratings.entity";

define(Ratings, (faker: typeof Faker) => {
    const ratings = new Ratings();
    ratings.notation = faker.random.number({min: 1, max: 5});
    ratings.description = faker.lorem.paragraphs(1);
    return ratings;
});
