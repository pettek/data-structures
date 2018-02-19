import { Node }     from './node';
import { DEFAULT_ARGS } from './bst-constants';

export class BST {

  /**
   *
   * @param comparator
   */
  constructor ({comparator} = DEFAULT_ARGS) {
    this.compare = comparator;
    this.root = null;
  }

  /**
   *
   * @param node
   */
  add (node) {

  }

  /**
   * Balances the tree
   */
  balance () {}

  /**
   *
   * @param node
   */
  find (node) {}

  /**
   *
   * @param node
   */
  remove (node) {}

  /**
   *
   * @param node
   * @private
   */
  _findSuccessor (node) {}

  /**
   *
   * @param node
   * @private
   */
  _findPredecessor (node) {}

  /**
   * @return {array}
   */
  toArray () {}

  /**
   * @return {string}
   */
  toString () {}
}