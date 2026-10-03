import { afterEach, describe, expect, it } from 'vitest';
import { getEnv, getEnvNumber, getRequiredEnv, validateEnv } from './env';

describe('env helpers', () => {
  const backup = { ...process.env };

  afterEach(() => {
    process.env = { ...backup };
  });

  it('getEnv returns fallback when missing', () => {
    delete process.env.MISSING_KEY;
    expect(getEnv('MISSING_KEY', 'fallback')).toBe('fallback');
  });

  it('getEnv returns value when set', () => {
    process.env.MISSING_KEY = 'value';
    expect(getEnv('MISSING_KEY', 'fallback')).toBe('value');
  });

  it('getEnvNumber parses numbers and falls back on garbage', () => {
    process.env.NUM_KEY = '8080';
    expect(getEnvNumber('NUM_KEY', 3000)).toBe(8080);
    process.env.NUM_KEY = 'not-a-number';
    expect(getEnvNumber('NUM_KEY', 3000)).toBe(3000);
    delete process.env.NUM_KEY;
    expect(getEnvNumber('NUM_KEY', 3000)).toBe(3000);
  });

  it('getRequiredEnv throws when missing', () => {
    delete process.env.REQUIRED_KEY;
    expect(() => getRequiredEnv('REQUIRED_KEY')).toThrow(/REQUIRED_KEY/);
    process.env.REQUIRED_KEY = 'present';
    expect(getRequiredEnv('REQUIRED_KEY')).toBe('present');
  });

  it('validateEnv applies defaults', () => {
    delete process.env.PORT;
    const env = validateEnv();
    expect(env.PORT).toBe(3000);
    expect(env.RABBITMQ_URL).toContain('amqp://');
  });
});
