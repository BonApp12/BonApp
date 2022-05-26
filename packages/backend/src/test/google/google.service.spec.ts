import {Test} from "@nestjs/testing";
import {GoogleController} from "../../google/google.controller";
import {GoogleService} from "../../google/google.service";
import {Users} from "../../users/entities/users.entity";
import {UserRole} from "../../users/UserRole.enum";
import {UsersService} from "../../users/users.service";
import {ConfigService} from "@nestjs/config";
import {AuthService} from "../../auth/auth.service";
import {UserAdapter} from "../../Adapter/UserAdapter";

jest.mock('googleapis', () => {
    return {
        google: {
            auth: {
                // this is how to mock a constructor
                OAuth2: jest.fn().mockImplementation(() => {
                    return {
                        getTokenInfo: jest.fn().mockResolvedValue({
                            email: testEmail
                        }),
                        setCredentials: jest.fn().mockResolvedValue(undefined)
                    }
                }),
            },
            oauth2: jest.fn().mockImplementation(() => {
                return {
                    userinfo: {
                        get: jest.fn().mockResolvedValue({
                            data: {
                                given_name: "youyou",
                                family_name: "yayaaa"
                            }
                        })
                    }
                }
            })
        }
    }
});

const testEmail = 'youcef.jallali@gmail.com';

describe("google", () => {
    let googleService: GoogleService;
    let usersService: UsersService;

    const user = new Users();
    user.firstname = "Youcef";
    user.lastname = "Jal";
    user.email = testEmail;
    user.role = UserRole.CLIENT;
    user.restaurant = null;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [GoogleController],
            providers: [
                GoogleService, ConfigService,
                {
                    provide: UsersService,
                    useValue: {
                        getByEmail: jest.fn(),
                        create: jest.fn()
                    }
                },
                {
                    provide: AuthService,
                    useValue: {}
                }
            ],
        }).compile();

        googleService = moduleRef.get<GoogleService>(GoogleService);
        usersService = moduleRef.get<UsersService>(UsersService);
    });

    const usersToUsersDto = (users) => {
        const usersAdapter = UserAdapter.toDto(users);
        Object.keys(usersAdapter).forEach(key => {
            if(usersAdapter[key] === undefined) delete usersAdapter[key];
        });
        return usersAdapter;
    }

    const token = "fffff";

    describe('authentication', () => {
        it('should find user', async() => {
            jest.spyOn(usersService,"getByEmail").mockImplementation(() => new Promise((resolve) => {
                resolve(user);
            }));
            const getUser = await googleService.authenticate(token);
            expect(getUser.email).toEqual(testEmail);
        });
        it('should register user', async() => {
            jest.spyOn(usersService,"getByEmail").mockImplementation(() => new Promise((resolve) => {
                resolve(undefined);
            }));
            jest.spyOn(googleService,'registerUser').mockImplementation(() => new Promise((resolve) => {
                resolve(usersToUsersDto(user));
            }))
            const getUser = await googleService.authenticate(token);
            expect(getUser.email).toEqual(testEmail);
        });
    });

    describe('register user', () => {
        it('should create user', async() => {
            jest.spyOn(googleService, 'getUserData').mockImplementation(() => new Promise((resolve) => {
                resolve({
                    email: testEmail,
                    given_name: "youcefinho",
                    family_name: "jal"
                })
            }));
            jest.spyOn(usersService, "create").mockImplementation((googleUser) => new Promise((resolve) => {
                resolve(usersToUsersDto(googleUser));
            }));
            const registerUser = await googleService.registerUser(token);
            expect(registerUser.email).toEqual(testEmail);
            expect(registerUser.firstname).toEqual('youcefinho');
        })
    });

    it('should return info from google', async() => {
        const getUserFromGoogle = await googleService.getUserData(token);
        expect(getUserFromGoogle.given_name).toEqual('youyou')
    })
});