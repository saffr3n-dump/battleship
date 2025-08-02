import { describe, it, expect } from '@jest/globals';
import Ship from '../src/core/ship.js';

describe('Ship', () => {
  it('is constructible', () => {
    expect(() => new Ship(1)).not.toThrow();
  });

  it("has 'length' field set in constructor", () => {
    expect(new Ship(3).length).toBe(3);
  });

  it("doesn't allow length < 1 or > 4", () => {
    expect(() => new Ship(0)).toThrow();
    expect(() => new Ship(5)).toThrow();
  });

  it("doesn't allow reassigning 'length'", () => {
    expect(() => (new Ship(3).length = 1)).toThrow();
  });

  it("has 'hits' property initially set to 0", () => {
    expect(new Ship(3).hits).toBe(0);
  });

  it("doesn't allow reassigning 'hits' directly", () => {
    expect(() => (new Ship(3).hits = 1)).toThrow();
  });

  it("has 'hit()' method", () => {
    expect(typeof Ship.prototype.hit).toBe('function');
  });

  it("increments 'hits' with 'hit()'", () => {
    const ship = new Ship(3);
    expect(ship.hits).toBe(0);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  it("has 'isSunk()' method", () => {
    expect(typeof Ship.prototype.isSunk).toBe('function');
  });

  it("properly determines if it's sunk with 'isSunk()'", () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
