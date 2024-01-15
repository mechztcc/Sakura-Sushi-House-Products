import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../../dto/create-product.dto';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async execute({
    name,
    description,
    price,
    categoryId,
    image,
  }: CreateProductDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundException('Provided category has not found');
    }

    console.log(image);
    
    const product = await this.prisma.product.create({
      data: { description, name, price, categoryId, image },
    });

    this.client.emit('product_created', {
      content: `[PRODUCT CREATED] with Id ${product.id} and Name ${product.name} at ${product.createdAt}`,
    });
    return product;
  }
}
