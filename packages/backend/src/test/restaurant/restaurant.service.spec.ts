import {Test} from '@nestjs/testing';
import {RestaurantController} from "../../restaurant/restaurant.controller";
import {RestaurantService} from "../../restaurant/restaurant.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Restaurant} from "../../restaurant/entities/restaurant.entity";
import {Repository} from "typeorm";


describe('RestaurantService', () => {
    let restaurantController: RestaurantController;
    let restaurantService: RestaurantService;
    let restaurantRepository: Repository<Restaurant>;
    let createRestaurantDto;
    const RESTAURANT_REPOSITORY_TOKEN = getRepositoryToken(Restaurant);

    const updatedRestaurantDto = createRestaurantDto = jest.fn().mockImplementation(() => {
        return {
            id: "1",
            name: "string",
            siren: "string",
            address: 1,
            contact_firstname: "string",
            contact_lastname: "string",
            contact_email: "string",
            contact_phone: "string",
        };
    });
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RestaurantController],
            providers: [RestaurantService, {
                provide: RESTAURANT_REPOSITORY_TOKEN,
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

        restaurantService = moduleRef.get<RestaurantService>(RestaurantService);
        restaurantController = moduleRef.get<RestaurantController>(RestaurantController);
        restaurantRepository = moduleRef.get<Repository<Restaurant>>(RESTAURANT_REPOSITORY_TOKEN);
    });


    it('userRepository should be defined', () => {
        expect(restaurantRepository).toBeDefined();
    });


    describe("findAll", () => {
        it('should return all Restaurants with address and plates', async () => {
            await restaurantService.findAll();
            expect(restaurantRepository.find).toHaveBeenCalledWith({relations: ['address', 'plates']});
        });
        it('should return an array of Restaurants', async () => {
            // On mock le repository pour qu'il retourne un tableau de restaurants
            jest.spyOn(restaurantRepository, 'find').mockImplementation(() => {
                return new Promise((resolve) => {
                    const restaurant = new Restaurant();
                    restaurant.id = 1;
                    restaurant.name = "string";
                    restaurant.siren = "string";
                    restaurant.address = 1;
                    restaurant.contact_firstname = "string";
                    restaurant.contact_lastname = "string";
                    restaurant.contact_email = "string";
                    restaurant.contact_phone = "string";

                    resolve(new Array<Restaurant>(restaurant));
                });
            });
            const restaurants = await restaurantService.findAll();
            expect(restaurants[0].id).toEqual(1);
            expect(restaurants).toBeInstanceOf(Array);
        });
    });


    it('should return a Restaurant', async () => {
        await restaurantService.findOne(1);
        expect(restaurantRepository.findOne).toHaveBeenCalledWith(1, {relations: ['address', 'plates']});
    });

    it('should update a Restaurants', async () => {
        await restaurantService.update(1, updatedRestaurantDto);
        expect(await restaurantRepository.update).toHaveBeenCalled();
    });


    it('should create a Restaurant', async () => {
        const result = 'This action adds a new restaurant';
        restaurantService.create(createRestaurantDto);
        expect(restaurantService.create(createRestaurantDto)).toBe(result);
    });

    it('should remove a Restaurant', async () => {
        expect(await restaurantService.remove(1)).toBe(void 0);
    });


    /* These are examples of how to test the controller */
    // describe('findAll', () => {
    //     it('should return an array of Restaurant', async () => {
    //         const result = ['test'];
    //         jest.spyOn(restaurantService, 'findAll').mockImplementation(() => new Promise(resolve => resolve([])));
    //         expect(typeof await restaurantController.findAll()).toBe(typeof result);
    //     });
    // });
    //
    // it('restaurantRespository should be defined', () => {
    //     expect(restaurantRepository).toBeDefined();
    // });


});
