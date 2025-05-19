"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doubly_1 = require("../doubly");
describe("DoublyLinkedList", () => {
    let list;
    beforeEach(() => {
        list = new doubly_1.DoublyLinkedList();
    });
    describe("push", () => {
        it("should add a node to an empty list", () => {
            list.append(1);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(1);
            expect(list.head.next).toBeNull();
            expect(list.head.prev).toBeNull();
            expect(list.len).toBe(1);
        });
        it("should add multiple nodes to the end", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.traverse()).toEqual([1, 2, 3]);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(3);
            expect(list.head.next.data).toBe(2);
            expect(list.tail.prev.data).toBe(2);
            expect(list.len).toBe(3);
        });
    });
    describe("pop", () => {
        it("should return null when popping an empty list", () => {
            expect(list.deleteTail()).toBeNull();
            expect(list.len).toBe(0);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });
        it("should remove and return the only node in a single-node list", () => {
            list.append(1);
            expect(list.deleteTail()).toBe(1);
            expect(list.len).toBe(0);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });
        it("should remove and return the last node in a multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.deleteTail()).toBe(3);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.tail.data).toBe(2);
            expect(list.tail.next).toBeNull();
            expect(list.tail.prev.data).toBe(1);
            expect(list.len).toBe(2);
        });
    });
    describe("unshift", () => {
        it("should add a node to an empty list", () => {
            list.prepend(1);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(1);
            expect(list.head.next).toBeNull();
            expect(list.head.prev).toBeNull();
            expect(list.len).toBe(1);
        });
        it("should add multiple nodes to the beginning", () => {
            list.prepend(3);
            list.prepend(2);
            list.prepend(1);
            expect(list.traverse()).toEqual([1, 2, 3]);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(3);
            expect(list.head.next.data).toBe(2);
            expect(list.tail.prev.data).toBe(2);
            expect(list.len).toBe(3);
        });
    });
    describe("shift", () => {
        it("should return null when shifting an empty list", () => {
            expect(list.deleteHead()).toBeNull();
            expect(list.len).toBe(0);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });
        it("should remove and return the only node in a single-node list", () => {
            list.append(1);
            expect(list.deleteHead()).toBe(1);
            expect(list.len).toBe(0);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });
        it("should remove and return the first node in a multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.deleteHead()).toBe(1);
            expect(list.traverse()).toEqual([2, 3]);
            expect(list.head.data).toBe(2);
            expect(list.head.prev).toBeNull();
            expect(list.head.next.data).toBe(3);
            expect(list.len).toBe(2);
        });
    });
    describe("get", () => {
        it("should return null for an empty list", () => {
            expect(list.find(0)).toBeNull();
        });
        it("should return null for negative index", () => {
            list.append(1);
            expect(list.find(-1)).toBeNull();
        });
        it("should return null for index >= length", () => {
            list.append(1);
            list.append(2);
            expect(list.find(2)).toBeNull();
        });
        it("should return the correct node from the head side (index <= len/2)", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            const node = list.find(1);
            expect(node.data).toBe(2);
            expect(node.prev.data).toBe(1);
            expect(node.next.data).toBe(3);
        });
        it("should return the correct node from the tail side (index > len/2)", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.append(4);
            const node = list.find(3);
            expect(node.data).toBe(4);
            expect(node.prev.data).toBe(3);
            expect(node.next).toBeNull();
        });
    });
    describe("insertAt", () => {
        it("should return false for negative index", () => {
            expect(list.insertAt(-1, 1)).toBe(false);
            expect(list.len).toBe(0);
        });
        it("should return false for index > length", () => {
            list.append(1);
            expect(list.insertAt(2, 2)).toBe(false);
            expect(list.len).toBe(1);
        });
        it("should insert at index 0 (unshift)", () => {
            expect(list.insertAt(0, 1)).toBe(true);
            expect(list.traverse()).toEqual([1]);
            expect(list.len).toBe(1);
        });
        it("should insert at index = length (push)", () => {
            list.append(1);
            expect(list.insertAt(1, 2)).toBe(true);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.len).toBe(2);
        });
        it("should insert in the middle", () => {
            list.append(1);
            list.append(3);
            expect(list.insertAt(1, 2)).toBe(true);
            expect(list.traverse()).toEqual([1, 2, 3]);
            expect(list.len).toBe(3);
            const node = list.find(1);
            expect(node.prev.data).toBe(1);
            expect(node.next.data).toBe(3);
        });
    });
    describe("removeAt", () => {
        it("should return null for an empty list", () => {
            expect(list.removeAt(0)).toBeNull();
            expect(list.len).toBe(0);
        });
        it("should return null for negative index", () => {
            list.append(1);
            expect(list.removeAt(-1)).toBeNull();
            expect(list.len).toBe(1);
        });
        it("should return null for index >= length", () => {
            list.append(1);
            expect(list.removeAt(1)).toBeNull();
            expect(list.len).toBe(1);
        });
        it("should remove at index 0 (shift)", () => {
            list.append(1);
            list.append(2);
            expect(list.removeAt(0)).toBe(1);
            expect(list.traverse()).toEqual([2]);
            expect(list.len).toBe(1);
        });
        it("should remove at index = length - 1 (pop)", () => {
            list.append(1);
            list.append(2);
            expect(list.removeAt(1)).toBe(2);
            expect(list.traverse()).toEqual([1]);
            expect(list.len).toBe(1);
        });
        it("should remove from the middle", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.removeAt(1)).toBe(2);
            expect(list.traverse()).toEqual([1, 3]);
            expect(list.len).toBe(2);
            expect(list.head.next.prev.data).toBe(1);
            expect(list.tail.prev.data).toBe(1);
        });
    });
    describe("traverse", () => {
        it("should return an empty array for an empty list", () => {
            expect(list.traverse("forward")).toEqual([]);
            expect(list.traverse("backward")).toEqual([]);
        });
        it("should traverse forward correctly", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.traverse("forward")).toEqual([1, 2, 3]);
        });
        it("should traverse backward correctly", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.traverse("backward")).toEqual([3, 2, 1]);
        });
    });
    describe("reverse", () => {
        it("should do nothing for an empty list", () => {
            list.reverse();
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.len).toBe(0);
        });
        it("should do nothing for a single-node list", () => {
            list.append(1);
            list.reverse();
            expect(list.traverse()).toEqual([1]);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(1);
            expect(list.len).toBe(1);
        });
        it("should reverse a multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.reverse();
            expect(list.traverse("forward")).toEqual([3, 2, 1]);
            expect(list.head.data).toBe(3);
            expect(list.tail.data).toBe(1);
            expect(list.head.next.data).toBe(2);
            expect(list.tail.prev.data).toBe(2);
            expect(list.len).toBe(3);
        });
    });
    describe("remove", () => {
        it("should return false for an empty list", () => {
            expect(list.delete(1)).toBe(false);
            expect(list.len).toBe(0);
        });
        it("should return false if the data is not found", () => {
            list.append(1);
            list.append(2);
            expect(list.delete(3)).toBe(false);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.len).toBe(2);
        });
        it("should remove the head node", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.delete(1)).toBe(true);
            expect(list.traverse()).toEqual([2, 3]);
            expect(list.len).toBe(2);
        });
        it("should remove a middle node", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.delete(2)).toBe(true);
            expect(list.traverse()).toEqual([1, 3]);
            expect(list.len).toBe(2);
        });
        it("should remove the tail node", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.delete(3)).toBe(true);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.len).toBe(2);
        });
    });
    describe("invariants", () => {
        it("should maintain head, tail, and len consistency", () => {
            expect(list.len).toBe(0);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            list.append(1);
            expect(list.len).toBe(1);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(1);
            expect(list.head.next).toBeNull();
            expect(list.head.prev).toBeNull();
            list.append(2);
            list.append(3);
            expect(list.len).toBe(3);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(3);
            expect(list.head.next.data).toBe(2);
            expect(list.tail.prev.data).toBe(2);
            list.deleteTail();
            expect(list.len).toBe(2);
            expect(list.tail.data).toBe(2);
            list.deleteHead();
            expect(list.len).toBe(1);
            expect(list.head.data).toBe(2);
            expect(list.tail.data).toBe(2);
        });
        it("should maintain prev and next pointers correctly", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            const node1 = list.find(0);
            const node2 = list.find(1);
            const node3 = list.find(2);
            expect(node1.prev).toBeNull();
            expect(node1.next).toBe(node2);
            expect(node2.prev).toBe(node1);
            expect(node2.next).toBe(node3);
            expect(node3.prev).toBe(node2);
            expect(node3.next).toBeNull();
            list.removeAt(1);
            expect(node1.next).toBe(node3);
            expect(node3.prev).toBe(node1);
        });
    });
});
