import { Injectable, Module } from '@nestjs/common';
import { getEnv } from '../env';

/**
 * RabbitMQ integration point.
 *
 * Scaffold status: the broker connection is planned but not yet wired.
 * `RmqService` exposes only validated connection settings today so apps
 * boot without a live broker. Wire `@nestjs/microservices` ClientProxy
 * (RMQ transport) here when the integration lands.
 */
@Injectable()
export class RmqService {
  private readonly url = getEnv('RABBITMQ_URL', 'amqp://guest:guest@localhost:5672');

  getUrl(): string {
    return this.url;
  }

  /** Returns the URL with credentials redacted for safe logging. */
  getSafeUrl(): string {
    return this.url.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:***@');
  }
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
