import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Users} from './entities/users.entity';
import {DeleteResult, Repository} from 'typeorm';
import {CreateUsersDto} from './dto/create-users.dto';
import {UserRole} from './UserRole.enum';
import {UsersDto} from "./dto/users.dto";
import {MailService} from "../mail/mail.service";
import {UpdateUsersDto} from "./dto/update-users.dto";
import {UTILS} from "../app.utils";
import {UserAdapter} from "../Adapter/UserAdapter";
import {generate} from "generate-password";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        //TODO: intégrer le module de youcef quand il sera merger
        private readonly mailerService: MailService
    ) {
    }

    async findOne(email: string): Promise<Users> {
        const user = await this.usersRepository.findOne({relations: ['restaurant'], where: {email}});

        // TODO: Créer un adapter qui renverra l'userDTO sans le champs password
        if (user) return user;
        throw new HttpException('User with this email does not exist !', HttpStatus.NOT_FOUND);
    }

    async findBy(...args): Promise<Users> {
        const user = await this.usersRepository.findOne(...args);
        if (user) return user;
        throw new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND);
    }

    async findAll(): Promise<Users[]> {
        return this.usersRepository.find({relations: ['restaurant']});
    }

    async create(userData: UsersDto): Promise<UsersDto> {
        try {
            if (userData.role === UserRole.RESTAURANT_SERVER
                || userData.role === UserRole.RESTAURANT_KITCHEN) {
                userData.password = generate({
                    length: 12,
                    numbers: true,
                    uppercase: true,
                    symbols: '#?!@$%^&*-.'
                });
                await this.mailerService.sendMail(userData.email, 'create_user', 'Hop, bientot au boulot 😊 ✔', {
                    ...userData
                });
            }
            const newUser = this.usersRepository.create(userData);
            await this.usersRepository.save(newUser);
            return <UsersDto>newUser;
        }catch (e) {
            throw new HttpException(e.message, e.status);
        }
    }

    //Update attribute of a user set in UpdateUserDto
    async updateUser(updateDto: UpdateUsersDto, user, withoutOldPassword = false) {
        const newUser = {
            ...user,
            ...updateDto,
        };

        if(updateDto?.oldPassword?.trim().length && !withoutOldPassword){
            const checkPassword = await UTILS.verifyPassword(newUser.oldPassword, user.password);
            if(!checkPassword){
                throw new HttpException(
                    'Wrong credentials provided (password <- dont forget to remove this after)',
                    HttpStatus.BAD_REQUEST,
                );
            }
            delete newUser.oldPassword;
        }else if(!withoutOldPassword){
            delete newUser.password;
        }else {
            newUser.token = null;
        }
        return this.update(newUser);
    }

    async update(user: UsersDto) {
        return this.usersRepository.save(UserAdapter.toModelDto(user));
    }

    //TODO : DELETE DUPLICATE LINE 20
    async getByEmail(email: string): Promise<Users | undefined> {
        const user = this.usersRepository.findOne({
            relations: ['restaurant'],
            where: {
                email,
            },
        });
        if (user) {
            return user;
        }
        throw new HttpException(
            'User with this email does not exist',
            HttpStatus.NOT_FOUND,
        );
    }

    async getById(id: number): Promise<Users | undefined> {
        const user = await this.usersRepository.findOne({id});
        if (user) {
            return user;
        }
        throw new HttpException(
            'User with this id does not exist',
            HttpStatus.NOT_FOUND,
        );
    }

    hydrateUserEntity(userDetails: CreateUsersDto|UsersDto|UpdateUsersDto): Users {
        // Cette fonction doit permettre d'hydrater un objet User
        // Faire en sorte qu'elle soit la plus mainstream possible, éventuellement préciser les champs obligatoires.
        const userEntity: Users = Users.create();
        userEntity.firstname = userDetails.firstname;
        userEntity.lastname = userDetails.lastname;
        userEntity.email = userDetails.email;
        userEntity.password = userDetails.password;
        userEntity.role = UserRole[userDetails.role as keyof typeof UserRole];
        return userEntity;
    }

    delete(id: string): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }
}
