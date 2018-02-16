'use strict';

import { SkipNode } from './skip-node';

export class SkipList {
  /**
   * @constructor Represents a SkipList
   * @param maxHeight
   * @param comparator
   */
  constructor (maxHeight, comparator) {
    this.head = Array(maxHeight).fill(null); //Initialize head as array of nulls
    this.getRandom = function () {
      // This function will be provided in the ctor, but now it is hard-coded
      return Math.ceil(Math.random() * maxHeight);
    };
    // If no comparator is provided, use the default one
    this.comparator = comparator || function (a, b) {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    };
  };

  /**
   * Adds new SkipNode to the SkipList
   * @param {*} node
   * @returns {SkipList}
   */
  add (node) {
    // If node provided is not an instance of SkipNode, call the SkipNode ctor
    node = (node instanceof SkipNode) ? node : new SkipNode(node);
    // Pick a random height
    node.height = this.getRandom();
    node.next = Array(node.height).fill(null);

    let leftLinks = this.search(node);
    if (leftLinks.length === 0) {
      for (let i = 0; i < node.height; i++) {
        let previousHead = this.head[i];
        this.head[i] = node;
        node.next[i] = previousHead;
      }
      return this;
    }
    for (let i = 0; i < node.height; i++) {
      let leftLink = leftLinks[i];

      if (leftLink) {
        let previous = leftLink.next[i];
        leftLinks[i].next[i] = node;
        node.next[i] = previous;
      }
    }
    return this;
  }

  /**
   * Removes the SkipNode from the SkipList if there is a node that matches
   * @param nodeToRemove
   * @returns {SkipList}
   */
  remove (nodeToRemove) {
    let node = (nodeToRemove instanceof SkipNode) ? nodeToRemove : new SkipNode(nodeToRemove);
    node = this.find(node);
    if (node) {
      let leftLinks = this.search(node);
      if (leftLinks.length === 0) {
        //this is the first element
        for (let i = 0; i < node.height; i++) {
          this.head[i] = node.next[i];
        }
      } else {
        for (let j = 0; j < node.height; j++) {
          let leftLink = leftLinks[j];
          if (leftLink) {
            leftLink.next[j] = node.next[j];
          } else {
            //leftLink undefined - so it we must modify head
            this.head[j] = node.next[j];
          }
        }
      }
    }
    return this;
  }

  /**
   * Returns SkipNode if it matches the one provided in the argument or null
   * otherwise
   * @param node
   * @returns {*}
   */
  find (node) {
    for (let i = (this.head.length - 1); i >= 0; i--) {
      let current = this.head[i];
      while (current !== null &&
      this.comparator(current.value, node.value) < 1) {
        if (this.comparator(current.value, node.value) === 0) {
          return current;
        }
        current = current.next[i];
      }
    }
    return null;
  }

  /**
   * Returns an array of left-side connections of a node that does not have to
   * be inside the SkipList, it just finds the proper place for it (making it
   * useful for the add method) If the node is an element of the SkipList it
   * returns all the left-side connections that have to be rewritten when
   * removing this element
   * @param node
   * @returns {Array}
   */
  search (node) {
    let leftLinks = [];
    for (let i = (this.head.length - 1); i >= 0; i--) {
      let current = this.head[i];
      while (current !== null &&
      this.comparator(current.value, node.value) < 0) {
        leftLinks[i] = current;
        current = current.next[i];
      }
    }
    return leftLinks;
  }

  /**
   * Returns the string that shows all the levels of the SkipList making it
   * a bit easier to debug it. Apart from debugger (of course!!)
   * @returns {string}
   */
  printLevels (showField) {
    let outputString = '';
    for (let i = (this.head.length - 1); i >= 0; i--) {
      let current = this.head[i];
      outputString += '\nlevel ' + (i + 1) + '\n';
      while (current !== null) {
        if(showField){
          outputString += (' -> ' + current.value[showField]);
        } else {
          outputString += (' -> ' + current.value);
        }

        current = current.next[i];
      }
    }

    return outputString;
  }

}
