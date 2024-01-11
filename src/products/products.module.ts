import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateProductService } from './services/create-product/create-product.service';
import { ProductsController } from './controllers/products.controller';
import { ListAllService } from './services/list-all/list-all.service';

@Module({
  imports: [PrismaModule],
  providers: [CreateProductService, ListAllService],
  controllers: [ProductsController],
})
export class ProductsModule {}
