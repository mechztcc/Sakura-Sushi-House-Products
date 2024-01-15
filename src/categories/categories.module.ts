import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CreateCategoryService } from './services/create-category/create-category.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ListAllWithProdService } from './services/list-all-with-prod/list-all-with-prod.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CreateCategoryService, ListAllWithProdService],
})
export class CategoriesModule {}
