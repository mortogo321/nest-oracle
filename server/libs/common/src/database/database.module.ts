import { Injectable, Module } from '@nestjs/common';
import { getEnv } from '../env';

/**
 * Oracle/TypeORM integration point.
 *
 * Scaffold status: the Oracle connection is planned but not yet wired.
 * `DatabaseService.getStatus()` reports `not-configured` until `ORACLE_DSN`
 * is set, so all three apps boot (and stay healthy) without a live Oracle
 * instance. Wire TypeORM + `oracledb` here when the integration lands.
 */
@Injectable()
export class DatabaseService {
  private readonly dsn = getEnv('ORACLE_DSN', '');

  getStatus(): 'configured' | 'not-configured' {
    return this.dsn === '' ? 'not-configured' : 'configured';
  }

  isConfigured(): boolean {
    return this.getStatus() === 'configured';
  }
}

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
