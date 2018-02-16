'use strict';

import { SkipNode } from './skip-node';

export class SkipList {
  /**
   *
   * @param maxHeight
   */
  constructor (maxHeight) {
    this.head = Array(maxHeight).fill(null);
    this.getRandom = function () {
      return Math.ceil(Math.random() * maxHeight);
    };
  };

  /**
   *
   * @param node
   * @returns {SkipList}
   */

  add (node) {
    node.height = this.getRandom();
    node.next = Array(node.height).fill(null);

    let leftLinks = this.search(node);
    if (leftLinks.length === 0) {
      for (let i = 0; i < node.height; i++) {
        let previousHead = this.head[this.head.length - node.height + i];
        this.head[this.head.length - node.height + i] = node;
        node.next[i] = previousHead;
      }
      return this;
    }
    for (let i = 0; i < node.height; i++) {
      let leftLink = leftLinks[i + this.head.length - node.height];

      if (leftLink) {
        let previous = leftLink.next[leftLink.next.length - node.height + i];
        leftLinks[i + this.head.length - node.height].next[i +
        leftLink.next.length - node.height] = node;
        node.next[i] = previous;
      }
    }
    return this;
  }

  remove (node) {
    if(this.find(node)) {
      return this.search(node);
    } else {
      return null;
    }
  }

  //Deprecated version of add method (kept it just in case)
  /*
   add (node) {
   node.height = this.getRandom();
   node.next = Array(node.height).fill(null);

   for (let i = 0; i < node.height; i++) {
   let currentHeadLevel = this.head.length - node.next.length + i;
   if (this.head[currentHeadLevel] === null) {
   this.head[currentHeadLevel] = node;
   } else {
   let currentNode = this.head[currentHeadLevel];
   let currentNodeLevel = currentNode.next.length - node.next.length + i;
   while (currentNode.next[currentNodeLevel] !== null) {
   currentNode = currentNode.next[currentNodeLevel];
   currentNodeLevel = currentNode.next.length - node.next.length + i;
   }
   currentNode.next[currentNodeLevel] = node;
   }
   }

   return this;
   }*/

  find (node) {
    for (let i = 0; i < this.head.length; i++) {
      let current = this.head[i];
      while (current !== null && current.value <= node.value) {
        if (current.value === node.value) {
          return current;
        }
        current = current.next[i - this.head.length + current.next.length];
      }
    }
    return null;
  }

  search (node) {
    let leftLinks = [];
    for (let i = 0; i < this.head.length; i++) {
      let current = this.head[i];
      while (current !== null && current.value < node.value) {
        leftLinks[i] = current;
        current = current.next[i - this.head.length + current.next.length];
      }
    }
    return leftLinks;
  }

  printLevels () {
    let outputString = '';
    for (let i = 0; i < this.head.length; i++) {
      let current = this.head[i];
      outputString += '\nlevel ' + (this.head.length - i) + '\n';
      while (current !== null) {
        outputString += (' -> ' + current.value);
        current = current.next[i - this.head.length + current.next.length];
      }
    }

    return outputString;
  }

}
