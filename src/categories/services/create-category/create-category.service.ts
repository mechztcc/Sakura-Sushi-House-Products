import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { PrismaService } from 'src/shared/prisma/services/prisma.service';

@Injectable()
export class CreateCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ name, status }: CreateCategoryDto) {
    return this.prisma.category.create({ data: { name, status } });
  }
}
