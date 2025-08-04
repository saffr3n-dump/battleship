import { GRID_SIZE } from '../constants.js';

export default class EnemyBoard {
  static container = document.querySelector('.enemy .board');
  static cells = new Map();
  static attackListeners = new Set();
  static board;

  static init(enemy) {
    for (let i = 0; i < GRID_SIZE; ++i) {
      for (let j = 0; j < GRID_SIZE; ++j) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.pos = `[${j},${i}]`;
        this.container.appendChild(cell);
        this.cells.set(`${j},${i}`, cell);
      }
    }
    this.board = enemy.gameBoard;
    this.enable();
  }

  static enable() {
    this.container.addEventListener('click', this.#onClick);
  }

  static disable() {
    this.container.removeEventListener('click', this.#onClick);
  }

  static onAttack(callback) {
    this.attackListeners.add(callback);
  }

  static #onClick = (e) => {
    const cell = e.target;
    if (
      !cell.classList.contains('cell') ||
      cell.classList.contains('disabled')
    ) {
      return;
    }
    this.disable();

    const [x, y] = JSON.parse(cell.dataset.pos);
    this.board.receiveAttack(x, y);
    cell.classList.add('hit', 'disabled');

    const { ship } = this.board.at(x, y);
    if (ship) {
      cell.classList.add('ship');
      if (ship.length === 1) {
        this.#disableNeighbors(x, y);
      } else {
        this.#disableDiagonals(x, y);
        if (ship.isSunk()) this.#disableEnds(ship);
      }

      if (this.board.isEveryShipSunk()) {
        setTimeout(() => alert('You win!'), 100);
      } else {
        this.enable();
      }

      return;
    }

    let gameOver;
    for (const cb of this.attackListeners) gameOver ||= cb();
    if (!gameOver) this.enable();
  };

  static #disableNeighbors(x, y) {
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (i === 0 && j === 0) continue;
        const cell = this.cells.get(`${x + j},${y + i}`);
        if (cell) cell.classList.add('disabled');
      }
    }
  }

  static #disableDiagonals(x, y) {
    for (let i = -1; i <= 1; i += 2) {
      for (let j = -1; j <= 1; j += 2) {
        const cell = this.cells.get(`${x + j},${y + i}`);
        if (cell) cell.classList.add('disabled');
      }
    }
  }

  static #disableEnds(ship) {
    let [startX, startY] = ship.coordinates[0];
    let [endX, endY] = ship.coordinates.at(-1);
    ship.orientation === 'x' ? (--startX, ++endX) : (--startY, ++endY);
    const startCell = this.cells.get(`${startX},${startY}`);
    const endCell = this.cells.get(`${endX},${endY}`);
    if (startCell) startCell.classList.add('disabled');
    if (endCell) endCell.classList.add('disabled');
  }
}
