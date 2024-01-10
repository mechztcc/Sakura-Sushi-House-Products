import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';

@Injectable()
export class CreateProductService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ name, description, price }: CreateProductDto) {
    return await this.prisma.product.create({
      data: { description, name, price },
    });
  }
}
