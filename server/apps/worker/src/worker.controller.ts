import { Controller, Get } from '@nestjs/common';
// biome-ignore lint/style/useImportType: NestJS DI requires a value import for the injected token
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  getHello(): string {
    return this.workerService.getHello();
  }
}
