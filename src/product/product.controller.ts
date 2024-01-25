import { Controller, Get } from '@nestjs/common';

@Controller('product')
//prefix
export class ProductController {
  @Get()
  findAll(): string {
    return 'This action returns all product';
  }
  @Get('create')
  create(): string {
    return 'This is route create';
  }
}
