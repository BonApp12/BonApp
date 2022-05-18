import {AuthService} from "../../auth/auth.service";
import {Test} from "@nestjs/testing";
import {AuthController} from "../../auth/auth.controller";
import {HttpException, HttpStatus} from "@nestjs/common";
import {UsersService} from "../../users/users.service";
import {ConfigService} from "@nestjs/config";
import {Users} from "../../users/entities/users.entity";
import {UserRole} from "../../users/UserRole.enum";
import {JwtService} from "@nestjs/jwt";
import {MailService} from "../../mail/mail.service";
import {UsersDto} from "../../users/dto/users.dto";

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let mailService: MailService;
    const users = new Users();
    users.id = 1;
    users.firstname = "string";
    users.lastname = "string";
    users.email = "string@string.fr";
    users.password = "string";
    users.role = UserRole.CLIENT;
    users.restaurant = null;
    users.token = "bbbb";

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                ConfigService, AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findBy: jest.fn(),
                        updateUser: jest.fn(),
                        getByEmail: jest.fn(),
                        create: jest.fn()
                    }
                },
                {
                    provide: JwtService,
                    useValue: {}
                },
                {
                    provide: MailService,
                    useValue: {
                        sendMail: jest.fn()
                    }
                }
            ],
        }).compile();
        authService = moduleRef.get<AuthService>(AuthService);
        usersService = moduleRef.get<UsersService>(UsersService);
        mailService = moduleRef.get<MailService>(MailService);
    });

    describe('check token for access to route', () => {
        it('should call checkToken method with fake token', async () => {
            const token = "aaaa";
            jest.spyOn(usersService, 'findBy').mockImplementation((tokenArgs) => {
                return new Promise((_, reject) => {
                    if (tokenArgs.token !== users.token) {
                        reject(new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND));
                    }
                });
            });

            try {
                await authService.checkToken(token);
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
            }
        });
        it('should call checkToken return UsersDto', async () => {
            const token = "bbbb";
            jest.spyOn(usersService, 'findBy').mockImplementation((tokenArgs) => {
                return new Promise((resolve) => {
                    if (tokenArgs.token === users.token) {
                        resolve(users);
                    }
                });
            });

            const usersFind = await authService.checkToken(token);
            expect(usersFind).toBeInstanceOf(UsersDto);
        });
    });

    describe('change password', () => {
        it('should update password', async () => {
            const usersDto = <UsersDto>{
                password: "aaaa"
            }
            jest.spyOn(usersService, 'findBy').mockImplementation(() => new Promise((resolve) => resolve(users)));
            jest.spyOn(usersService, 'updateUser').mockImplementation(() => new Promise((resolve) => {
                users.password = usersDto.password;
                resolve(users);
            }));
            const usersUpdate = await authService.changePassword(usersDto, 'bbbb');
            expect(usersUpdate).toBeInstanceOf(Users);
        });

        it('should user not found by token', async () => {
            const usersDto = <UsersDto>{
                password: "aaaa"
            }
            const token = "aaaa";

            jest.spyOn(usersService, 'findBy').mockImplementation((tokenArgs) => {
                return new Promise((_, reject) => {
                    if (tokenArgs.token !== users.token) {
                        reject(new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND));
                    }
                });
            });

            await expect(authService.changePassword(usersDto, token)).rejects.toEqual(new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND));
        });
    });

    describe('forget password', () => {
        it('send mail to user forget password', async () => {
            const token = "zzzz";
            const usersDto = <UsersDto>{
                email: "string@string.fr"
            }

            jest.spyOn(usersService, "getByEmail").mockImplementation(() => new Promise((resolve) => resolve(users)));
            //Je passe en argument l'element que je vais passer en argument à ma fonction que j'appelle
            jest.spyOn(usersService, "updateUser").mockImplementation((tokenArgs) => new Promise((resolve) => {
                users.token = tokenArgs.token;
                resolve(users);
            }));
            //Ici je passe mon token et dans le spyOn je le récupère
            expect((await usersService.updateUser(<UsersDto>{token: token}, users)).token).toEqual("zzzz");
            jest.spyOn(mailService, "sendMail").mockImplementation(() => new Promise((resolve) => resolve(true)));
            expect(await authService.forgetPassword(usersDto)).toBe(true);
        });
        it('user not found by email', async() => {
            const usersDto = <UsersDto>{
                email: "youcef.jallali@gmail.com"
            }
            jest.spyOn(usersService, "getByEmail").mockImplementation(() => new Promise((_, reject) => {
                if (usersDto.email !== users.email) {
                    reject(new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND));
                }
            }));
            await expect(authService.forgetPassword(usersDto)).rejects.toEqual(new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND));
        });
    });

    describe('register user', () => {
        const usersDto = <UsersDto>({
            ...users
        });
        it('should have password to register user client', async() => {
            delete usersDto.password;
            await expect(authService.register(usersDto)).rejects.toEqual(new HttpException("Mot de passe requis", HttpStatus.UNPROCESSABLE_ENTITY));
        });
        it('should create user', async() => {
            usersDto.password = "ccccc";
            jest.spyOn(usersService,"create").mockImplementation((usersDtoArgs) => new Promise((resolve) => {
                const usersDtoPromise = new UsersDto();
                usersDtoPromise.id = usersDtoArgs.id;
                usersDtoPromise.firstname = usersDtoArgs.firstname;
                usersDtoPromise.lastname = usersDtoArgs.lastname;
                usersDtoPromise.email = usersDtoArgs.email;
                usersDtoPromise.role = usersDtoArgs.role;
                usersDtoPromise.restaurant = usersDtoArgs.restaurant;
                resolve(usersDtoPromise);
            }));
            await expect(await authService.register(usersDto)).toBeInstanceOf(UsersDto);
        })
        it('should have an error', async() => {
            jest.spyOn(usersService,"create").mockImplementation(() => new Promise((_,reject) => {
                reject(new HttpException('Une erreur est survenue',HttpStatus.BAD_REQUEST));
            }));
            await expect(authService.register(usersDto)).rejects.toEqual(new HttpException('Une erreur est survenue', HttpStatus.BAD_REQUEST));
        })
    })
});