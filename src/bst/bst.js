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
    let nodeToRemove = this.find(node);
    if (nodeToRemove) { // Check if node is in the tree
      if (nodeToRemove.right === null) { // Check if the node has a no right child
        if (!nodeToRemove.parent) {
          this.root = nodeToRemove.left;
          this.root.parent = null;
        } else {
          if (nodeToRemove === nodeToRemove.parent.left) {
            nodeToRemove.parent.left = nodeToRemove.left;
          } else {
            nodeToRemove.parent.right = nodeToRemove.left;
          }
          if (nodeToRemove.left) {
            nodeToRemove.left.parent = nodeToRemove.parent;
          }
        }
      }

      else if (nodeToRemove.right.left === null) { // Check if the node's right child has no left child
        if (!nodeToRemove.parent) {
          nodeToRemove.right.left = nodeToRemove.left;
          this.root.left.parent = nodeToRemove.right;
          this.root = nodeToRemove.right;
          this.root.parent = null;
        } else {
          if (nodeToRemove === nodeToRemove.parent.left) {
            nodeToRemove.parent.left = nodeToRemove.right;
          } else {
            nodeToRemove.parent.right = nodeToRemove.right;
          }
          nodeToRemove.right.parent = nodeToRemove.parent;
          nodeToRemove.right.left = nodeToRemove.left;
          nodeToRemove.left.parent = nodeToRemove.right;
        }
      }

      else { // Every other case
        if (!nodeToRemove.parent) {

        } else {
          let current = nodeToRemove.right;
          while (current.left !== null) {
            current = current.left;
          }
          let parent = current.parent;
          if (nodeToRemove === nodeToRemove.parent.left) {
            nodeToRemove.parent.left = current;
          } else {
            nodeToRemove.parent.right = current;
          }
          current.parent = nodeToRemove.parent;
          parent.left = current.right;
          current.left = nodeToRemove.left;
          current.right = nodeToRemove.right;
        }
        return true;
      }
    }
    else {
      return false;
    }
  }

  _findSuccessor (node) {
    let current = node;
    if (current.right !== null) {
      current = current.right;
      while (current.left !== null) {
        current = current.left;
      }
      return current;
    } else {
      while (current !== current.parent.left) {
        current = current.parent;
      }
      return current.parent;
    }
  }
}