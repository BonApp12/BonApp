import Faker from '@faker-js/faker'
import {define} from 'typeorm-seeding';
import {Ingredient} from "../../ingredients/entities/ingredient.entity";

define(Ingredient, (faker: typeof Faker) => {
    const ingredient = new Ingredient();
    ingredient.name = faker.random.word();
    return ingredient;
});


