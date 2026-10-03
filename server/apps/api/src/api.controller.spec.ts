import { describe, expect, it } from 'vitest';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('ApiController', () => {
  const apiController = new ApiController(new ApiService());

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiController.getHello()).toBe('Hello World!');
    });

    it('should be defined', () => {
      expect(apiController).toBeDefined();
    });
  });
});
