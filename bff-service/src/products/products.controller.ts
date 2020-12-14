import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpService,
  Param,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const TWO_MINUTES_IN_MILLISECONDS = 2 * 60 * 1000;

@Controller('products')
export class ProductsController {
  productsCache = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpService,
  ) {}

  @Get()
  getProducts() {
    const productsPath = this.configService.get<string>('PRODUCTS_PATH');
    return (
      this.productsCache ||
      this.httpClient
        .get(productsPath)
        .toPromise()
        .then((res) => {
          this.productsCache = res.data;
          setTimeout(() => {
            this.productsCache = null;
          }, TWO_MINUTES_IN_MILLISECONDS);
          return this.productsCache;
        })
        .catch(({ response }) => {
          throw new HttpException(response.data, response.status);
        })
    );
  }

  @Get(':id')
  getProductById(@Param() params) {
    const productPath = `${this.configService.get<string>('PRODUCTS_PATH')}/${
      params.id
    }`;
    return this.httpClient
      .get(productPath)
      .toPromise()
      .then((res) => res.data)
      .catch(({ response }) => {
        throw new HttpException(response.data, response.status);
      });
  }

  @Post()
  postProduct(@Body() product: string) {
    const productsPath = this.configService.get<string>('PRODUCTS_PATH');
    return this.httpClient
      .post(productsPath, product)
      .toPromise()
      .then((res) => res.data)
      .catch(({ response }) => {
        throw new HttpException(response.data, response.status);
      });
  }
}
