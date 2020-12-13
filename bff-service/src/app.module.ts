import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ConfigModule } from '@nestjs/config';
import { CartController } from './cart/cart.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController, ProductsController, CartController],
  providers: [AppService],
})
export class AppModule {}
