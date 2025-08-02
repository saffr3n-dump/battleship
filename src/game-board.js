export default class GameBoard {
  #GRID_SIZE = 10;
  #grid;

  constructor() {
    this.#grid = Array.from({ length: this.#GRID_SIZE }, () =>
      Array.from({ length: this.#GRID_SIZE }, () => new Cell()),
    );
  }

  at(x, y) {
    if (!this.#isPositionValid([x, y])) {
      throw new Error('Position is invalid');
    }
    return this.#grid[x][y];
  }

  #isPositionValid([x, y]) {
    return (
      typeof x === 'number' &&
      typeof y === 'number' &&
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      y >= 0 &&
      x < this.#GRID_SIZE &&
      y < this.#GRID_SIZE
    );
  }

class Cell {
  constructor() {
    this.ship = null;
  }

  placeShip(ship) {
    this.ship = ship;
  }
}
