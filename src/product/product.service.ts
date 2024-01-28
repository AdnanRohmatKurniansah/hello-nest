import { Injectable } from '@nestjs/common';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'oreo',
      price: 3000,
      desc: 'asdxsadaca',
    },
    {
      id: 2,
      name: 'wafer',
      price: 1000,
      desc: 'asdxsadaca',
    },
  ];

  create(product: Product) {
    this.products.push(product);
  }

  findAll(): Product[] {
    return this.products;
  }
}
