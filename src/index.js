import './style.css';
import Ship from './core/ship.js';
import Player from './core/player.js';
import PlayerBoard from './dom/player-board.js';
import EnemyBoard from './dom/enemy-board.js';
import { GRID_SIZE } from './constants.js';

document.querySelector('button').onclick = () => window.location.reload();

const player = new Player();
const enemy = new Player();
player.gameBoard.placeShipsRandomly();
enemy.gameBoard.placeShipsRandomly();
PlayerBoard.init(player);
EnemyBoard.init(enemy);
EnemyBoard.onAttack(() => {
  while (true) {
    const [x, y] = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];

    const cell = PlayerBoard.cells.get(`${x},${y}`);
    if (cell.classList.contains('disabled')) {
      continue;
    }

    player.gameBoard.receiveAttack(x, y);
    cell.classList.add('hit', 'disabled');
    if (!player.gameBoard.at(x, y).ship) break;

    if (player.gameBoard.isEveryShipSunk()) {
      setTimeout(() => alert('You lose!'), 100);
      return true;
    }
  }
});
