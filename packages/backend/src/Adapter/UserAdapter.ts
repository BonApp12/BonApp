import {Injectable} from '@nestjs/common';
import {Users} from "../users/entities/users.entity";
import {UsersDto} from "../users/dto/users.dto";

@Injectable()
export class UserAdapter {


    static toDto(user: Users): UsersDto {
        const UserDto = new UsersDto();
        UserDto.id = user.id;
        UserDto.firstname = user.firstname;
        UserDto.lastname = user.lastname;
        UserDto.email = user.email;
        UserDto.role = user.role;
        UserDto.restaurant = user.restaurant;
        return UserDto;
    }

    static toDtoUpdatePassword(user: Users): UsersDto {
        const UserDto = new UsersDto();
        UserDto.id = user.id;
        UserDto.firstname = user.firstname;
        UserDto.lastname = user.lastname;
        UserDto.email = user.email;
        UserDto.password = user.password;
        UserDto.token = user.token;
        UserDto.role = user.role;
        return UserDto;
    }

    static toModel(user: UsersDto): Users {
        const users = new Users();
        users.id = user.id;
        users.firstname = user.firstname;
        users.lastname = user.lastname;
        users.email = user.email;
        users.password = user.password;
        users.role = user.role;
        users.token = user.token;
        users.restaurant = user.restaurant;
        return users;
    }
}
