import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';

// eslint-disable-next-line prefer-const
let products = [
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

@Controller('product')
//prefix
export class ProductController {
  @Get()
  findAll(@Res() res: Response) {
    res.json({
      data: products,
    });
  }
  @Get('create')
  create(@Res({ passthrough: true }) res: Response): string {
    res.cookie('name', 'adnan');
    return 'This is route create';
  }

  @Post()
  store(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    try {
      const { id, name, price, desc } = createProductDto;
      products.push({
        id,
        name,
        price,
        desc,
      });
      res.json({
        message: 'Successfully added new product',
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  @Get(':id')
  show(@Param('id') id: string, @Res() res: Response) {
    try {
      const productId = parseInt(id, 10);
      const product = products.find((p) => p.id === productId);
      res.json({
        message: 'Detail product',
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}
