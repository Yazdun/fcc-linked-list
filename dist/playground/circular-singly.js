"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularSinglyLinkedList = exports.N = void 0;
/** Node for circular singly linked list */
class N {
    /** Creates a node with given data */
    constructor(data) {
        this.data = data;
        this.next = null;
    }
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
    prepend(data) {
        let newNode = new N(data);
        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
        }
        else {
            let last = this.head;
            while (last.next !== this.head) {
                if (!last.next)
                    throw new Error("invalid list");
                last = last.next;
            }
            last.next = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
    }
    /** Adds node to list end */
    append(data) {
        let newNode = new N(data);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
        }
        else {
            let last = this.head;
            while (last.next !== this.head) {
                if (!last.next)
                    throw new Error("invalid list");
                last = last.next;
            }
            last.next = newNode;
            newNode.next = this.head;
        }
    }
    /** Removes head node */
    deleteHead() {
        if (!this.head)
            return;
        if (this.head.next === this.head) {
            this.head = null;
            return;
        }
        let last = this.head;
        while (last.next !== this.head) {
            if (!last.next)
                throw new Error("invalid list");
            last = last.next;
        }
        let newHead = this.head.next;
        last.next = newHead;
        this.head = newHead;
    }
    /** Removes tail node */
    deleteTail() {
        if (!this.head)
            return false;
        if (this.head.next === this.head) {
            this.head = null;
            return true;
        }
        let current = this.head;
        let prev = null;
        while (current.next !== this.head) {
            prev = current;
            current = current.next;
        }
        prev.next = this.head;
        return true;
    }
    /** Removes first node with given data */
    delete(data) {
        if (!this.head)
            return false;
        if (this.head.data === data) {
            this.deleteHead();
            return true;
        }
        let current = this.head;
        let prev = null;
        do {
            if (current.data === data) {
                prev.next = current.next;
                return true;
            }
            prev = current;
            current = current.next;
        } while (current !== this.head);
        return false;
    }
    /** Finds data at given index */
    find(idx) {
        if (!this.head || idx < 0)
            return null;
        let current = this.head;
        let count = 0;
        do {
            if (!current.next)
                throw new Error("invalid list");
            if (count === idx) {
                return current.data;
            }
            count++;
            current = current.next;
        } while (current !== this.head);
        return null;
    }
    // ┌────────────────────────────┐
    // │ BONUS OPERATIONS
    // └────────────────────────────┘
    /** Searches for node with given data */
    search(data) {
        if (!this.head)
            return false;
        let current = this.head;
        do {
            if (!current.next)
                throw new Error("invalid list");
            if (current.data === data) {
                return true;
            }
            current = current.next;
        } while (current !== this.head);
        return false;
    }
    /** Returns number of nodes */
    size() {
        if (!this.head)
            return 0;
        let count = 1;
        let current = this.head.next;
        while (current !== this.head) {
            if (!current?.next)
                throw new Error("invalid list");
            count++;
            current = current.next;
        }
        return count;
    }
    /** Inserts node at given index */
    insertAt(data, idx) {
        if (idx < 0)
            return false;
        if (idx === 0) {
            this.prepend(data);
            return true;
        }
        if (!this.head) {
            if (idx === 0) {
                this.prepend(data);
                return true;
            }
            return false;
        }
        let current = this.head;
        let prev = null;
        let count = 0;
        do {
            if (count === idx) {
                const newN = new N(data);
                newN.next = current;
                prev.next = newN;
                return true;
            }
            prev = current;
            current = current.next;
            count++;
        } while (current !== this.head);
        if (count === idx) {
            this.append(data);
            return true;
        }
        return false;
    }
    /** Removes node at given index */
    deleteAt(idx) {
        if (!this.head || idx < 0)
            return false;
        if (idx === 0) {
            this.deleteHead();
            return true;
        }
        let current = this.head;
        let prev = null;
        let count = 0;
        do {
            if (count === idx) {
                prev.next = current.next;
                return true;
            }
            prev = current;
            current = current.next;
            count++;
        } while (current !== this.head);
        return false;
    }
    /** Returns array of node data */
    traverse() {
        if (!this.head)
            return [];
        const result = [];
        let current = this.head;
        do {
            result.push(current.data);
            current = current.next;
        } while (current !== this.head);
        return result;
    }
}
exports.CircularSinglyLinkedList = CircularSinglyLinkedList;
