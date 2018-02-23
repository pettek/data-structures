'use strict';

import { SkipNode }     from './skip-node';
import { DEFAULT_ARGS } from './skip-list-constants';

export class SkipList {
  /**
   *
   * @param comparator
   * @param generator
   * @param height
   */
  constructor ({
                 comparator = DEFAULT_ARGS.comparator,
                 generator = DEFAULT_ARGS.generator,
                 height = DEFAULT_ARGS.height,
               } = {}) {
    this.comparator = comparator;
    this.generateHeight = generator;
    this.maxHeight = height;
    this.head = Array(this.maxHeight).fill(null);
  }

  /**
   * Adds new SkipNode to the SkipList
   * @param {*} node
   * @returns {SkipList}
   */
  add (node) {
    // If node provided is not an instance of SkipNode, call the SkipNode ctor
    node = (node instanceof SkipNode) ? node : new SkipNode(node);
    // Pick a random height
    node.height = this.generateHeight(this.maxHeight);
    node.next = Array(node.height).fill(null);

    let leftLinks = this.search(node.value);
    if (leftLinks.every(function (v) { return v === null; })) {

      // No left links => this is the first element, modify only head
      for (let i = 0; i < node.height; i++) { // Go through levels from 0 to node's height
        let previousHead = this.head[i];
        this.head[i] = node;
        node.next[i] = previousHead;
      }

      return this;
    }

    // There are some links => modify them
    for (let i = 0; i < node.height; i++) { // Go through levels from 0 to node's height
      let leftLink = leftLinks[i];

      if (leftLink) {
        //leftLink is NOT undefined => it does not point to NULL => modify it
        let previous = leftLink.next[i];
        leftLinks[i].next[i] = node;
        node.next[i] = previous;
      } else {
        this.head[i] = node;
      }
    }

    return this;
  }

  /**
   *
   * @param value
   * @returns {SkipList}
   */

  remove (value) {
    let leftLinks = this.search(value);
    let node;
    if (leftLinks[0] && leftLinks[0].next &&
      leftLinks[0].next[0].value === value) {
      node = leftLinks[0].next[0];
    } else {
      if (this.head && this.head[0].value === value) {
        node = this.head[0];
      }
    }

    if (node) {
      for (let i = 0; i < node.next.length; i++) {
        if (leftLinks[i]) {
          leftLinks[i].next[i] = node.next[i];
        } else {
          this.head[i] = node.next[i];
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
    node = (node instanceof SkipNode) ? node : new SkipNode(node);

    let leftLinks = this.search(node);
    if (leftLinks[0] && leftLinks[0].next[0] &&
      this.comparator(leftLinks[0].next[0].value, node.value) === 0) {
      return node.value;
    } else {
      if (this.head[0] && this.head[0].value === node.value) {
        return node.value;
      } else {
        return null;
      }
    }
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
  search (value) {
    let level = this.maxHeight - 1;
    let current = this.head;
    let path = Array(this.maxHeight).fill(null);

    while (level >= 0) {
      let currentValue = (current === null)
        ? null
        : (Array.isArray(current))
          ? current[level]
          : current.next[level];
      while (currentValue !== null &&
      this.comparator(currentValue.value, value) < 0) {
        for (let i = level; i >= 0; i--) {
          path[i] = currentValue;
        }
        currentValue = currentValue.next[level];
        current = currentValue;
      }
      level--;
    }

    return path;
  }

  /**
   * Returns the string that shows all the levels of the SkipList making it
   * a bit easier to debug it. Apart from debugger (of course!!)
   * @returns {string}
   */
  printLevels (showField) {
    let outputString = '';

    for (let i = (this.maxHeight - 1); i >= 0; i--) { // Go through levels from head's height to 0
      let current = this.head[i];
      outputString += '\nlevel ' + (i + 1) + '\n';

      while (current !== null) {
        if (showField) {
          outputString += (' -> ' + current.value[showField]);
        } else {
          outputString += (' -> ' + current.value);
        }
        current = current.next[i];
      }
    }

    return outputString;
  }

  /**
   * Returns an array representing the data
   * @returns {Array}
   */
  toArray (field) {
    let current = this.head[0];
    let array = [];
    while (current !== null) {
      if (field) {
        array.push(current.value[field]);
      } else {
        array.push(current.value);
      }
      current = current.next[0];
    }
    return array;
  }

  /**
   * Returns a string representing the data
   * @returns {string}
   */
  toString (field) {
    let current = this.head[0];
    let string = '';
    while (current !== null) {
      if (field) {
        string += current.value[field];
      } else {
        string += current.value;
      }
      string += ' ';
      current = current.next[0];
    }
    return string;
  }
}
