import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Ratings} from "./entities/ratings.entity";
import {UpdateRatingsDto} from "./dto/update-ratings.dto";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Ratings)
        private ratingRepository: Repository<Ratings>,
    ) {
    }

    create() {
        return 'This action adds a new rating';
    }

    findAll() {
        /** Retourne toutes les notes avec les relations User et Plate */
        return this.ratingRepository.find({relations: ['user', 'plate']});
    }

    findOne(ratingId: number) {
        /** Retourne une note avec les relations User et Plate */
        return this.ratingRepository.findOne(ratingId, {relations: ['user', 'plate']});
    }

    findByPlate(plateId: number) {
        /** Retourne les notes d'un plat avec les relations User et Plate */
        return this.ratingRepository.find({
            relations: ['user', 'plate'],
            where: {
                'plate': {plateId}
            }
        });
    }

    findByUser(userId: number) {
        /** Retourne les notes d'un utilisateur avec les relations User et Plate */
        return this.ratingRepository.find({
            relations: ['user', 'plate'],
            where: {
                'user': {userId}
            }
        });
    }

    findByUserAndPlate(userId: number, plateId: string) {
        /** Retourne une note d'un utilisateur pour un plat avec les relations User et Plate */
        return this.ratingRepository.findOne({
            relations: ['user', 'plate'],
            where: {
                'user': {id: userId},
                'plate': {id: plateId}
            }
        });
    }

    update(ratingId: number, updateRatingsDto: UpdateRatingsDto) {
        return `This action updates a #${ratingId} rating`;
    }

    async remove(ratingId: number) {
        await this.ratingRepository.delete(ratingId);
        return `This action removes a #${ratingId} rating`;
    }
}