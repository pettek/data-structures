'use strict';

import { Node } from './node';

export class List {
  /**
   * @constructor Represents a list.
   * @param comparator - optional parameter: a callback with 2 parameters
   *                      that governs the order of nodes; default order is ascending
   *                      without any conversion
   */
  constructor (comparator) {
    this.root = null;
    this.comparator = comparator || function (a, b) {
      return (a > b);
    };
  }

  /**
   * Checks if toAdd is of Node type. If not, call the Node constructor.
   * @param {*} toAdd
   * @returns {Node}
   */
  static checkNode (toAdd) {
    return (toAdd instanceof Node) ? toAdd : new Node(toAdd);
  }

  /**
   * Adds a new Node to a List
   * @param {*} toAdd
   * @returns {List}
   */
  add (toAdd) {
    let node = List.checkNode(toAdd);

    // If list is empty, new Node becomes a root
    if (this.root === null) {
      this.root = node;
      return this;
    }
    // Check if root element must be replaced
    if (this.comparator(this.root.value, node.value)) {
      node.next = this.root;
      this.root = node;
      return this;
    }

    let current = this.root;

    // Traverse through the list and find the appropriate place for new element
    while (current.next !== null) {
      if (this.comparator(current.next.value, node.value)) {
        break;
      }
      current = current.next;
    }
    node.next = current.next;
    current.next = node;

    return this;
  }

  /**
   * Removes a Node from a List
   * Returns true on success or false otherwise
   *
   * @param {*} toRemove
   * @returns {List}
   */
  remove (toRemove) {

    // Return false (removal not successful) if list is empty
    if (this.root === null) {
      return this;
    }
    let node = List.checkNode(toRemove);

    // Check if the root element is the one to be removed
    if (this.root.value === node.value) {
      this.root = this.root.next;
      return this;
    }

    let previous = this.root;
    let current = this.root.next;

    // Traverse through the list and check if there is an element that matches the one to be removed
    while (current !== null) {

      // If the match is found make a connection between previous and next element effectively removing the
      // current one
      if (current.value === node.value) {
        previous.next = current.next;
      }
      previous = previous.next;
      current = current.next;
    }

    return this;
  }

  /**
   * Finds a Node that has the same value as provided
   * @param {*} toFind
   * @returns {Node | null}
   */
  find (toFind) {
    let node = List.checkNode(toFind);
    let current = this.root;

    // Traverse through the list (including the root element)
    while (current !== null) {

      // On match return the current element
      if (current.value === node.value) {
        return current;
      }
      current = current.next;
    }

    // If the function has not returned so far, there is no matching element
    return null;
  }

  /**
   * Returns array representation of a List
   * @returns {Array}
   */
  toArray () {
    let array = [];
    if (this.root === null) {
      return array;
    } // If list is empty, return an empty array

    let current = this.root;

    // Push into array every element of the list
    while (current !== null) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }

  /**
   * Return string containing Nodes of a List
   * @returns {string}
   */
  toString () {

    // Make use of toArray method and join array elements with whitespace
    return this.toArray().join(" ");
  }
}
