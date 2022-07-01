import StripeService from './stripe.service';
import { Body, Post, Res, Controller } from '@nestjs/common';

@Controller('payment')
export default class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/create')
  async createCharge(@Body() charge, @Res() res) {
    await this.stripeService
      .charge(charge.amount)
      .then(response => {
        res.json({ client_secret: response.client_secret, paymentIntentId: response.id })
      });
  }

  @Post('/update')
    async updateCharge(@Body() payment, @Res() res) {
      await this.stripeService.update(payment.paymentIntentId, payment.amount)
          .then(response => {
              res.json({ response });
          })
  }
}
