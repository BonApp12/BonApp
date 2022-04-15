import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Users} from './entities/users.entity';
import {DeleteResult, Repository} from 'typeorm';
import {CreateUsersDto} from './dto/create-users.dto';
import {UserRole} from './UserRole.enum';
import {UsersDto} from "./dto/users.dto";
import {MailerService} from "@nestjs-modules/mailer";
import {plainToClass} from "class-transformer";
import {UpdateUsersDto} from "./dto/update-users.dto";
import {UTILS} from "../app.utils";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        //TODO: intégrer le module de youcef quand il sera merger
        private readonly mailerService: MailerService
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

    async create(userData: CreateUsersDto): Promise<UsersDto> {
        if (userData.role === UserRole.RESTAURANT_SERVER
            || userData.role === UserRole.RESTAURANT_KITCHEN) {
            userData.password = UsersService.randomString(10);
            this.sendEmail(userData);
        }
        const newUser = this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return <UsersDto>newUser;
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

    async update(user: UpdateUsersDto) {
        //On hydrate le user avec les données du DTO car le beforeUpdate fonctionne seulement avec un objet de type User
        //TODO: Refactor newUser to User Entity
        const newUser = this.hydrateUserEntity(user);
        newUser.id = user.id;
        newUser.token = user?.token;
        return plainToClass(UsersDto,this.usersRepository.save(newUser));
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
    }

    delete(id: string): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }

    //TODO: Voir avec Yass pour la methode à prendre pour l'update
    // update(id: string, user: UsersDto): Promise<UsersDto> {
    //     return this.usersRepository.save({id, ...user});
    // }

    //TODO: intégrer la solution de youcef
    private sendEmail(userData) {
        this.mailerService
            .sendMail({
                to: userData.email, // list of receivers
                from: 'bonAPP@noreply.com', // sender address
                subject: 'Hop, bientot au boulot 😊 ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<h1>Bienvenu ' + userData.firstname + '</h1> ' +
                    '<p>Votre identifiant est: ' + userData.email + ' </p>' +
                    '<p>Votre mot de passe est: ' + userData.password + ' </p>' +
                    '<p>Penser à le changer</p>', // HTML body content
            });
    }

    private static randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+=-';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
