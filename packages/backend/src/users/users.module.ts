import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { UsersDto } from './dto/users.dto';

@Module({
  providers: [UsersService, ConfigService, UsersDto],
  exports: [UsersService, UsersDto],
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
})
export class UsersModule {}
