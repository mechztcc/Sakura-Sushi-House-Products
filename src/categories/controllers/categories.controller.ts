import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CreateCategoryService } from '../services/create-category/create-category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ListAllWithProdService } from '../services/list-all-with-prod/list-all-with-prod.service';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly listAllActiveService: ListAllWithProdService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async create(@Body() payload: CreateCategoryDto) {
    return this.createCategoryService.execute(payload);
  }

  @Get()
  async listAllActive() {
    return this.listAllActiveService.execute();
  }
}
