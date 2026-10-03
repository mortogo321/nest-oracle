import { describe, expect, it } from 'vitest';
import { HealthService } from './health.service';

describe('HealthService', () => {
  it('reports liveness as up', async () => {
    const service = new HealthService();
    const result = await service.getLiveness();
    expect(result.app.status).toBe('up');
  });

  it('returns readiness and dynamic check factories', async () => {
    const service = new HealthService();
    const readiness = await service.getReadinessChecks();
    const dynamic = await service.getDynamicHealthChecks();
    expect(readiness.length).toBeGreaterThan(0);
    expect(dynamic.length).toBeGreaterThan(0);
    const first = readiness[0];
    if (!first) throw new Error('missing readiness check');
    const result = await first();
    expect(result.app.status).toBe('up');
  });
});
