import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';

@Injectable()
export class UpdateProductService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({}: UpdateProductDto) {}
}
