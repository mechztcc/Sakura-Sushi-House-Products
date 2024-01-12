import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductService } from './create-product.service';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

describe('CreateProductService', () => {
  let service: CreateProductService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: 'RABBITMQ_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateProductService>(CreateProductService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shoud be create a new product', async () => {
    const payload: CreateProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: '19.99',
    };

    (prismaServiceMock.product.create as jest.Mock).mockResolvedValue({
      id: '1',
      ...payload,
    });

    const result = await service.execute(payload);

    expect(result).toEqual({
      id: '1',
      ...payload,
    });
  });
});
