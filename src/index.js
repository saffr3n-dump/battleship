import Ship from './core/ship.js';
import Player from './core/player.js';
import PlayerBoard from './dom/player-board.js';
import EnemyBoard from './dom/enemy-board.js';

const player = new Player();
const enemy = new Player();

// temporarily hard coded ships
{
  player.gameBoard.placeShip(new Ship(4), [0, 0], 'x');
  player.gameBoard.placeShip(new Ship(3), [5, 0], 'x');
  player.gameBoard.placeShip(new Ship(3), [0, 2], 'x');
  player.gameBoard.placeShip(new Ship(2), [4, 2], 'x');
  player.gameBoard.placeShip(new Ship(2), [7, 2], 'x');
  player.gameBoard.placeShip(new Ship(2), [0, 4], 'x');
  player.gameBoard.placeShip(new Ship(1), [9, 0], 'x');
  player.gameBoard.placeShip(new Ship(1), [3, 4], 'x');
  player.gameBoard.placeShip(new Ship(1), [5, 4], 'x');
  player.gameBoard.placeShip(new Ship(1), [7, 4], 'x');

  enemy.gameBoard.placeShip(new Ship(4), [0, 0], 'x');
  enemy.gameBoard.placeShip(new Ship(3), [5, 0], 'x');
  enemy.gameBoard.placeShip(new Ship(3), [0, 2], 'x');
  enemy.gameBoard.placeShip(new Ship(2), [4, 2], 'x');
  enemy.gameBoard.placeShip(new Ship(2), [7, 2], 'x');
  enemy.gameBoard.placeShip(new Ship(2), [0, 4], 'x');
  enemy.gameBoard.placeShip(new Ship(1), [9, 0], 'x');
  enemy.gameBoard.placeShip(new Ship(1), [3, 4], 'x');
  enemy.gameBoard.placeShip(new Ship(1), [5, 4], 'x');
  enemy.gameBoard.placeShip(new Ship(1), [7, 4], 'x');
}

PlayerBoard.init(player);
EnemyBoard.init(enemy);
