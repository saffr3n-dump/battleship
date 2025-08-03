import Ship from './ship.js';
import { GRID_SIZE } from '../constants.js';

export default class GameBoard {
  #grid;
  #ships;

  constructor() {
    this.#grid = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => new Cell()),
    );
    this.#ships = [];
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
    pos[dir] = Math.min(pos[dir], GRID_SIZE - ship.length);

    const coords = [];
    for (let i = 0; i < ship.length; ++i) {
      coords.push([...pos]);
      ++pos[dir];
    }

    if (!this.#areAdjacentCellsFree(coords)) {
      throw new Error('Position is already taken');
    }

    ship.coordinates = coords;
    ship.orientation = orientation;
    for (const [x, y] of coords) {
      this.#grid[x][y].placeShip(ship);
    }
    this.#ships.push(ship);
  }

  receiveAttack(x, y) {
    if (!this.#isPositionValid([x, y])) {
      throw new Error('Position is invalid');
    }
    this.#grid[x][y].hit();
  }

  isEveryShipSunk() {
    return this.#ships.every((ship) => ship.isSunk());
  }

  #isPositionValid([x, y]) {
    return (
      typeof x === 'number' &&
      typeof y === 'number' &&
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      y >= 0 &&
      x < GRID_SIZE &&
      y < GRID_SIZE
    );
  }

  #areAdjacentCellsFree(coords) {
    const last = coords.length - 1;
    const minX = coords[0][0];
    const maxX = coords[last][0];
    const minY = coords[0][1];
    const maxY = coords[last][1];
    for (let i = minX - 1; i <= maxX + 1; ++i) {
      if (i < 0 || i >= GRID_SIZE) continue;
      for (let j = minY - 1; j <= maxY + 1; ++j) {
        if (j < 0 || j >= GRID_SIZE) continue;
        if (this.#grid[i][j].ship) {
          return false;
        }
      }
    }
    return true;
  }
}

class Cell {
  #ship;
  #isHit;

  constructor() {
    this.#ship = null;
    this.#isHit = false;
  }

  get ship() {
    return this.#ship;
  }

  get isHit() {
    return this.#isHit;
  }

  placeShip(ship) {
    this.#ship = ship;
  }

  hit() {
    if (this.#isHit) return;
    this.#isHit = true;
    if (this.#ship) this.#ship.hit();
  }
}
