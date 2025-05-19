"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularDoublyLinkedList = exports.N = void 0;
class N {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
exports.N = N;
class CircularDoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }
    push(data) {
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
    pop() {
        if (!this.tail)
            return null;
        let removedItem = this.tail;
        if (this.len === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.tail = removedItem.prev;
            this.tail.next = this.head;
            this.head.prev = this.tail;
        }
        this.len--;
        removedItem.next = null;
        removedItem.prev = null;
        return removedItem.data;
    }
    unshift(data) {
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
    shift() {
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
    get(idx) {
        if (idx < 0 || idx >= this.len)
            return null;
        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current.next;
        }
        return current;
    }
    insertAt(idx, data) {
        if (idx < 0 || idx > this.len)
            return false;
        if (idx === 0) {
            this.unshift(data);
            return true;
        }
        if (idx === this.len) {
            this.push(data);
            return true;
        }
        let newNode = new N(data);
        let current = this.get(idx);
        if (!current)
            return false;
        newNode.next = current;
        newNode.prev = current.prev;
        current.prev.next = newNode;
        current.prev = newNode;
        this.len++;
        return true;
    }
    removeAt(idx) {
        if (idx < 0 || idx >= this.len)
            return null;
        if (idx === 0)
            return this.shift();
        if (idx === this.len - 1)
            return this.pop();
        let current = this.get(idx);
        if (!current)
            return null;
        current.next.prev = current.prev;
        current.prev.next = current.next;
        this.len--;
        current.next = null;
        current.prev = null;
        return current.data;
    }
    remove(data) {
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
    traverse() {
        if (!this.head)
            return [];
        let current = this.head;
        const result = [];
        do {
            result.push(current.data);
            current = current.next;
        } while (current !== this.head);
        return result;
    }
}
exports.CircularDoublyLinkedList = CircularDoublyLinkedList;
