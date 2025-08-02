import Ship from './ship';

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

  placeShip(ship, position, orientation) {
    if (!(ship instanceof Ship)) {
      throw new Error('Ship is invalid');
    }
    if (!this.#isPositionValid(position)) {
      throw new Error('Position is invalid');
    }
    if (orientation !== 'x' && orientation !== 'y') {
      throw new Error('Orientation is invalid');
    }

    const pos = [...position];
    const dir = orientation === 'x' ? 0 : 1;
    pos[dir] = Math.min(pos[dir], this.#GRID_SIZE - ship.length);

    const coords = [];
    for (let i = 0; i < ship.length; ++i) {
      coords.push([...pos]);
      ++pos[dir];
    }

    if (!this.#areAdjacentCellsFree(coords)) {
      throw new Error('Position is already taken');
    }

    for (const [x, y] of coords) {
      this.#grid[x][y].placeShip(ship);
    }
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

  #areAdjacentCellsFree(coords) {
    const last = coords.length - 1;
    const minX = coords[0][0];
    const maxX = coords[last][0];
    const minY = coords[0][1];
    const maxY = coords[last][1];
    for (let i = minX - 1; i <= maxX + 1; ++i) {
      if (i < 0 || i >= this.#GRID_SIZE) continue;
      for (let j = minY - 1; j <= maxY + 1; ++j) {
        if (j < 0 || j >= this.#GRID_SIZE) continue;
        if (this.#grid[i][j].ship) {
          return false;
        }
      }
    }
    return true;
  }
}

class Cell {
  constructor() {
    this.ship = null;
  }

  placeShip(ship) {
    this.ship = ship;
  }
}
