// user.factory.ts
import Faker from '@faker-js/faker'
import {define, factory} from 'typeorm-seeding';
import {Plate} from "../../plate/entities/plate.entity";
import {Ingredient} from "../../ingredients/entities/ingredient.entity";

define(Plate, (faker: typeof Faker) => {
    const plate = new Plate();
    plate.name = faker.random.word();
    plate.price = parseFloat(faker.commerce.price(1, 35, 2));
    plate.description = "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>" +
        "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>" +
        "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>";
    plate.ingredients = factory(Ingredient)().createMany(8) as any;
    return plate;
});


