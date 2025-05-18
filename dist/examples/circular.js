"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularLinkedList = exports.N = void 0;
class N {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
exports.N = N;
class CircularLinkedList {
    constructor() {
        this.head = null;
    }
    // adds a new node to the beginning of the list
    unshift(data) {
        const newN = new N(data);
        if (this.head === null) {
            this.head = newN;
            newN.next = this.head;
        }
        else {
            let last = this.head;
            while (last.next !== this.head) {
                last = last.next;
            }
            newN.next = this.head;
            last.next = newN;
            this.head = newN;
        }
    }
    // inserts a new node at the end
    push(data) {
        const newN = new N(data);
        if (this.head === null) {
            this.head = newN;
            newN.next = this.head;
        }
        else {
            let last = this.head;
            while (last.next !== this.head) {
                last = last.next;
            }
            newN.next = this.head;
            last.next = newN;
        }
    }
    // removes the first node in the list
    shift() {
        if (this.head === null) {
            return;
        }
        if (this.head.next === this.head) {
            this.head = null;
            return;
        }
        const newHead = this.head.next;
        let last = this.head;
        while (last.next !== this.head) {
            last = last.next;
        }
        last.next = newHead;
        this.head = newHead;
    }
    // removes the last node
    pop() {
        if (this.head === null) {
            return;
        }
        if (this.head.next === this.head) {
            this.head = null;
            return;
        }
        let last = this.head;
        while (last.next !== this.head) {
            last = last.next;
        }
        let secondLast = this.head;
        while (secondLast.next !== last) {
            secondLast = secondLast.next;
        }
        secondLast.next = this.head;
    }
    // checks if the given data exists in the list
    search(data) {
        if (this.head === null) {
            return false;
        }
        let current = this.head;
        do {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        } while (current !== this.head);
        return false;
    }
    // gets the data at the specified index (0-based)
    get(index) {
        if (this.head === null || index < 0) {
            return null;
        }
        let current = this.head;
        let count = 0;
        do {
            if (count === index) {
                return current.data;
            }
            current = current.next;
            count++;
        } while (current !== this.head);
        return null;
    }
    // gets the size of the list
    size() {
        if (this.head === null) {
            return 0;
        }
        let count = 1;
        let current = this.head.next;
        while (current !== this.head) {
            count++;
            current = current.next;
        }
        return count;
    }
    // inserts a new node at the specified index (0-based)
    insertAt(data, index) {
        if (index < 0) {
            return;
        }
        if (index === 0 || !this.head) {
            this.unshift(data);
            return;
        }
        let current = this.head;
        let prev = null;
        let count = 0;
        do {
            if (count === index) {
                const newN = new N(data);
                newN.next = current;
                prev.next = newN;
                return;
            }
            prev = current;
            current = current.next;
            count++;
        } while (current !== this.head);
        if (count === index) {
            this.push(data);
        }
    }
    // removes the node at the specified index (0-based)
    removeAt(index) {
        if (this.head === null || index < 0) {
            return;
        }
        if (index === 0) {
            this.shift();
            return;
        }
        let current = this.head;
        let prev = null;
        let count = 0;
        do {
            if (count === index) {
                prev.next = current.next;
                return;
            }
            prev = current;
            current = current.next;
            count++;
        } while (current !== this.head);
    }
    // removes the first occurrence of the given data
    remove(data) {
        if (this.head === null) {
            return;
        }
        if (this.head.data === data) {
            this.shift();
            return;
        }
        let current = this.head;
        let prev = null;
        do {
            if (current.data === data) {
                prev.next = current.next;
                return;
            }
            prev = current;
            current = current.next;
        } while (current !== this.head);
    }
    // traverses the list and returns elements
    traverse() {
        if (this.head === null) {
            return [];
        }
        const result = [];
        let current = this.head;
        do {
            result.push(current.data);
            current = current.next;
        } while (current !== this.head);
        return result;
    }
}
exports.CircularLinkedList = CircularLinkedList;
