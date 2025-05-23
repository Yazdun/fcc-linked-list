"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglyLinkedList = void 0;
/** Node for singly linked list */
class N {
}
/** Singly linked list implementation */
class SinglyLinkedList {
    constructor() {
        /** Head node */
        this.head = null;
    }
    // ┌──────────────────────────┐
    // │ CORE OPERATIONS
    // └──────────────────────────┘
    /** Adds node to list start */
    prepend(val) { }
    /** Adds node to list end */
    append(val) { }
    /** Removes head node */
    deleteHead() { }
    /** Removes tail node */
    deleteTail() { }
    /** Removes first node with given value */
    delete(val) { }
    /** Finds node with given value */
    find(val) {
        return null;
    }
    /** Logs all node values */
    traverse() { }
    // ┌────────────────────────────┐
    // │ BONUS OPERATIONS
    // └────────────────────────────┘
    /** Inserts node at given position */
    insertAt(pos, val) { }
    /** Removes node at given position */
    deleteAt(pos) { }
    /** Finds middle node */
    findMiddle() {
        return null;
    }
    /** Reverses list in place */
    reverse() { }
}
exports.SinglyLinkedList = SinglyLinkedList;
