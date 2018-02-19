import { Node }         from './node';
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
    if (this.root === null) {
      this.root = node;
    } else {
      let current = this.root;
      while (true) {
        if (this.compare(current.value, node.value) > 0) {
          if (current.left === null) {
            current.left = node;
            break;
          }
          current = current.left;
        }
        else {
          if (current.right === null) {
            current.right = node;
            break;
          }
          current = current.right;
        }
      }
      node.parent = current;
    }
  }

  find (node) {
    let current = this.root;
    while (current) {
      if (this.compare(current.value, node.value) > 0) {
        current = current.left;
      } else if (this.compare(current.value, node.value) < 0) {
        current = current.right;
      } else {
        return current;
      }
    }
    return null;
  }

  remove (node) {
    if(this.find(node)) return true;
    else return false;
  }
}