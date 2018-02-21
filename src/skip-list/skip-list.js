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
   * Removes the SkipNode from the SkipList if there is a node that matches
   * @param nodeToRemove
   * @returns {SkipList}
   */
  remove (nodeToRemove) {
    let node = (nodeToRemove instanceof SkipNode) ? nodeToRemove : new SkipNode(
      nodeToRemove);
    let leftLinks = this.search(node);
    /*
     * It's a kind of magic
     * First, check if there is a left link of the first level and if it points
     * to the correct value. Second, check whether it is the first element after
     * head. In both those cases, return where link/head points to. Otherwise,
     * return null -> this element cannot be found in the tree.
     * All in all, it really just replaces the find method...
     */
    node = (leftLinks[0] &&
      this.comparator(leftLinks[0].next[0].value, node.value) === 0)
      ? leftLinks[0].next[0]
      : ((this.head[0] && this.comparator(this.head[0].value, node.value) === 0)
        ? this.head[0]
        : null);

    if (node) {
      // No left links => this is the first element, modify only head
      if (leftLinks.length === 0) {

        // Go through levels from 0 to node's height
        for (let i = 0; i < node.height; i++) {
          this.head[i] = node.next[i];
        }
      } else { // There are some links => modify them

        // Go through levels from 0 to node's height
        for (let j = 0; j < node.height; j++) {
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
      return node;
    } else {
      if(this.head[0] && this.head[0].value === node.value) {
        return node;
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
  search (node) {
    node = (node instanceof SkipNode) ? node : new SkipNode(node);
    let leftLinks = Array(this.maxHeight).fill(null);

    for (let i = (this.maxHeight - 1); i >= 0; i--) { // Go through levels from head's height to 0

      /*
       * current variable indicates where to start searching:
       * -> from the head if this is the first iteration or the previous one
       * returned null (head is the first ancestor)
       * -> from the previous iteration result which is the element from i-th
       * level that is smaller than node's value
       */
      let current = (i === (this.maxHeight - 1))
        ? this.head[i]
        : (leftLinks[i + 1]) ? leftLinks[i + 1] : this.head[i];
      while (current !== null &&
      this.comparator(current.value, node.value) < 0) { // First parameter is less than second parameter
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
