'use strict';

export class Node {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  get isRoot () {
    return this.parent === null;
  }
}