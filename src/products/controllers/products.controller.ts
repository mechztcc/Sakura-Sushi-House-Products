import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProductService } from '../services/create-product/create-product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return this.createProductService.execute(payload);
  }
}
