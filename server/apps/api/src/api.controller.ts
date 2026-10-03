import { Controller, Get } from '@nestjs/common';
// biome-ignore lint/style/useImportType: NestJS DI requires a value import for the injected token
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }
}
