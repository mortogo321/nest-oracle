import { afterEach, describe, expect, it } from 'vitest';
import { DatabaseService } from './database.module';

describe('DatabaseService', () => {
  const backup = { ...process.env };

  afterEach(() => {
    process.env = { ...backup };
  });

  it('reports not-configured without ORACLE_DSN', () => {
    delete process.env.ORACLE_DSN;
    const service = new DatabaseService();
    expect(service.getStatus()).toBe('not-configured');
    expect(service.isConfigured()).toBe(false);
  });
});
