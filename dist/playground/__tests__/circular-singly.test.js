"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circular_singly_1 = require("../circular-singly");
describe("CircularLinkedList", () => {
    let list;
    beforeEach(() => {
        list = new circular_singly_1.CircularSinglyLinkedList();
    });
    describe("unshift", () => {
        it("should add a node to the beginning of an empty list", () => {
            list.prepend(1);
            expect(list.head.data).toBe(1);
            expect(list.head.next).toBe(list.head);
            expect(list.size()).toBe(1);
        });
        it("should add multiple nodes to the beginning", () => {
            list.prepend(3);
            list.prepend(2);
            list.prepend(1);
            expect(list.traverse()).toEqual([1, 2, 3]);
            expect(list.size()).toBe(3);
        });
    });
    describe("push", () => {
        it("should add a node to the end of an empty list", () => {
            list.append(1);
            expect(list.head.data).toBe(1);
            expect(list.head.next).toBe(list.head);
            expect(list.size()).toBe(1);
        });
        it("should add multiple nodes to the end", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.traverse()).toEqual([1, 2, 3]);
            expect(list.size()).toBe(3);
        });
    });
    describe("shift", () => {
        it("should do nothing when shifting an empty list", () => {
            list.deleteHead();
            expect(list.head).toBeNull();
            expect(list.size()).toBe(0);
        });
        it("should remove the only node in a single-node list", () => {
            list.append(1);
            list.deleteHead();
            expect(list.head).toBeNull();
            expect(list.size()).toBe(0);
        });
        it("should remove the first node in a multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.deleteHead();
            expect(list.traverse()).toEqual([2, 3]);
            expect(list.size()).toBe(2);
        });
    });
    describe("pop", () => {
        it("should do nothing when popping an empty list", () => {
            list.deleteTail();
            expect(list.head).toBeNull();
            expect(list.size()).toBe(0);
        });
        it("should remove the only node in a single-node list", () => {
            list.append(1);
            list.deleteTail();
            expect(list.head).toBeNull();
            expect(list.size()).toBe(0);
        });
        it("should remove the last node in a multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.deleteTail();
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.size()).toBe(2);
        });
    });
    describe("search", () => {
        it("should return false when searching an empty list", () => {
            expect(list.search(1)).toBe(false);
        });
        it("should return false when the value is not in the list", () => {
            list.append(1);
            list.append(2);
            expect(list.search(3)).toBe(false);
        });
        it("should return true when the value is in the list", () => {
            list.append(1);
            list.append(2);
            expect(list.search(2)).toBe(true);
        });
    });
    describe("get", () => {
        it("should return null when getting from an empty list", () => {
            expect(list.find(0)).toBeNull();
        });
        it("should return null for a negative index", () => {
            list.append(1);
            expect(list.find(-1)).toBeNull();
        });
        it("should return null for an index out of bounds", () => {
            list.append(1);
            list.append(2);
            expect(list.find(2)).toBeNull();
        });
        it("should return the correct data for a valid index", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.find(0)).toBe(1);
            expect(list.find(1)).toBe(2);
            expect(list.find(2)).toBe(3);
        });
    });
    describe("insertAt", () => {
        it("should insert at index 0 in an empty list", () => {
            list.insertAt(1, 0);
            expect(list.traverse()).toEqual([1]);
            expect(list.size()).toBe(1);
        });
        it("should insert at index 0 in a non-empty list", () => {
            list.append(2);
            list.insertAt(1, 0);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.size()).toBe(2);
        });
        it("should insert at the end when index equals size", () => {
            list.append(1);
            list.append(2);
            list.insertAt(3, 2);
            expect(list.traverse()).toEqual([1, 2, 3]);
            expect(list.size()).toBe(3);
        });
        it("should insert in the middle", () => {
            list.append(1);
            list.append(3);
            list.insertAt(2, 1);
            expect(list.traverse()).toEqual([1, 2, 3]);
            expect(list.size()).toBe(3);
        });
        it("should do nothing for a negative index", () => {
            list.append(1);
            list.insertAt(2, -1);
            expect(list.traverse()).toEqual([1]);
            expect(list.size()).toBe(1);
        });
        it("should do nothing for an index greater than size", () => {
            list.append(1);
            list.append(2);
            list.insertAt(3, 3);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.size()).toBe(2);
        });
    });
    describe("removeAt", () => {
        it("should do nothing when removing from an empty list", () => {
            list.delete(0);
            expect(list.head).toBeNull();
            expect(list.size()).toBe(0);
        });
        it("should do nothing for a negative index", () => {
            list.append(1);
            list.delete(-1);
            expect(list.traverse()).toEqual([1]);
            expect(list.size()).toBe(1);
        });
        it("should do nothing for an index out of bounds", () => {
            list.append(1);
            list.append(2);
            list.delete(2);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.size()).toBe(2);
        });
        it("should remove the node at index 0", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.delete(0);
            expect(list.traverse()).toEqual([2, 3]);
            expect(list.size()).toBe(2);
        });
        it("should remove a node from the middle", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.delete(1);
            expect(list.traverse()).toEqual([1, 3]);
            expect(list.size()).toBe(2);
        });
        it("should remove the last node", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.delete(2);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.size()).toBe(2);
        });
    });
    describe("remove", () => {
        it("should do nothing when removing from an empty list", () => {
            list.remove(1);
            expect(list.head).toBeNull();
            expect(list.size()).toBe(0);
        });
        it("should do nothing when the value is not in the list", () => {
            list.append(1);
            list.append(2);
            list.remove(3);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.size()).toBe(2);
        });
        it("should remove the head when it matches the data", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.remove(1);
            expect(list.traverse()).toEqual([2, 3]);
            expect(list.size()).toBe(2);
        });
        it("should remove a node from the middle", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.remove(2);
            expect(list.traverse()).toEqual([1, 3]);
            expect(list.size()).toBe(2);
        });
        it("should remove the last node", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.remove(3);
            expect(list.traverse()).toEqual([1, 2]);
            expect(list.size()).toBe(2);
        });
    });
    describe("traverse", () => {
        it("should return an empty array for an empty list", () => {
            expect(list.traverse()).toEqual([]);
        });
        it("should return an array with one element for a single-node list", () => {
            list.append(1);
            expect(list.traverse()).toEqual([1]);
        });
        it("should return the correct array for a multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.traverse()).toEqual([1, 2, 3]);
        });
    });
    describe("size", () => {
        it("should return 0 for an empty list", () => {
            expect(list.size()).toBe(0);
        });
        it("should return the correct size after adding nodes", () => {
            list.append(1);
            expect(list.size()).toBe(1);
            list.append(2);
            expect(list.size()).toBe(2);
            list.append(3);
            expect(list.size()).toBe(3);
        });
        it("should return the correct size after removing nodes", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.deleteTail();
            expect(list.size()).toBe(2);
            list.deleteHead();
            expect(list.size()).toBe(1);
            list.remove(2);
            expect(list.size()).toBe(0);
        });
    });
});
