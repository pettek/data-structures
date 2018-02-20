'use strict';

export class SkipNode {
  /**
   *
   * @constructor Represents a node
   * @param value
   * @param height (optional) - providing height helps with debugging, but it's
   * overridden when randomizing it
   */
  constructor (value, height = 0) {
    this.value = value;
    this._next = [];
    this._height = height;
  }

  get next () {
    return this._next;
  }

  set next (nodeArray) {
    this._next = nodeArray;
  }

  get height () {
    return this._height;
  }

  set height (value) {
    this._height = value;
  }
}