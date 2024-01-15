import { Test, TestingModule } from '@nestjs/testing';
import { ListAllWithProdService } from './list-all-with-prod.service';

describe('ListAllWithProdService', () => {
  let service: ListAllWithProdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListAllWithProdService],
    }).compile();

    service = module.get<ListAllWithProdService>(ListAllWithProdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
