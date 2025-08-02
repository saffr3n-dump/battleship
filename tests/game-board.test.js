import { describe, it, expect } from '@jest/globals';
import GameBoard from '../src/game-board';
describe('GameBoard', () => {
  it('is constructible', () => {
    expect(() => new GameBoard()).not.toThrow();
  });
});
