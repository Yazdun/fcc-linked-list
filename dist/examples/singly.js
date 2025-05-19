"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglyLinkedList = void 0;
/** Node for singly linked list */
class N {
    /** Creates a node with given value */
    constructor(value) {
        /** Next node reference */
        this.next = null;
        this.value = value;
    }
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
    prepend(val) {
        const newNode = new N(val);
        newNode.next = this.head;
        this.head = newNode;
    }
    /** Adds node to list end */
    append(val) {
        const newNode = new N(val);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    /** Removes head node */
    deleteHead() {
        if (this.head) {
            this.head = this.head.next;
        }
    }
    /** Removes tail node */
    deleteTail() {
        if (!this.head)
            return;
        if (!this.head.next) {
            this.head = null;
            return;
        }
        let current = this.head;
        while (current.next && current.next.next) {
            current = current.next;
        }
        current.next = null;
    }
    /** Removes first node with given value */
    delete(val) {
        if (!this.head)
            return;
        if (this.head.value === val) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.value === val) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }
    /** Finds node with given value */
    find(val) {
        if (!this.head)
            return null;
        let current = this.head;
        while (current) {
            if (current.value === val)
                return current;
            current = current.next;
        }
        return null;
    }
    /** Logs all node values */
    traverse() {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
    // ┌────────────────────────────┐
    // │ BONUS OPERATIONS
    // └────────────────────────────┘
    /** Inserts node at given position */
    insertAt(pos, val) {
        const newNode = new N(val);
        let current = this.head;
        if (pos < 0)
            throw new Error("failed");
        if (pos === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        let idx = 0;
        while (current && idx < pos - 1) {
            current = current.next;
            idx++;
        }
        if (!current)
            throw new Error("failed");
        newNode.next = current.next;
        current.next = newNode;
    }
    /** Removes node at given position */
    deleteAt(pos) {
        let current = this.head;
        let idx = 0;
        if (pos === 0) {
            this.head = current?.next ?? null;
        }
        while (current && idx < pos - 1) {
            current = current.next;
            idx++;
        }
        if (current && current.next) {
            current.next = current.next.next;
        }
    }
    /** Finds middle node */
    findMiddle() {
        let slow = this.head;
        let fast = this.head;
        while (fast && fast.next?.next) {
            slow = slow?.next ?? null;
            fast = fast.next.next;
        }
        return slow;
    }
    /** Reverses list in place */
    reverse() {
        let current = this.head;
        let following = this.head;
        let prev = null;
        while (current) {
            following = following?.next;
            current.next = prev;
            prev = current;
            current = following;
        }
        this.head = prev;
    }
}
exports.SinglyLinkedList = SinglyLinkedList;
