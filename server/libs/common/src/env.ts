import { z } from 'zod';

export function getEnv(key: string, fallback = ''): string {
  const value = process.env[key];
  if (value === undefined || value === '') return fallback;
  return value;
}

export function getEnvNumber(key: string, fallback: number): number {
  const raw = process.env[key];
  if (raw === undefined || raw === '') return fallback;
  const parsed = Number(raw);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function isDevelopment(): boolean {
  return getEnv('NODE_ENV', 'development') !== 'production';
}

export const appEnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  ORACLE_DSN: z.string().default(''),
  RABBITMQ_URL: z.string().default('amqp://guest:guest@localhost:5672'),
});

export type AppEnv = z.infer<typeof appEnvSchema>;

export function validateEnv(schema: typeof appEnvSchema = appEnvSchema): AppEnv {
  return schema.parse(process.env);
}
