// user.factory.ts
import {Users} from '../../users/entities/users.entity';
import Faker from '@faker-js/faker'
import {define, factory} from 'typeorm-seeding';
import {UserRole} from '../../users/UserRole.enum';
import {Restaurant} from '../../restaurant/entities/restaurant.entity';

define(Users, (faker: typeof Faker) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const user = new Users();
    user.firstname = `${firstName}`;
    user.lastname = `${lastName}`;
    user.email = (`${firstName}.${lastName}@gmail.com`).toLowerCase();
    user.password = '123';
    user.role = UserRole[Object.keys(UserRole)[Math.floor(Math.random() * Object.keys(UserRole).length)]];
    user.restaurant = factory(Restaurant)() as any;
    return user;
});


