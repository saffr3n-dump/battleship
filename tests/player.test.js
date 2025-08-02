import { describe, it, expect } from '@jest/globals';
import Player from '../src/core/player.js';
import GameBoard from '../src/core/game-board.js';

describe('Player', () => {
  it('is constructible', () => {
    expect(() => new Player()).not.toThrow();
  });

  it("has 'gameBoard' property, which is instance of GameBoard", () => {
    const player = new Player();
    expect(player.gameBoard).toBeDefined();
    expect(player.gameBoard instanceof GameBoard).toBeTruthy();
  });
});
