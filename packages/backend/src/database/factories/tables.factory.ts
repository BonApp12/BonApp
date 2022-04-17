import Faker from '@faker-js/faker'
import {define} from 'typeorm-seeding';
import {Tables} from "src/tables/entities/tables.entity";

define(Tables, (faker: typeof Faker) => {
    const table = new Tables();
    table.libelle = faker.word.adverb();
    return table;
});


