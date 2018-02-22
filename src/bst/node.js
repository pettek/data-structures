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

  get isLeftChild() {
    return (this.parent) && (this.parent.left === this);
  }
  get haveTwoChildren(){
    return this.left && this.right;
  }
  get haveNoChildren(){
    return this.left===null && this.right===null;
  }
}