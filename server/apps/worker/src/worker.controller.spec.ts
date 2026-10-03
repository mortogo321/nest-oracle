import { describe, expect, it } from 'vitest';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

describe('WorkerController', () => {
  const workerController = new WorkerController(new WorkerService());

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(workerController.getHello()).toBe('Hello World!');
    });

    it('should be defined', () => {
      expect(workerController).toBeDefined();
    });
  });
});
