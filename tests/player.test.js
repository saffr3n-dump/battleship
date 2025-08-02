import { describe, it, expect } from '@jest/globals';
import Player from '../src/player';
import GameBoard from '../src/game-board';

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
