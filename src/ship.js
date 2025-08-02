export default class Ship {
  #length;
  #hits;

  constructor(length) {
    this.#length = length;
    this.#hits = 0;
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
}
