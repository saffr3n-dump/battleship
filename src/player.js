import GameBoard from './game-board';

export default class Player {
  #gameBoard;

  constructor() {
    this.#gameBoard = new GameBoard();
  }

  get gameBoard() {
    return this.#gameBoard;
  }
}
