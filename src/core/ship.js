import { SHIP_MIN_LENGTH, SHIP_MAX_LENGTH } from '../constants.js';

export default class Ship {
  #length;
  #hits;
  coordinates;
  orientation;

  constructor(length) {
    if (!this.#isLengthValid(length)) {
      throw new Error('Invalid length');
    }
    this.#length = length;
    this.#hits = 0;
    this.coordinates = [];
    this.orientation = null;
  }

  get length() {
    return this.#length;
  }

  get hits() {
    return this.#hits;
  }

  hit() {
    ++this.#hits;
  }

  isSunk() {
    return this.#hits >= this.#length;
  }

  #isLengthValid(length) {
    return (
      typeof length === 'number' &&
      Number.isInteger(length) &&
      length >= SHIP_MIN_LENGTH &&
      length <= SHIP_MAX_LENGTH
    );
  }
}
