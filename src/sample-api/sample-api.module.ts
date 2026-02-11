import { Module } from '@nestjs/common';
import { SampleAPIController } from './sample-api.controller';
import { SampleAPIService } from './sample-api.service';
import { SampleAPIRepository } from './sample-api.repository';
import { ISampleAPIRepository } from './interfaces/sample-api.repository.interface';

@Module({
  controllers: [SampleAPIController],
  providers: [
    SampleAPIService,
    {
      provide: ISampleAPIRepository,
      useClass: SampleAPIRepository,
    },
  ],
  exports: [SampleAPIService, ISampleAPIRepository],
})
export class SampleAPIModule {}
