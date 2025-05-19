"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularDoublyLinkedList = exports.N = void 0;
/** Node for circular doubly linked list */
class N {
    /** Creates a node with given data */
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
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
    // ┌──────────────────────────┐
    // │ CORE OPERATIONS
    // └──────────────────────────┘
    /** Adds node to list end */
    append(data) {
        let newNode = new N(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        }
        else {
            newNode.next = this.head;
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.head.prev = newNode;
            this.tail = newNode;
        }
        this.len++;
    }
    /** Removes and returns tail node data */
    deleteTail() {
        if (!this.tail)
            return null;
        let removedItem = this.tail;
        if (this.len === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = this.head;
            this.head.prev = this.tail;
        }
        removedItem.next = null;
        removedItem.prev = null;
        this.len--;
        return removedItem.data;
    }
    /** Adds node to list start */
    prepend(data) {
        let newNode = new N(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        }
        else {
            newNode.next = this.head;
            newNode.prev = this.tail;
            this.head.prev = newNode;
            this.tail.next = newNode;
            this.head = newNode;
        }
        this.len++;
    }
    /** Removes and returns head node data */
    deleteHead() {
        if (!this.head)
            return null;
        let removedItem = this.head;
        if (this.len === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head = removedItem.next;
            this.head.prev = this.tail;
            this.tail.next = this.head;
        }
        this.len--;
        removedItem.next = null;
        removedItem.prev = null;
        return removedItem.data;
    }
    /** Finds node at given index */
    find(idx) {
        if (!this.head || idx < 0 || idx >= this.len) {
            return null;
        }
        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current.next;
        }
        return current;
    }
    /** Removes first node with given data */
    delete(data) {
        let current = this.head;
        let idx = 0;
        if (!current)
            return false;
        do {
            if (current.data === data) {
                this.removeAt(idx);
                return true;
            }
            current = current.next;
            idx++;
        } while (current !== this.head);
        return false;
    }
    // ┌────────────────────────────┐
    // │ BONUS OPERATIONS
    // └────────────────────────────┘
    /** Inserts node at given index */
    insertAt(idx, data) {
        if (idx < 0 || idx > this.len)
            return false;
        if (idx === 0) {
            this.prepend(data);
            return true;
        }
        if (idx === this.len) {
            this.append(data);
            return true;
        }
        let newNode = new N(data);
        let current = this.find(idx);
        if (!current)
            return false;
        newNode.next = current;
        newNode.prev = current.prev;
        current.prev.next = newNode;
        current.prev = newNode;
        this.len++;
        return true;
    }
    /** Removes and returns node data at given index */
    removeAt(idx) {
        if (idx < 0 || idx >= this.len || !this.head) {
            return null;
        }
        if (idx === 0)
            return this.deleteHead();
        if (idx === this.len - 1)
            return this.deleteTail();
        let current = this.find(idx);
        current.next.prev = current.prev;
        current.prev.next = current.next;
        current.next = null;
        current.prev = null;
        this.len--;
        return current.data;
    }
    /** Returns array of node data */
    traverse() {
        if (!this.head)
            return [];
        let current = this.head;
        const result = [];
        do {
            if (!current.next)
                throw new Error("invalid list");
            result.push(current.data);
            current = current.next;
        } while (current !== this.head);
        return result;
    }
}
exports.CircularDoublyLinkedList = CircularDoublyLinkedList;
