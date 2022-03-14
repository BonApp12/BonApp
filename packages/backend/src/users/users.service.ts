import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UserRole } from './UserRole.enum';

@Injectable()
export class UsersService {
  private User = Users;
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async findOne(email: string): Promise<Users | undefined> {
    // TODO : Faire en sorte de ne pas récupérer de restaurant lié?
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

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find({ relations: ['restaurant'] });
  }

  async registerRestaurantManager(userDetails: CreateUsersDto): Promise<Users> {
    const userEntity = this.hydrateUserEntity(userDetails);

    await Users.save(userEntity);
    return userEntity;
  }

  async create(userData: CreateUsersDto) {
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
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

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
}
