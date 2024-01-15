import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryService } from './create-category.service';

describe('CreateCategoryService', () => {
  let service: CreateCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCategoryService],
    }).compile();

    service = module.get<CreateCategoryService>(CreateCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
