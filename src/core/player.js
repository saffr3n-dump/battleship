import GameBoard from './game-board.js';

export default class Player {
  #gameBoard;

  constructor() {
    this.#gameBoard = new GameBoard();
  }

  get gameBoard() {
    return this.#gameBoard;
  }
}
