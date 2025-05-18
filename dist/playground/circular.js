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
    unshift(data) {
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
    push(data) {
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
    // remove the first item from the list
    shift() {
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
    // remove last item
    pop() {
        if (!this.head)
            return;
        if (this.head.next === this.head) {
            this.head = null;
            return;
        }
        let last = this.head;
        let secondLast = null;
        while (last.next !== this.head) {
            if (!last.next)
                throw new Error("invalid node");
            if (last.next.next === this.head)
                secondLast = last.next;
            last = last.next;
        }
        if (!secondLast)
            throw new Error("invalid list");
        last.next = null;
        secondLast.next = this.head;
    }
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
    get(idx) {
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
    size() {
        if (!this.head)
            return 0;
        if (!this.head.next)
            throw new Error("invalid list");
        let count = 1;
        let current = this.head.next;
        while (current !== this.head) {
            if (!current.next)
                throw new Error("invalid list");
            current = current.next;
            count++;
        }
        return count;
    }
    insertAt(data, idx) {
        if (idx < 0)
            return false;
        if (idx === 0) {
            this.unshift(data);
            return true;
        }
        if (!this.head) {
            if (idx === 0) {
                this.unshift(data);
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
            this.push(data);
            return true;
        }
        return false;
    }
    removeAt(idx) {
        if (!this.head || idx < 0)
            return false;
        if (idx === 0) {
            this.shift();
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
    remove(data) {
        if (!this.head)
            return false;
        if (this.head.data === data) {
            this.shift();
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
exports.CircularLinkedList = CircularLinkedList;
