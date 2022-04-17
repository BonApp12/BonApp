import Faker from '@faker-js/faker'
import {define, factory} from 'typeorm-seeding';
import {Plate} from "../../plate/entities/plate.entity";
import {Ingredient} from "../../ingredients/entities/ingredient.entity";
import {PlateRole} from "../../plate/PlateRole.enum";

define(Plate, (faker: typeof Faker) => {
    const plate = new Plate();
    plate.name = faker.random.word();
    plate.price = parseFloat(faker.commerce.price(1, 35, 2));
    plate.type = PlateRole[Object.keys(PlateRole)[Math.floor(Math.random() * Object.keys(PlateRole).length)]];
    plate.description = "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>" +
        "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>" +
        "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>";
    plate.ingredients = factory(Ingredient)().createMany(8) as any;
    return plate;
});
