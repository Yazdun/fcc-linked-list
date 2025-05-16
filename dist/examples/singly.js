"use strict";
class N {
    constructor(value) {
        this.next = null;
        this.value = value;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }
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
    search(val) {
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
    traverse() {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
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
    findMiddle() {
        let slow = this.head;
        let fast = this.head;
        while (fast && fast.next) {
            slow = slow?.next ?? null;
            fast = fast.next.next;
        }
        return slow;
    }
}
