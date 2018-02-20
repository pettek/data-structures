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

    let leftLinks = this.search(node);
    if (leftLinks.length === 0) {

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
    let node = (nodeToRemove instanceof SkipNode) ? nodeToRemove : new SkipNode(
      nodeToRemove);
    node = this.find(node);
    console.log('+');
    if (node) {
      let leftLinks = this.search(node);
      console.log('+');
      if (leftLinks.length === 0) {

        // No left links => this is the first element, modify only head
        for (let i = 0; i < node.height; i++) { // Go through levels from 0 to node's height
          this.head[i] = node.next[i];
        }
      } else {

        // There are some links => modify them
        for (let j = 0; j < node.height; j++) { // Go through levels from 0 to node's height
          let leftLink = leftLinks[j];

          if (leftLink) {
            leftLink.next[j] = node.next[j];
          } else {
            //leftLink undefined => modify head (its value is null)
            this.head[j] = node.next[j];
          }
        }
      }
    }
    console.log('+');
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
    for (let i = (this.maxHeight - 1); i >= 0; i--) { // Go through levels from head's height to 0
      let current = this.head[i];

      while (current !== null &&
      this.comparator(current.value, node.value) < 1) { // First parameter is less than or equal to second parameter
        if (this.comparator(current.value, node.value) === 0) { // First parameter is equal to second parameter
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

    for (let i = (this.maxHeight - 1); i >= 0; i--) { // Go through levels from head's height to 0
      let current = this.head[i];
      while (current !== null && current !== node &&
      this.comparator(current.value, node.value) <= 0) { // First parameter is less than second parameter
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
