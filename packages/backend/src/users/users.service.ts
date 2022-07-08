import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Users} from './entities/users.entity';
import {DeleteResult, Repository} from 'typeorm';
import {UserRole} from './UserRole.enum';
import {UsersDto} from "./dto/users.dto";
import {ConfigService} from '@nestjs/config';
import {UTILS} from "../app.utils";
import {UserAdapter} from "../Adapter/UserAdapter";
import {generate} from "generate-password";
import fetch from "node-fetch";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private configService: ConfigService,
    ) {
    }

    async findOne(email: string): Promise<Users> {
        const user = await this.usersRepository.findOne({relations: ['restaurant'], where: {email}});
        if (user) return user;
        throw new HttpException('User with this email does not exist !', HttpStatus.NOT_FOUND);
    }

    async findBy(...args): Promise<Users> {
        const user = await this.usersRepository.findOne(...args);
        if (user) return user;
        throw new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND);
    }

    /**
     * Contient des paramètres (champs de l'entité) pour filtrer les utilisateurs
     * @param args
     */
    async findMultipleBy(...args): Promise<Users[]> {
        const user = await this.usersRepository.find(...args);
        if (user) return user;
        throw new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND);
    }

    async findAll(): Promise<Users[]> {
        return this.usersRepository.find({relations: ['restaurant'], where: {role: UserRole.RESTAURANT_MANAGER}, order: {id: 'DESC'}});
    }

    async create(userData: UsersDto): Promise<UsersDto> {
        try {
            if (userData.role === UserRole.RESTAURANT_SERVER || userData.role === UserRole.RESTAURANT_KITCHEN) {
                userData.password = generate({
                    length: 12,
                    numbers: true,
                    uppercase: true,
                    symbols: '#?!@$%^&*-.'
                });

                const restaurant = await this.usersRepository.findOne({
                    relations: ['restaurant'],
                    where: {
                        restaurant: userData.restaurant,
                    }
                });

                const options =  {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'api-key': this.configService.get('SENDINBLUE_API_KEY'),
                    },
                    body: JSON.stringify({
                        sender: {email: this.configService.get('MAIL_FROM')},
                        to: [{email: userData.email}],
                        replyTo: {email: this.configService.get('MAIL_USER')},
                        params: {
                            role: userData.role === 'R_SERVER' ? 'serveur' : 'cuisinier',
                            password: userData.password,
                            email: userData.email,
                            restaurant: restaurant.restaurant.name,
                        },
                        templateId: 3
                    })
                };
                await fetch(this.configService.get('SENDINBLUE_URL_API'), options);
            }
            const newUser = this.usersRepository.create(userData);
            await this.usersRepository.save(newUser);
            return UserAdapter.toDto(newUser);
        } catch (e) {
            throw new HttpException(e.message, e.status);
        }
    }

    async createRestaurant(userDto: UsersDto) {
        const password = generate({
            length: 12,
            numbers: true,
            uppercase: true,
            symbols: '#?!@$%^&*-.'
        });
        userDto.password = password;
        userDto.role = UserRole.RESTAURANT_MANAGER;
        try {
            const newUser = this.usersRepository.create(userDto);
            await this.usersRepository.save(newUser);
            const userAdapterDto = UserAdapter.toDto(newUser);
            userAdapterDto.password = password;
            return userAdapterDto;
        }catch(e){
            throw new HttpException("L'adresse email existe déjà", HttpStatus.BAD_REQUEST);
        }
    }

    //Update attribute of a user set in UpdateUserDto
    async updateUser(usersDto: UsersDto, user, withoutOldPassword = false) {
        const newUser = {
            ...user,
            ...usersDto,
        };

        if (usersDto?.oldPassword?.trim().length && !withoutOldPassword) {
            const checkPassword = await UTILS.verifyPassword(newUser.oldPassword, user.password);
            if (!checkPassword) {
                throw new HttpException(
                    "Le mot de passe ne correspond pas à l'ancien",
                    HttpStatus.BAD_REQUEST,
                );
            }
            delete newUser.oldPassword;
        } else if (!withoutOldPassword) {
            delete newUser.password;
        } else {
            newUser.token = null;
        }
        return this.update(newUser);
    }

    async update(user: UsersDto) {
        return this.usersRepository.save(UserAdapter.toModel(user));
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

    delete(id: string): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }

    setExpoToken(id: string, expoToken: string) {
        return this.usersRepository.update(id, {expoToken});
    }
}
