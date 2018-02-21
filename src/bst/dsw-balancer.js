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
        current = this._rotateRight(current);
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
    let bottomNodes = elements + 1 -
      (2 ** (Math.floor(Math.log2(elements + 1))));
    console.log(bottomNodes);

    /*
     * Rotate at every odd node starting from the root as many times as there
     * nodes at the bottom level
     */
    for (let i = 0; i < bottomNodes; i++) {
      current = this._rotateLeft(current);
      current = current.right;
    }

    // Go to the root back again
    while (current.parent) {
      current = current.parent;
    }


    let m = 2 ** (Math.floor(Math.log2(elements + 1))) - 1;

    // Loop j times through the tree and perform m left-rotations in the process
    for (let j = 0; j < Math.floor(Math.log2(elements + 1)) - 1; j++) {
      m = Math.floor(m / 2);
      while (current.parent) {
        current = current.parent;
      }

      for (let k = 0; k < m; k++) {
        current = this._rotateLeft(current);
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
   * Performs left rotation
   *
   * @param {Node} node
   * @private
   */
  _rotateLeft (node) {
    let currentValue = node.value;
    let currentParent = node.parent;
    let nodeRightRight = (node.right) ? node.right.right : null;
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
    node.parent = currentParent;

    return node;
  }

  /**
   * Performs right rotation
   *
   * @param {Node} node
   * @private
   */
  _rotateRight (node) {
    let currentValue = node.value;
    let currentParent = node.parent;
    let nodeLeftLeft = (node.left) ? node.left.left : null;
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
    node.parent = currentParent;

    return node;
  }
}
