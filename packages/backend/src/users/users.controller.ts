import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    /** Renvoyer une erreur, trop dangereux. */
    return this.userService.findAll();
  }

  @Get('/:firstname')
  findOneByFirstname(@Param('firstname') firstname: string) {
    /** Changer par l'id de l'utilisateur */
    return this.userService.findOne(firstname);
  }

  @Post('/register-restaurant-staff')
  async create(@Body() user: CreateUsersDto) {
    return this.userService.registerRestaurantManager(user);
  }
}
