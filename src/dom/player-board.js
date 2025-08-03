import { GRID_SIZE } from '../constants.js';

export default class PlayerBoard {
  static container = document.querySelector('.player .board');
  static cells = new Map();
  static board;

  static init(player) {
    this.board = player.gameBoard;
    for (let i = 0; i < GRID_SIZE; ++i) {
      for (let j = 0; j < GRID_SIZE; ++j) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.pos = `[${j},${i}]`;
        this.container.appendChild(cell);
        this.cells.set(`${j},${i}`, cell);
        if (!this.board.at(j, i).ship) continue;
        cell.classList.add('ship');
      }
    }
  }
}
