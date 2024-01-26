import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('product')
//prefix
export class ProductController {
  @Get()
  findAll(@Res() res: Response) {
    res.json({
      name: 'oreo',
    });
  }
  @Get('create')
  create(@Res({ passthrough: true }) res: Response): string {
    res.cookie('name', 'adnan');
    return 'This is route create';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} product`;
  }
}
