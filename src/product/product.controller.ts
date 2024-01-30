import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
//prefix
export class ProductController {
  constructor(private productService: ProductsService) {}

  @Get()
  async index(@Res() res: Response) {
    const products = this.productService.findAll();
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
      const products = this.productService.findAll();
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
  show(@Param('id') id: number, @Res() res: Response) {
    try {
      const products = this.productService.findAll();
      const product = products.filter((p) => {
        return p.id == id;
      });
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

  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    try {
      const products = this.productService.findAll();
      products.filter((p) => {
        if (p.id == id) {
          p.name = updateProductDto.name;
          p.price = updateProductDto.price;
          p.desc = updateProductDto.desc;
        }
      });
      res.json({
        message: 'Successfully updated product',
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  @Delete(':id')
  destroy(@Param('id') id: number, @Res() res: Response) {
    try {
      const products = this.productService.findAll();
      const product = products.filter((p) => {
        return p.id != id;
      });
      res.json({
        message: 'Successfully deleted product',
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  upload(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file.buffer.toString(),
    };
  }
}
