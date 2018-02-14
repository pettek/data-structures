'use strict';

export class Node {
  /**
   * Represents a Node.
   * @constructor
   */
  constructor (value) {
    this.value = value;
    this._next = null;
  }

  get next () {
    return this._next;
  }

  set next (value) {
    this._next = value;
  }
}