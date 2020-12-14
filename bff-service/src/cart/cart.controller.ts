import {
  Body,
  Headers,
  Controller,
  Get,
  HttpException,
  HttpService,
  Put,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('cart')
export class CartController {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpService,
  ) {}

  @Get()
  getProfileCart(@Headers() headers) {
    const cartPath = this.configService.get<string>('CART_PATH');
    return this.httpClient
      .get(cartPath, { headers })
      .toPromise()
      .then((res) => res.data)
      .catch(({ response }) => {
        throw new HttpException(response.data, response.status);
      });
  }

  @Put()
  putProfileCart(@Headers() headers, @Body() data) {
    const cartPath = this.configService.get<string>('CART_PATH');
    return this.httpClient
      .put(cartPath, data, { headers })
      .toPromise()
      .then((res) => res.data)
      .catch(({ response }) => {
        throw new HttpException(response.data, response.status);
      });
  }
}
