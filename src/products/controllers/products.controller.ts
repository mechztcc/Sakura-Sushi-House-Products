import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductService } from '../services/create-product/create-product.service';
import { ListAllService } from '../services/list-all/list-all.service';
import { UpdateProductService } from '../services/update-product/update-product.service';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listAllService: ListAllService,
    private readonly updateProduct: UpdateProductService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async create(@Body() payload: CreateProductDto) {
    return this.createProductService.execute(payload);
  }

  @Put()
  @UseInterceptors(AuthorizationInterceptor)
  async update(@Body() payload: UpdateProductDto) {
    return await this.updateProduct.execute(payload);
  }

  @Get()
  async index() {
    return await this.listAllService.execute();
  }
}
