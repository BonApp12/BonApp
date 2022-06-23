import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersDto} from "./dto/users.dto";
import {DeleteResult, UpdateResult} from "typeorm";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {SETTINGS} from "../app.utils";
import RequestWithUser from "../auth/interfaces/requestWithUser.interface";

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

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Param('id') id: string): Promise<DeleteResult> {
        return this.userService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    updateUserRestaurant(@Param('id') id: string, @Body() user: UsersDto): Promise<UsersDto> {
        return this.userService.update(user);
    }

    // @UseGuards(JwtAuthGuard)
    @Patch('/update-expoToken/:id')
    setExpoToken(@Param('id') id: string, @Body('expoToken') expoToken: string): Promise<UpdateResult> {
        return this.userService.setExpoToken(id, expoToken);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    async update(@Body(SETTINGS.VALIDATION_PIPE_USER) usersDto: UsersDto, @Req() req: RequestWithUser) {
        return this.userService.updateUser(usersDto, req.user);
    }
}
