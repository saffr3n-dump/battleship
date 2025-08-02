import { describe, it, expect } from '@jest/globals';
import GameBoard from '../src/game-board';
describe('GameBoard', () => {
  it('is constructible', () => {
    expect(() => new GameBoard()).not.toThrow();
  });

  it("has 'at()' method", () => {
    expect(GameBoard.prototype.at).toBeDefined();
  });

  it("accepts '0,0' to '9,9' coordinates in 'at()'", () => {
    const gameBoard = new GameBoard();
    expect(() => gameBoard.at(-1, 0)).toThrow();
    expect(() => gameBoard.at(0, 10)).toThrow();
    expect(() => gameBoard.at('0', 0)).toThrow();
    expect(() => gameBoard.at(0, 0.5)).toThrow();
    expect(() => gameBoard.at(0, 0)).not.toThrow();
    expect(() => gameBoard.at(9, 9)).not.toThrow();
  });

  it("has 'ship' property in each cell", () => {
    const gameBoard = new GameBoard();
    for (let i = 0; i < 10; ++i) {
      for (let j = 0; j < 10; ++j) {
        expect(gameBoard.at(i, j).ship).toBeDefined();
      }
    }
  });
});
