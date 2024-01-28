import { Module } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  providers: [ProductsService],
  controllers: [ProductController],
})
export class ProductModule {}
