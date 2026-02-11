import { Test, TestingModule } from '@nestjs/testing';
import { SampleAPI } from './sample-api.service';

describe('SampleAPI', () => {
  let service: SampleAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleAPI],
    }).compile();

    service = module.get<SampleAPI>(SampleAPI);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
