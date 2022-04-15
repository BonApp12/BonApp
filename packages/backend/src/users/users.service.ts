import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Users} from './entities/users.entity';
import {DeleteResult, Repository} from 'typeorm';
import {CreateUsersDto} from './dto/create-users.dto';
import {UserRole} from './UserRole.enum';
import {UsersDto} from "./dto/users.dto";
import {MailerService} from "@nestjs-modules/mailer";

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

    async findAll(): Promise<Users[]> {
        return this.usersRepository.find({relations: ['restaurant']});
    }

    async registerRestaurantManager(userDetails: CreateUsersDto): Promise<Users> {
        const userEntity = this.hydrateUserEntity(userDetails);

        await Users.save(userEntity);
        return userEntity;
    }

    async create(userData: CreateUsersDto) {
        if (userData.role === UserRole.RESTAURANT_SERVER || userData.role === UserRole.RESTAURANT_KITCHEN) {
            //TODO: On génére un mdp par défaut Penser à forcer le changement de mot passe et l'envoie de mail
            userData.password = UsersService.randomString(10);
            this.sendEmail(userData);
        }
        const newUser = this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }

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

    // TODO: Créer un adapter qui renverra l'userDTO sans le champs password
    hydrateUserEntity(userDetails: CreateUsersDto): Users {
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

    update(id: string, user: UsersDto): Promise<UsersDto> {
        return this.usersRepository.save({id, ...user});
    }

    //TODO: intégrer la solution de youcef
    private sendEmail(userData) {
        this.mailerService
            .sendMail({
                to: userData.email, // list of receivers
                from: 'bonAPP@noreply.com', // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
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
