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
                    }
                },
                {
                    provide: JwtService,
                    useValue: {}
                },
                {
                    provide: MailService,
                    useValue: {}
                }
            ],
        }).compile();
        authService = moduleRef.get<AuthService>(AuthService);
        usersService = moduleRef.get<UsersService>(UsersService);
    });

    describe('check token for access to route', () => {
        it('should call checkToken method with fake token', async() => {
            const token = "aaaa";
            jest.spyOn(usersService, 'findBy').mockImplementation((tokenArgs) => {
                return new Promise((_, reject) => {
                    if (tokenArgs.token !== users.token) {
                        reject(new HttpException('User with this params does not exist !', HttpStatus.NOT_FOUND));
                    }
                });
            });

            try{
                await authService.checkToken(token);
            }catch(e){
                expect(e).toBeInstanceOf(HttpException);
            }
        });
        it('should call checkToken return UsersDto', async() => {
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
    })
});