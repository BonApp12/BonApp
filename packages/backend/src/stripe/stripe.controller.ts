import { Controller } from '@nestjs/common';
import StripeService from './stripe.service';
import { Body, Post, Res } from '@nestjs/common';

@Controller('stripe')
export default class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/pay')
  async createCharge(@Body() charge, @Res() res) {
    await this.stripeService.charge(charge.amount).then((response) => {
      res.json({ client_secret: response.client_secret });
    });
  }
}
