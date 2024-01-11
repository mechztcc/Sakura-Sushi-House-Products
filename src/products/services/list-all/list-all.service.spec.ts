import { Test, TestingModule } from '@nestjs/testing';
import { ListAllService } from './list-all.service';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { Product } from '@prisma/client';

describe('ListAllService', () => {
  let service: ListAllService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListAllService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ListAllService>(ListAllService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all products', async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: '19.99',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        price: '29.99',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (prismaServiceMock.product.findMany as jest.Mock).mockResolvedValue(
      mockProducts,
    );

    const result = await service.execute();

    expect(prismaServiceMock.product.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });
});
