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
    // ======= MAIN OPERATIONS =======
    // adds a new node to the beginning of the list
    prepend(data) {
        let newNode = new N(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            let prevHead = this.head;
            newNode.next = prevHead;
            prevHead.prev = newNode;
            this.head = newNode;
        }
        this.len++;
    }
    // adds a new node to the end of the list
    append(data) {
        let newNode = new N(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.len++;
    }
    // removes the first node in the list.
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
            this.head.prev = null;
            removedItem.next = null;
        }
        this.len--;
        return removedItem.data;
    }
    // removes the last node in the list
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
            this.tail.next = null;
            removedItem.prev = null;
        }
        this.len--;
        return removedItem.data;
    }
    // removes the first node with the specified data from the list.
    delete(data) {
        let current = this.head;
        let idx = 0;
        while (current) {
            if (current.data === data) {
                this.removeAt(idx);
                return true;
            }
            current = current.next;
            idx++;
        }
        return false;
    }
    // retrieves the node at the specified index
    find(idx) {
        if (idx < 0 || idx >= this.len)
            return null;
        let current = this.head;
        if (idx <= this.len / 2) {
            current = this.head;
            for (let i = 0; i < idx; i++) {
                current = current.next;
            }
        }
        else {
            current = this.tail;
            for (let i = this.len - 1; i > idx; i--) {
                current = current?.prev ?? null;
            }
        }
        return current;
    }
    // ======= BONUS OPERATIONS =======
    // inserts a new node at the given index
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
        newNode.prev = current?.prev ?? null;
        current.prev.next = newNode;
        current.prev = newNode;
        this.len++;
        return true;
    }
    // removes the node at the specified index
    removeAt(idx) {
        if (idx < 0 || idx >= this.len)
            return null;
        if (idx === 0)
            return this.deleteHead();
        if (idx === this.len - 1)
            return this.deleteTail();
        let current = this.find(idx);
        if (!current)
            return null;
        current.next.prev = current.prev;
        current.prev.next = current.next;
        current.next = null;
        current.prev = null;
        this.len--;
        return current.data;
    }
    // traverses the list and returns an array of the data in the specified direction.
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
    // reverses the doubly linked list in place
    reverse() {
        if (this.len <= 1)
            return;
        let current = this.head;
        let temp = null;
        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        temp = this.head;
        this.head = this.tail;
        this.tail = temp;
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
