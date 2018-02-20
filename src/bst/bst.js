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
   * Adds a new node to the tree
   * @param node
   */
  add (node) {
    // If the tree is empty, provided node becomes a root element
    if (this.root === null) {
      this.root = node;
    } else {
      let current = this.root;

      // This while loop will end because of the breaks inside
      while (true) {

        // Node's value is smaller than current one's
        if (this.compare(current.value, node.value) > 0) {

          // There is no left child
          if (current.left === null) {
            current.left = node; // Make new node a left child
            break;
          }
          current = current.left; // There is a left child, go there
        } else if(this.compare(current.value, node.value) < 0){ // Node's value is higher than current one's

          // There is no right child
          if (current.right === null) {
            current.right = node; // Make new node a right child
            break;
          }
          current = current.right; // There is a right child, go there
        } else {
          return this;
        }
      }

      /*
       * New node is a child of a node stored in current variable, so make the
       * connection bi-directional
       */
      node.parent = current;

    }

    return this;
  }

  /**
   * Finds a node in the tree
   * @param node
   * @returns {*}
   */
  find (node) {
    let current = this.root; // Start from the root

    // Loop as long as we didn't hit the end of the tree
    while (current) {
      if (this.compare(current.value, node.value) > 0) {
        current = current.left; // Go left if the node's value is smaller
      } else if (this.compare(current.value, node.value) < 0) {
        current = current.right; // Go right if the node's value is bigger
      } else {
        // Neither bigger, not smaller, this means we hit a match, return it
        return current;
      }
    }

    /*
     * We did not hit the match during the search, so the element is not in the
     * tree
     */
    return null;
  }

  /**
   * Balances the tree
   */
  balance () {}

  /**
   * Removes a node from the tree
   * @todo This function looks fucking awful and it is over 100 lines long
   * @param node
   * @returns {BST}
   */
  remove (node) {
    let nodeToRemove = this.find(node);

    // Check if node is in the tree
    if (nodeToRemove) {

      // CASE 1: Node to be removed has NO right child
      if (nodeToRemove.right === null) {

        // Check if the element to remove is root
        if (nodeToRemove.isRoot) {
          this.root = nodeToRemove.left;
          if (this.root) {
            this.root.parent = null;
          }
        } else { // The element is not a root element

          /* Check whether node to be removed is a left-child or a right-child
           * of its parents and then make connection between node's parent and
           * its left child
           */
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

      // CASE 2: Node to remove has a right child that doesn't have a left child
      else if (nodeToRemove.right.left === null) {

        // Check if the element to remove is root
        if (nodeToRemove.isRoot) {
          let leftChild = this.root.left;
          this.root = nodeToRemove.right;
          this.root.left = leftChild;
          if (leftChild) {
            leftChild.parent = this.root;
          }
          this.root.parent = null;
        } else {

          /* Check whether node to be removed is a left-child or a right-child
           * of its parents and then make connection between node's parent and
           * its left child
           */
          if (nodeToRemove === nodeToRemove.parent.left) {
            nodeToRemove.parent.left = nodeToRemove.right;
          } else {
            nodeToRemove.parent.right = nodeToRemove.right;
          }

          // Make appropriate connections
          nodeToRemove.right.parent = nodeToRemove.parent;
          nodeToRemove.right.left = nodeToRemove.left;

          /*
           * If node to be removed has a left child, make a replacement its new
           * parent
           */
          if (nodeToRemove.left) {
            nodeToRemove.left.parent = nodeToRemove.right;
          }
        }
      }

      // CASE 3: Every other case...
      else {

        // Check if the element to remove is root
        if (nodeToRemove.isRoot) {
          this.root = nodeToRemove.left;
          this.root.parent = null;
        } else {

          // Find successor and its parent
          let current = this._findSuccessor(node);
          let parent = current.parent;

          /* Check whether node to be removed is a left-child or a right-child
           * of its parents and then make connection between node's parent and
           * its left child
           */
          if (nodeToRemove === nodeToRemove.parent.left) {
            nodeToRemove.parent.left = current;
          } else {
            nodeToRemove.parent.right = current;
          }

          // Make appropriate connections
          current.parent = nodeToRemove.parent;
          parent.left = current.right;
          current.left = nodeToRemove.left;
          current.right = nodeToRemove.right;
        }
      }
    }
    return this;
  }

  /**
   * Finds the successor (node of a bigger value) of the node, returns null if
   * there is no successor
   * @param node
   * @returns {*}
   * @private
   */
  _findSuccessor (node) {
    let current = node;

    // If the node has a right child, the successor must be in the right sub-tree
    if (current.right !== null) {
      current = current.right;
      // Go left until you hit the end of the tree
      while (current.left !== null) {
        current = current.left;
      }
      return current;

      /*
       * If the node does not have a right child, it might not have a successor
       * or it may be one of its parents
       */
    } else {

      /*
       * Current is a root node with no right children OR we hit the root while
       * searching -> no successor
       */
      if (current.parent === null) {
        return null;
      }

      // Check if our current element IS NOT a left child of its parent
      while (current.parent && current !== current.parent.left) {
        /*
         * If the previous condition is false, continue searching from the
         * parent
         */
        current = current.parent;
      }

      return current.parent; // Parent is a successor
    }
  }

  /**
   * Finds the predecessor (node of a smaller value) of the node, returns null
   * if there is no predecessor
   * @param node
   * @returns {*}
   * @private
   */
  _findPredecessor (node) {
    let current = node;

    // If the node has a left child, the successor must be in the left sub-tree
    if (current.left !== null) {
      current = current.left;

      // Go right until you hit the end of the tree
      while (current.right !== null) {
        current = current.right;
      }
      return current;

      /*
       * If the node does not have a left child, it might not have a successor
       * or it may be one of its parents
       */
    } else {

      /*
       * Current is a root node with no left children OR we hit the root while
       * searching -> no predecessor
       */
      if (current.parent === null) {
        return null;
      }
      // Check if our current element IS NOT a right child of its parent
      while (current.parent && current !== current.parent.right) {

        /*
         * If the previous condition is false, continue searching from the
         * parent
         */
        current = current.parent;
      }

      return current.parent; // Parent is a predecessor
    }
  }

  /**
   * Returns a node with the smallest value in the tree, if the tree if empty,
   * it returns null
   * @returns {*}
   * @private
   */
  _findMin () {
    let current = this.root; // Start from the root

    // Tree is empty -> return null
    if (current === null) {
      return null;
    }

    // Go left until you hit the end of the tree
    while (current.left !== null) {
      current = current.left;
    }

    return current;
  }

  /**
   * Returns a node with the highest value in the tree, if the tree is empty, it
   * returns null
   * @returns {*}
   * @private
   */
  _findMax () {
    let current = this.root; // Start from the root

    // Tree is empty -> return null
    if (current === null) {
      return null;
    }

    // Go right until you hit the end of the tree
    while (current.right !== null) {
      current = current.right;
    }

    return current;
  }

  /**
   * Returns an array with the sorted data (in ascending order) disregarding the
   * internal structure of the tree
   * @returns {Array}
   */
  toArray () {
    let current = this._findMin(); // Start from the minimal value
    let array = [];

    // Loop for as long as there is a successor
    while (current !== null) {
      array.push(current.value);
      current = this._findSuccessor(current); // Go to the next value
    }
    return array;
  }

  /**
   * Returns a string with the sorted data (in ascending order) with whitespaces
   * in between, disregarding the internal structure of the tree
   * @returns {string}
   */
  toString () {
    let current = this._findMin(); // Start from the minimal value
    let string = '';

    // Loop for as long as there is a successor
    while (current !== null) {
      string += (current.value + ' ');
      current = this._findSuccessor(current);
    }
    return string;
  }
}