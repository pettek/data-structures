/**
 * Implementation of DSW algorithm
 */
export class DSWBalancer {
  /**
   * Runs the algorithm
   *
   * @param {Node} node
   * @returns {Node} a root node
   */
  run (node) {
    let current = node;

    /*
     * Creates a list by rotating right every element in the tree that does have
     * a left child
     */
    while (current.left !== null || current.right !== null) {
      if (current.left) {
        current = DSWBalancer._rotateRight(current);
      } else {
        current = current.right;
      }
    }

    /*
     * After rotating the tree, we are at the far-right end of the tree and we
     * need to go back to the root. Counting steps allows us to determine the
     * size of the tree that is later needed to count how many left-rotations
     * we need
     */
    let elements = 0;

    while (current.parent) {
      current = current.parent;
      elements++;
    }

    /*
     * Calculating how many nodes will be at the lowest level of the tree
     */
    let levels = Math.floor(Math.log2(elements + 1));
    let bottomNodes = elements + 1 - (2 ** (levels));
    console.log(bottomNodes);

    /*
     * Rotate at every odd node starting from the root as many times as there
     * nodes at the bottom level
     */
    for (let i = 0; i < bottomNodes; i++) {
      current = DSWBalancer._rotateLeft(current);
      current = current.right;
    }

    // Go to the root back again
    while (current.parent) {
      current = current.parent;
    }

    let m = 2 ** (levels) - 1;

    /*
     * Loop j times through the tree and perform m left-rotations in the process
     * on every second element starting from root every time
     */
    for (let j = 0; j < levels - 1; j++) {
      m = Math.floor(m / 2);

      // Go back to the root
      while (current.parent) {
        current = current.parent;
      }

      for (let k = 0; k < m; k++) {
        current = DSWBalancer._rotateLeft(current);

        // Skip the even node, so we rotate only around the odd ones
        current = current.right;
      }
    }

    // Go to the root back again, so we return the root node
    while (current.parent) {
      current = current.parent;
    }

    return current;
  }

  /**
   * Performs a left-rotation around the node given as a parameter and returns
   * a new "root". It may not be indeed the root of the tree, but it is a node
   * that replaces the node given as a parameter
   * @param {Node} node
   * @returns {Node}
   * @private
   */
  static _rotateLeft (node) {
    let currentValue = node.value;

    /*
     * Store the right's child right child in the variable, because it's getting
     * overridden in the process
     */
    let nodeRightRight = (node.right) ? node.right.right : null;

    // If-statements ensure that we never try to access any property of the null
    if (node.right) {
      node.value = node.right.value;
      node.right.value = currentValue;

      node.right.right = node.right.left;
      if (node.right.right) {
        node.right.right.parent = node.right;
      }

      node.right.left = node.left;
      if (node.right.left) {
        node.right.left.parent = node.right;
      }
    }

    node.left = node.right;
    node.right = nodeRightRight;
    if (node.right) {
      node.right.parent = node;
    }

    /*
     * Return a new "root" of the rotation. If we now perform an opposite
     * rotation around this new root, we will revert the effect of this rotation
     */
    return node;
  }

  /**
   * Performs a right-rotation around the node given as a parameter and returns
   * a new "root". It may not be indeed the root of the tree, but it is a node
   * that replaces the node given as a parameter
   * @param {Node} node
   * @returns {Node}
   * @private
   */
  static _rotateRight (node) {
    let currentValue = node.value;

    /*
     * Store the left's child left child in the variable, because it's getting
     * overridden in the process
     */
    let nodeLeftLeft = (node.left) ? node.left.left : null;

    // If-statements ensure that we never try to access any property of the null
    if (node.left) {
      node.value = node.left.value;
      node.left.value = currentValue;

      node.left.left = node.left.right;
      if (node.left.left) {
        node.left.left.parent = node.left;
      }

      node.left.right = node.right;
      if (node.left.right) {
        node.left.right.parent = node.left;
      }
    }

    node.right = node.left;
    node.left = nodeLeftLeft;
    if (node.left) {
      node.left.parent = node;
    }

    /*
     * Return a new "root" of the rotation. If we now perform an opposite
     * rotation around this new root, we will revert the effect of this rotation
     */
    return node;
  }
}
