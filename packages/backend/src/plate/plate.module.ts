import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateController } from './plate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plate } from './entities/plate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plate])],
  controllers: [PlateController],
  providers: [PlateService],
})
export class PlateModule {}
