import { Controller, Get } from '@nestjs/common';
// biome-ignore lint/style/useImportType: NestJS DI requires value imports for injected tokens
import { HealthCheck, type HealthCheckResult, HealthCheckService } from '@nestjs/terminus';
// biome-ignore lint/style/useImportType: NestJS DI requires a value import for the injected token
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check(await this.healthService.getDynamicHealthChecks());
  }

  @Get('ready')
  @HealthCheck()
  async ready(): Promise<HealthCheckResult> {
    return this.health.check(await this.healthService.getReadinessChecks());
  }

  @Get('live')
  live() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: process.env.APP_NAME ?? 'nest-oracle',
    };
  }
}
