import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';

@Injectable()
export class ListAllService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return await this.prisma.product.findMany();
  }
}
