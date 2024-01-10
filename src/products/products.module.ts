import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateProductService } from './services/create-product/create-product.service';
import { ProductsController } from './controllers/products.controller';

@Module({
  imports: [PrismaModule],
  providers: [CreateProductService],
  controllers: [ProductsController],
})
export class ProductsModule {}
