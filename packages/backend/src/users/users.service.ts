import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UserRole } from './UserRole.enum';

export type User = any; // Remplacer par l'entité utilisateur Users

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      relations: ['restaurant'],
      where: {
        email,
      },
    });
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find({ relations: ['restaurant'] });
  }

  async registerRestaurantManager(userDetails: CreateUsersDto): Promise<Users> {
    const userEntity = this.hydrateUserEntity(userDetails);

    await Users.save(userEntity);
    return userEntity;
  }

  hydrateUserEntity(userDetails: CreateUsersDto): User {
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
