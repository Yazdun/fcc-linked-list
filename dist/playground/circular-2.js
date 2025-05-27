"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularDoublyLinkedList = exports.N = void 0;
/** Node for circular doubly linked list */
class N {
}
exports.N = N;
/** Circular doubly linked list implementation */
class CircularDoublyLinkedList {
    /** Creates an empty list */
    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }
    /** Adds node to list end */
    append(data) { }
    /** Removes and returns tail node data */
    deleteTail() {
        return null;
    }
    /** Adds node to list start */
    prepend(data) { }
    /** Removes and returns head node data */
    deleteHead() {
        return null;
    }
    /** Finds node at given index */
    find(idx) {
        return null;
    }
    /** Removes first node with given data */
    delete(data) {
        return false;
    }
    /** Returns array of node data */
    traverse() {
        return [];
    }
    /** Inserts node at given index */
    insertAt(idx, data) {
        return false;
    }
}
exports.CircularDoublyLinkedList = CircularDoublyLinkedList;
