import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUsersDto} from './dto/create-users.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Get()
    findAll() {
        /** Renvoyer une erreur, trop dangereux. */
        return this.userService.findAll();
    }

    @Get('/:email')
    findOneByFirstname(@Param('email') email: string) {
        /** Changer par l'id de l'utilisateur */
        return this.userService.findOne(email);
    }

    @Post('/register-restaurant-staff')
    async create(@Body() user: CreateUsersDto) {
        return this.userService.registerRestaurantManager(user);
    }
}
