import { Module } from '@nestjs/common';
import StripeController from './stripe.controller';
import StripeService from './stripe.service';
import { ConfigService } from '@nestjs/config';
@Module({
  providers: [StripeService, ConfigService],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
