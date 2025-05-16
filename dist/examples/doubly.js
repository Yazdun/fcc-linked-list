"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = exports.N = void 0;
class N {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
exports.N = N;
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }
    // Add to the end - O(1)
    push(data) {
        const newN = new N(data);
        if (!this.head) {
            this.head = newN;
            this.tail = newN;
        }
        else {
            this.tail.next = newN;
            newN.prev = this.tail;
            this.tail = newN;
        }
        this.len++;
    }
    // Remove from the end - O(1)
    pop() {
        if (!this.tail)
            return null;
        const removed = this.tail;
        if (this.len === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            removed.prev = null;
        }
        this.len--;
        return removed.data;
    }
    // Add to the beginning - O(1)
    unshift(data) {
        const newN = new N(data);
        if (!this.head) {
            this.head = newN;
            this.tail = newN;
        }
        else {
            newN.next = this.head;
            this.head.prev = newN;
            this.head = newN;
        }
        this.len++;
    }
    // Remove from the beginning - O(1)
    shift() {
        if (!this.head)
            return null;
        const removed = this.head;
        if (this.len === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head = this.head.next;
            this.head.prev = null;
            removed.next = null;
        }
        this.len--;
        return removed.data;
    }
    // Get data at index, optimized - O(n/2)
    get(index) {
        if (index < 0 || index >= this.len)
            return null;
        let current;
        if (index <= this.len / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        }
        else {
            current = this.tail;
            for (let i = this.len - 1; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    }
    // Insert at index - O(n)
    insertAt(index, data) {
        if (index < 0 || index > this.len)
            return false;
        if (index === 0) {
            this.unshift(data);
            return true;
        }
        if (index === this.len) {
            this.push(data);
            return true;
        }
        const newN = new N(data);
        const current = this.get(index);
        if (!current)
            return false;
        newN.next = current;
        newN.prev = current.prev;
        current.prev.next = newN;
        current.prev = newN;
        this.len++;
        return true;
    }
    // Remove at index - O(n)
    removeAt(index) {
        if (index < 0 || index >= this.len)
            return null;
        if (index === 0)
            return this.shift();
        if (index === this.len - 1)
            return this.pop();
        const current = this.get(index);
        if (!current)
            return null;
        current.prev.next = current.next;
        current.next.prev = current.prev;
        current.next = null;
        current.prev = null;
        this.len--;
        return current.data;
    }
    traverse(dir = "forward") {
        const isForward = dir === "forward";
        let current = isForward ? this.head : this.tail;
        const result = [];
        while (current) {
            result.push(current.data);
            current = isForward ? current.next : current.prev;
        }
        return result;
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
