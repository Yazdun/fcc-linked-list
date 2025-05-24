"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = exports.N = void 0;
/** Node for doubly linked list */
class N {
}
exports.N = N;
/** Doubly linked list implementation */
class DoublyLinkedList {
    /** Creates an empty list */
    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }
    /** Adds node to list start */
    prepend(data) { }
    /** Adds node to list end */
    append(data) { }
    /** Removes and returns head node data */
    deleteHead() {
        return null;
    }
    /** Removes and returns tail node data */
    deleteTail() {
        return null;
    }
    /** Removes first node with given data */
    delete(data) {
        return false;
    }
    /** Finds node at given index */
    find(idx) {
        return null;
    }
    /** Returns array of node data */
    traverse(dir = "forward") {
        return [];
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
