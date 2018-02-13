import Node from './node';

export default class List {
    /**
     * Represents a List.
     * @constructor
     */
    constructor() {
        this.root = null;
    }

    /**
     * Checks if toAdd is of Node type. If not, call the Node constructor.
     * @param {*} toAdd
     * @returns {Node}
     */
    static checkNode(toAdd) {
        return (toAdd instanceof Node) ? toAdd : new Node(toAdd);
    }

    /**
     * Adds a new Node to a List
     * @param {*} toAdd
     */
    add(toAdd) {
        let node = List.checkNode(toAdd);
        if (this.root === null) {
            this.root = node;
            return;
        }
        if (this.root.value > node.value) {
            node.next = this.root;
            this.root = node;
            return;
        }

        let current = this.root;

        while (current.next !== null) {
            if (current.next.value > node.value) break;
            current = current.next;
        }
        node.next = current.next;
        current.next = node;
    }

    /**
     * Removes a Node from a List
     * Returns true on success or false otherwise
     *
     * @param {*} toRemove
     * @returns {boolean}
     */
    remove(toRemove) {
        if (this.root === null) return false;
        let node = List.checkNode(toRemove);

        if (this.root.value === node.value) {
            this.root = this.root.next;
            return true;
        }

        let previous = this.root;
        let current = this.root.next;

        while (current !== null) {
            if (current.value === node.value) {
                previous.next = current.next;
            }
            previous = previous.next;
            current = current.next;
        }
    }

    /**
     * Finds a Node that has the same value as provided
     * @param {*} toFind
     * @returns {Node | null}
     */
    find(toFind) {
        let node = List.checkNode(toFind);
        let current = this.root;

        while (current !== null) {
            if (current.value === node.value) return current;
            current = current.next;
        }

        return null;
    }

    /**
     * Returns array representation of a List
     * @returns {Array}
     */
    toArray() {
        let array = [];
        if (this.root === null) return array;

        let current = this.root;
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
    toString() {
        let string = "";
        if (this.root === null) return string;

        let current = this.root;
        while (current !== null) {
            string += current.value + ' ';
            current = current.next;
        }
        return string;
    }
}
