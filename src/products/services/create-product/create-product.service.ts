import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../dto/create-product.dto';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async execute({ name, description, price }: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: { description, name, price },

    });

    this.client.emit('product_created', {
      content: `Product Created with Id ${product.id} and Name ${product.name} at ${product.createdAt}`,
    });
    return product;
  }
}
