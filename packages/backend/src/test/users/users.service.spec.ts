import {Test} from '@nestjs/testing';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Users} from "../../users/entities/users.entity";
import {UsersController} from "../../users/users.controller";
import {UsersService} from "../../users/users.service";
import {UserRole} from "../../users/UserRole.enum";
import {HttpException, HttpStatus} from "@nestjs/common";


describe('usersService', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let usersRepository: Repository<Users>;
    const USER_REPOSITORY_TOKEN = getRepositoryToken(Users);
    let users = new Users();
    users.id = 1;
    users.firstname = "pipi";
    users.lastname = "string";
    users.password = "string";
    users.role = UserRole.CLIENT;
    users.restaurant = null;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, {
                provide: USER_REPOSITORY_TOKEN,
                useValue: {
                    find: jest.fn(),
                    findAll: jest.fn(),
                    findOne: jest.fn(),
                    create: jest.fn(),
                    update: jest.fn(),
                    delete: jest.fn(),
                },
            }],
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
        usersRepository = moduleRef.get<Repository<Users>>(USER_REPOSITORY_TOKEN);
    });


    it('userRepository should be defined', () => {
        expect(usersRepository).toBeDefined();
    });


    describe("findAll", () => {
        it('should return all Restaurants with address and plates or an error', async () => {
            await usersService.findAll();
            expect(usersRepository.find).toHaveBeenCalledWith({relations: ['restaurant']});
        });
        it('should return an array of Restaurants', async () => {
            // On mock le repository pour qu'il retourne un tableau de restaurants
            jest.spyOn(usersRepository, 'find').mockImplementation(() => {
                return new Promise((resolve) => {
                    let users = new Users();
                    users.id = 1;
                    users.firstname = "string";
                    users.lastname = "string";
                    users.email = "string";
                    users.password = "string";
                    users.role = UserRole.CLIENT;
                    users.restaurant = null;
                    resolve([users]);

                    resolve(new Array<Users>(users));
                });
            });
            const restaurants = await usersService.findAll();
            expect(restaurants[0].id).toEqual(1);
            expect(restaurants).toBeInstanceOf(Array);
        });
    });


    it('should return a user', async () => {
        const email = "yassine.bousaidi@gmail.com";
        jest.spyOn(usersRepository, 'findOne').mockImplementation((emailArg: any) => {
            return new Promise((resolve, reject) => {
                users.email = emailArg.where.email;
                if (email === users.email) {
                    resolve(users);
                }
                reject("The email seems to be wrong");
            });
        });

        const userReturn = await usersService.findOne(email);
        expect(usersRepository.findOne).toHaveBeenCalledWith({
            relations: ['restaurant'],
            where: {email}
        });
        expect(userReturn.id).toEqual(1);
    });


    it('should throw an error', async () => {
        const email = "yassine.bousaidi@gmail.com";
        const fakeEmail = "fake." + email;
        await expect(usersService.findOne(fakeEmail)).rejects.toEqual(new HttpException(
            'User with this email does not exist !',
            HttpStatus.NOT_FOUND,
        ));
    });
    // Test restant dans le Report coverage

});
