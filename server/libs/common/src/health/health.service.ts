import { Injectable } from '@nestjs/common';
import type { HealthIndicatorResult } from '@nestjs/terminus';
import { getEnv } from '../env';

@Injectable()
export class HealthService {
  async getLiveness(): Promise<HealthIndicatorResult> {
    return {
      app: {
        status: 'up',
        service: getEnv('APP_NAME', 'nest-oracle'),
        timestamp: new Date().toISOString(),
      },
    };
  }

  async getReadinessChecks(): Promise<Array<() => Promise<HealthIndicatorResult>>> {
    return [() => this.getLiveness()];
  }

  async getDynamicHealthChecks(): Promise<Array<() => Promise<HealthIndicatorResult>>> {
    return [() => this.getLiveness()];
  }
}
