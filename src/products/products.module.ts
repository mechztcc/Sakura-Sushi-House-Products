import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateProductService } from './services/create-product/create-product.service';
import { ProductsController } from './controllers/products.controller';
import { ListAllService } from './services/list-all/list-all.service';
import { RabbitmqModule } from 'src/logs/rabbitmq/rabbitmq.module';
import { UpdateProductService } from './services/update-product/update-product.service';

@Module({
  imports: [PrismaModule, RabbitmqModule],
  providers: [CreateProductService, ListAllService, UpdateProductService],
  controllers: [ProductsController],
})
export class ProductsModule {}
