import { getEnv, getEnvNumber } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);

  app.use(helmet());

  const origins = getEnv('CORS_ORIGINS', 'http://localhost:3000').split(',');
  const wildcard = origins.includes('*');
  app.enableCors({
    origin: wildcard ? '*' : origins,
    credentials: !wildcard,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Rate limiting is applied globally via APP_GUARD (ThrottlerGuard) in WorkerModule.

  const port = getEnvNumber('PORT', 9000);
  await app.listen(port);
}
void bootstrap();
