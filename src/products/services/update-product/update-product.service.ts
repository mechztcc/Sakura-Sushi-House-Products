import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';

interface IRequest {
  data: UpdateProductDto;
  productId: number;
}
@Injectable()
export class UpdateProductService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async execute({ productId: id, data }: IRequest) {
    const productExists = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new NotFoundException(
        `Provided product with ID ${id} has not found.`,
      );
    }

    const productUpdated = await this.prisma.product.update({
      data: {
        description: data.description,
        name: data.name,
        price: data.price,
      },
      where: { id },
    });

    this.client.emit('product_created', {
      content: `[PRODUCT UPDATED] with Id ${productExists.id} and Name ${productExists.name} at ${productExists.updatedAt}`,
    });
    
    return productUpdated;
  }
}
