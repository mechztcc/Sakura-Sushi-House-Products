import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductService } from '../services/create-product/create-product.service';
import { ListAllService } from '../services/list-all/list-all.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listAllService: ListAllService,
  ) {}

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return this.createProductService.execute(payload);
  }

  @Put()
  async update(@Body() payload: UpdateProductDto) {}

  @Get()
  async index() {
    return await this.listAllService.execute();
  }
}
