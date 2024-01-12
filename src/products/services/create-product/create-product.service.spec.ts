import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductService } from './create-product.service';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';

describe('CreateProductService', () => {
  let service: CreateProductService;
  let prismaServiceMock: PrismaService;
  let clientProxyMock: ClientProxy;

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
    clientProxyMock = module.get<ClientProxy>('RABBITMQ_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shoud be create a new product and emit msg to RABBITMQ', async () => {
    const payload: CreateProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: '19.99',
    };

    const createdAt = new Date();
    const id = 1;

    (prismaServiceMock.product.create as jest.Mock).mockResolvedValue({
      id,
      ...payload,
      createdAt,
      updatedAt: createdAt
    });

    const result = await service.execute({...payload});

    expect(result).toEqual({
      id,
      ...payload,
      createdAt,
      updatedAt: createdAt
    });

    expect(clientProxyMock.emit).toHaveBeenCalledWith('product_created', {
      content: expect.stringContaining(
        `[PRODUCT CREATED] with Id ${id} and Name Test Product at ${createdAt}`,
      ),
    });
  });
});
