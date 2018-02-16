'use strict';

export class SkipNode {
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