import { Node }         from './node';
import { DEFAULT_ARGS } from './bst-constants';

const SORT_METHOD_ASC = 'asc';

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
    node = (node instanceof Node) ? node : new Node(node);

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
        } else if (this.compare(current.value, node.value) < 0) { // Node's value is higher than current one's

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
    node = (node instanceof Node) ? node : new Node(node);
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
   * Balances the tree using balancer object
   *
   * @param {*} balancer
   */
  balance (balancer) {
    this.root = balancer.run(this.root);
  }

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
      if (nodeToRemove.haveNoChildren) {
        let parent = nodeToRemove.parent;
        if(parent === null){
          this.root = null;
        }else if (parent.left &&  this.compare(parent.left.value,nodeToRemove.value) === 0) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
      else if (nodeToRemove.haveTwoChildren) {
        let rightMin = BST._findMin(nodeToRemove.right);//Find min in right subtree
        nodeToRemove.value = rightMin.value;

        //Now we need to delete right min from right subtree
        //Check if the node have child and define which one
        if (rightMin.right === null && rightMin.left === null) {
          let parent = rightMin.parent;
          if(parent === null){
            this.root = null;
          }else if (parent.left!==null &&  this.compare(parent.left.value,rightMin.value) === 0) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        } else {
          let parent = rightMin.parent;
          const child = rightMin.left || rightMin.right;
          if (parent === null) {
            this.root = child;

          }
          //if left child is not null child will be equal to left child if is null - to right child of node
          else if (parent.left !== null &&
            this.compare(parent.left.value, rightMin.value) === 0) {
            parent.left = child;
            child.parent = parent;
          } else {
            parent.right = child;
            child.parent = parent;
          }
        }
      }
      else {
        let parent = nodeToRemove.parent;
        const child = nodeToRemove.left || nodeToRemove.right;
        if(parent === null){
          this.root = child;
          this.root.parent = null;

        }
        //if left child is not null child will be equal to left child if is null - to right child of node
        else if (parent.left !== null && this.compare(parent.left.value,nodeToRemove.value) === 0) {
          parent.left = child;
          child.parent = parent;
        } else {
          parent.right = child;
          child.parent = parent;
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
  static _findSuccessor (node) {
    let current = node;

    /*
     * If the node has a right child, the successor must be in the right
     * sub-tree
     */
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
  static _findPredecessor (node) {
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
   * @param {Node} current
   * @returns {Node | null}
   * @private
   */
  static _findMin (current) {

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
   * @param {Node} current
   * @returns {Node | null}
   * @private
   */
  static _findMax (current) {

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
  toArray (sort = SORT_METHOD_ASC) {
    const findMethod = (sort === SORT_METHOD_ASC)
      ? BST._findSuccessor
      : BST._findPredecessor;

    // Start from the minimal value
    let current = (sort === SORT_METHOD_ASC)
      ? BST._findMin(this.root)
      : BST._findMax(this.root);

    let array = [];

    // Loop for as long as there is a successor
    while (current !== null) {
      array.push(current.value);
      current = findMethod(current); // Go to the next value
    }
    return array;
  }

  /**
   * Returns a string with the sorted data (in ascending order) with whitespaces
   * in between, disregarding the internal structure of the tree
   * @returns {string}
   */
  toString () {
    let current = BST._findMin(this.root); // Start from the minimal value
    let string = '';

    // Loop for as long as there is a successor
    while (current !== null) {
      string += (current.value + ' ');
      current = BST._findSuccessor(current);
    }
    return string;
  }
}