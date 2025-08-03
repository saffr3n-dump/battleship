import { GRID_SIZE } from '../constants.js';

export default class EnemyBoard {
  static container = document.querySelector('.enemy .board');
  static cells = new Map();
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
  }
}
