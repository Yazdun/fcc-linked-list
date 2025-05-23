"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularSinglyLinkedList = exports.N = void 0;
/** Node for circular singly linked list */
class N {
}
exports.N = N;
/** Circular singly linked list implementation */
class CircularSinglyLinkedList {
    constructor() {
        /** Head node */
        this.head = null;
    }
    // ┌──────────────────────────┐
    // │ CORE OPERATIONS
    // └──────────────────────────┘
    /** Adds node to list start */
    prepend(data) { }
    /** Adds node to list end */
    append(data) { }
    /** Removes head node */
    deleteHead() { }
    /** Removes tail node */
    deleteTail() {
        return false;
    }
    /** Removes first node with given data */
    delete(data) {
        return false;
    }
    /** Finds data at given index */
    find(idx) {
        return null;
    }
    /** Returns array of node data */
    traverse() {
        return [];
    }
}
exports.CircularSinglyLinkedList = CircularSinglyLinkedList;
