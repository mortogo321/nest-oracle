import { describe, expect, it } from 'vitest';
import { RmqService } from './rmq.module';

describe('RmqService', () => {
  it('exposes a default broker URL', () => {
    const service = new RmqService();
    expect(service.getUrl()).toContain('amqp://');
  });

  it('redacts credentials in safe URL', () => {
    process.env.RABBITMQ_URL = 'amqp://guest:secret@localhost:5672';
    const service = new RmqService();
    expect(service.getSafeUrl()).not.toContain('secret');
    expect(service.getSafeUrl()).toContain('***');
    delete process.env.RABBITMQ_URL;
  });
});
