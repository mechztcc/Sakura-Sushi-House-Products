import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';

@Injectable()
export class ListAllWithProdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return await this.prisma.category.findMany({
      where: { status: 'running' },
      include: { products: true },
    });
  }
}
