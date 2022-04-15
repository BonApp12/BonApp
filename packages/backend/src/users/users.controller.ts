import {Body, Controller, Delete, Get, Param, Patch} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersDto} from "./dto/users.dto";
import {DeleteResult} from "typeorm";

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

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<DeleteResult> {
        return this.userService.delete(id);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() user: UsersDto): Promise<UsersDto> {
        return this.userService.update(id, user)
    }
}
