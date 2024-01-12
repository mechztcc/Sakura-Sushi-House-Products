import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductService } from './update-product.service';
import { PrismaService } from '../../../shared/prisma/services/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';

describe('UpdateProductService', () => {
  let sut: UpdateProductService;
  let prismaServiceMock: PrismaService;
  let clientProxyMock: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              update: jest.fn(),
              findUnique: jest.fn(),
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

    sut = module.get<UpdateProductService>(UpdateProductService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    clientProxyMock = module.get<ClientProxy>('RABBITMQ_SERVICE');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be update a exists product and emit a msg to RABBITMQ', async () => {
    const productId: number = 12;
    const payload: UpdateProductDto = {
      description: 'Description',
      name: 'name',
      price: '31.0',
    };

    const mockProduct: Product = {
      description: 'Old description',
      name: 'Old name',
      price: '31.0',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: productId,
    };

    jest
      .spyOn(prismaServiceMock.product, 'findUnique')
      .mockResolvedValue(mockProduct);

    jest.spyOn(prismaServiceMock.product, 'update').mockResolvedValue({
      id: productId,
      ...payload,
      createdAt: mockProduct.createdAt,
      updatedAt: mockProduct.updatedAt,
    });

    const result = await sut.execute({ data: payload, productId });

    expect(result.description).toEqual(payload.description);
    expect(result.name).toEqual(payload.name);
    expect(result.price).toEqual(payload.price);

    expect(clientProxyMock.emit).toHaveBeenCalledWith('product_created', {
      content: expect.stringContaining(`[PRODUCT UPDATED] with Id ${productId}`),
    });


  });

  it('should be return 404 whe try to update a not found product', async () => {
    jest.spyOn(prismaServiceMock.product, 'findUnique').mockResolvedValue(null);

    const productId: number = 12;
    const payload: UpdateProductDto = {
      description: 'Description',
      name: 'name',
      price: '31.0',
    };

    await expect(
      sut.execute({ data: payload, productId }),
    ).rejects.toThrowError(NotFoundException);
  });
});
