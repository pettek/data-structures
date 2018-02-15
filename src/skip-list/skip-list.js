'use strict';

import { SkipNode } from './skip-node';

export class SkipList {
  constructor (maxHeight) {
    this.head = Array(maxHeight).fill(null);
    this.getRandom = function () {
      return Math.ceil(Math.random() * maxHeight);
    };
  };

  add (node) {
    // node.height = this.getRandom();
    node.next = Array(node.height).fill(null);

    for(let i = 0; i < node.height; i++) {
      if(this.head[this.head.length - node.next.length + i] === null){
        this.head[this.head.length - node.next.length + i] = node;
      } else {
        let currentNode = this.head[this.head.length - node.next.length + i];
        while(currentNode.next[currentNode.next.length - node.next.length + i] !== null){
          currentNode = currentNode.next[currentNode.next.length - node.next.length + i];
        }
        currentNode.next[currentNode.next.length - node.next.length + i] = node;
      }
    }
  }

  printLevels() {
    let outputString = "";
    for(let i = 0; i < this.head.length; i++){
      let current = this.head[i];
      outputString += "\n\nlevel " + (this.head.length - i) + "\n";
      while(current !== null){
        outputString += current.value;
        current = current.next[i - this.head.length + current.next.length];
      }
    }

    return outputString;
  }

}
