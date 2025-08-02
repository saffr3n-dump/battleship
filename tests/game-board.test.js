import { describe, it, expect } from '@jest/globals';
import GameBoard from '../src/core/game-board.js';
import Ship from '../src/core/ship.js';

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

  it("has 'ship' and 'isHit' properties in each cell", () => {
    const gameBoard = new GameBoard();
    for (let i = 0; i < 10; ++i) {
      for (let j = 0; j < 10; ++j) {
        const cell = gameBoard.at(i, j);
        expect(cell.ship).toBeDefined();
        expect(cell.isHit).toBeDefined();
      }
    }
  });

  it("has 'placeShip()' method", () => {
    expect(GameBoard.prototype.placeShip).toBeDefined();
  });

  it("accepts 'Ship', '[x, y]' position and 'x' or 'y' orientation in 'placeShip()'", () => {
    const gameBoard = new GameBoard();
    expect(() => gameBoard.placeShip()).toThrow();
    expect(() => gameBoard.placeShip('test', [0, 0], 'x')).toThrow();
    expect(() => gameBoard.placeShip(new Ship(3), ['0', '0'], 'x')).toThrow();
    expect(() => gameBoard.placeShip(new Ship(3), [10, 10], 'x')).toThrow();
    expect(() => gameBoard.placeShip(new Ship(3), [0, 0], 'test')).toThrow();
    expect(() => gameBoard.placeShip(new Ship(3), [0, 0], 'x')).not.toThrow();
  });

  it("properly places ships with 'placeShip()'", () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.at(1, 1).ship).toBeNull();
    expect(gameBoard.at(2, 1).ship).toBeNull();
    expect(gameBoard.at(9, 2).ship).toBeNull();
    expect(gameBoard.at(9, 3).ship).toBeNull();
    const ship = new Ship(2);
    gameBoard.placeShip(ship, [1, 1], 'x');
    expect(gameBoard.at(1, 1).ship).toBe(ship);
    expect(gameBoard.at(2, 1).ship).toBe(ship);
    expect(gameBoard.at(9, 2).ship).toBeNull();
    expect(gameBoard.at(9, 3).ship).toBeNull();
    gameBoard.placeShip(ship, [9, 2], 'y');
    expect(gameBoard.at(1, 1).ship).toBe(ship);
    expect(gameBoard.at(2, 1).ship).toBe(ship);
    expect(gameBoard.at(9, 2).ship).toBe(ship);
    expect(gameBoard.at(9, 3).ship).toBe(ship);
  });

  it("doesn't overflow grid with 'placeShip()'", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3);
    gameBoard.placeShip(ship, [9, 0], 'x');
    expect(gameBoard.at(7, 0).ship).toBe(ship);
    expect(gameBoard.at(8, 0).ship).toBe(ship);
    expect(gameBoard.at(9, 0).ship).toBe(ship);
  });

  it("doesn't allow placing ships to busy cells", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(new Ship(2), [0, 0], 'x');
    expect(() => gameBoard.placeShip(new Ship(1), [0, 0], 'x')).toThrow();
    expect(() => gameBoard.placeShip(new Ship(1), [1, 0], 'x')).toThrow();
    expect(() => gameBoard.placeShip(new Ship(1), [3, 0], 'x')).not.toThrow();
  });

  it("doesn't allow placing ships near busy cells", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(new Ship(1), [4, 4], 'x');
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (i === 0 && j === 0) continue;
        const pos = [4 + i, 4 + j];
        expect(() => gameBoard.placeShip(new Ship(1), pos, 'x')).toThrow();
      }
    }
    expect(() => gameBoard.placeShip(new Ship(1), [7, 7], 'x')).not.toThrow();
  });

  it("has 'receiveAttack()' method", () => {
    expect(GameBoard.prototype.receiveAttack).toBeDefined();
  });

  it("accepts '0,0' to '9,9' coordinates in 'receiveAttack()'", () => {
    const gameBoard = new GameBoard();
    expect(() => gameBoard.receiveAttack(-1, 0)).toThrow();
    expect(() => gameBoard.receiveAttack(0, 10)).toThrow();
    expect(() => gameBoard.receiveAttack('0', 0)).toThrow();
    expect(() => gameBoard.receiveAttack(0, 0.5)).toThrow();
    expect(() => gameBoard.receiveAttack(0, 0)).not.toThrow();
    expect(() => gameBoard.receiveAttack(9, 9)).not.toThrow();
  });

  it("properly registers hit cells and ships with 'receiveAttack()'", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(2);
    gameBoard.placeShip(ship, [0, 0], 'x');
    expect(ship.isSunk()).toBeFalsy();
    expect(gameBoard.at(0, 0).isHit).toBeFalsy();
    expect(gameBoard.at(1, 0).isHit).toBeFalsy();
    gameBoard.receiveAttack(0, 0);
    expect(ship.isSunk()).toBeFalsy();
    expect(gameBoard.at(0, 0).isHit).toBeTruthy();
    expect(gameBoard.at(1, 0).isHit).toBeFalsy();
    gameBoard.receiveAttack(1, 0);
    expect(ship.isSunk()).toBeTruthy();
    expect(gameBoard.at(0, 0).isHit).toBeTruthy();
    expect(gameBoard.at(1, 0).isHit).toBeTruthy();
  });

  it("only allows 1 hit to ship per 1 position with 'receiveAttack()'", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(2);
    gameBoard.placeShip(ship, [0, 0], 'x');
    expect(ship.isSunk()).toBeFalsy();
    gameBoard.receiveAttack(0, 0);
    expect(ship.isSunk()).toBeFalsy();
    gameBoard.receiveAttack(0, 0);
    expect(ship.isSunk()).toBeFalsy();
  });

  it("has 'isEveryShipSunk()' method", () => {
    expect(GameBoard.prototype.isEveryShipSunk).toBeDefined();
  });

  it("properly determines whether all ships on game board are sunk with 'isEveryShipSunk()'", () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(new Ship(1), [0, 0], 'x');
    gameBoard.placeShip(new Ship(1), [9, 9], 'x');
    expect(gameBoard.isEveryShipSunk()).toBeFalsy();
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.isEveryShipSunk()).toBeFalsy();
    gameBoard.receiveAttack(9, 9);
    expect(gameBoard.isEveryShipSunk()).toBeTruthy();
  });
});
