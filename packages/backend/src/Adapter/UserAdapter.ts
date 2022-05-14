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
}
