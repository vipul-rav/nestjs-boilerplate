import { Test, TestingModule } from '@nestjs/testing';
import { SampleAPIController } from './sample-api.controller';

describe('SampleAPIController', () => {
  let controller: SampleAPIController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleAPIController],
    }).compile();

    controller = module.get<SampleAPIController>(SampleAPIController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
