"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circular_doubly_1 = require("../circular-doubly");
describe("CircularDoublyLinkedList", () => {
    let list;
    beforeEach(() => {
        list = new circular_doubly_1.CircularDoublyLinkedList();
    });
    test("constructor creates empty list", () => {
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
        expect(list.len).toBe(0);
    });
    describe("push", () => {
        test("push to empty list", () => {
            list.append(1);
            expect(list.len).toBe(1);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(1);
            expect(list.head.next).toBe(list.head);
            expect(list.head.prev).toBe(list.head);
        });
        test("push multiple elements", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.len).toBe(3);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(3);
            expect(list.head.next.data).toBe(2);
            expect(list.tail.prev.data).toBe(2);
            expect(list.head.prev).toBe(list.tail);
            expect(list.tail.next).toBe(list.head);
        });
    });
    describe("pop", () => {
        test("pop from empty list", () => {
            expect(list.deleteTail()).toBeNull();
            expect(list.len).toBe(0);
        });
        test("pop from single-element list", () => {
            list.append(1);
            expect(list.deleteTail()).toBe(1);
            expect(list.len).toBe(0);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });
        test("pop from multi-element list", () => {
            list.append(1);
            list.append(2);
            list.append;
            list.append(3);
            expect(list.deleteTail()).toBe(3);
            expect(list.len).toBe(2);
            expect(list.tail.data).toBe(2);
            expect(list.head.prev).toBe(list.tail);
            expect(list.tail.next).toBe(list.head);
        });
    });
    describe("unshift", () => {
        test("unshift to empty list", () => {
            list.prepend(1);
            expect(list.len).toBe(1);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(1);
            expect(list.head.next).toBe(list.head);
            expect(list.head.prev).toBe(list.head);
        });
        test("unshift multiple elements", () => {
            list.prepend(3);
            list.prepend(2);
            list.prepend(1);
            expect(list.len).toBe(3);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(3);
            expect(list.head.next.data).toBe(2);
            expect(list.tail.prev.data).toBe(2);
            expect(list.head.prev).toBe(list.tail);
            expect(list.tail.next).toBe(list.head);
        });
    });
    describe("shift", () => {
        test("shift from empty list", () => {
            expect(list.deleteHead()).toBeNull();
            expect(list.len).toBe(0);
        });
        test("shift from single-element list", () => {
            list.append(1);
            expect(list.deleteHead()).toBe(1);
            expect(list.len).toBe(0);
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });
        test("shift from multi-element list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.deleteHead()).toBe(1);
            expect(list.len).toBe(2);
            expect(list.head.data).toBe(2);
            expect(list.head.prev).toBe(list.tail);
            expect(list.tail.next).toBe(list.head);
        });
    });
    describe("get", () => {
        test("get from empty list", () => {
            expect(list.find(0)).toBeNull();
        });
        test("get with invalid index", () => {
            list.append(1);
            expect(list.find(-1)).toBeNull();
            expect(list.find(1)).toBeNull();
        });
        test("get valid indices", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.find(0).data).toBe(1);
            expect(list.find(1).data).toBe(2);
            expect(list.find(2).data).toBe(3);
        });
    });
    describe("insertAt", () => {
        test("insertAt invalid index", () => {
            expect(list.insertAt(-1, 1)).toBe(false);
            expect(list.insertAt(1, 1)).toBe(false);
        });
        test("insertAt beginning (index 0)", () => {
            list.append(2);
            expect(list.insertAt(0, 1)).toBe(true);
            expect(list.len).toBe(2);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(2);
        });
        test("insertAt end (index len)", () => {
            list.append(1);
            expect(list.insertAt(1, 2)).toBe(true);
            expect(list.len).toBe(2);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(2);
        });
        test("insertAt middle", () => {
            list.append(1);
            list.append(3);
            expect(list.insertAt(1, 2)).toBe(true);
            expect(list.len).toBe(3);
            expect(list.find(0).data).toBe(1);
            expect(list.find(1).data).toBe(2);
            expect(list.find(2).data).toBe(3);
            expect(list.head.prev).toBe(list.tail);
            expect(list.tail.next).toBe(list.head);
        });
    });
    describe("removeAt", () => {
        test("removeAt invalid index", () => {
            expect(list.removeAt(-1)).toBeNull();
            expect(list.removeAt(0)).toBeNull();
        });
        test("removeAt beginning (index 0)", () => {
            list.append(1);
            list.append(2);
            expect(list.removeAt(0)).toBe(1);
            expect(list.len).toBe(1);
            expect(list.head.data).toBe(2);
            expect(list.tail.data).toBe(2);
        });
        test("removeAt end (index len-1)", () => {
            list.append(1);
            list.append(2);
            expect(list.removeAt(1)).toBe(2);
            expect(list.len).toBe(1);
            expect(list.head.data).toBe(1);
            expect(list.tail.data).toBe(1);
        });
        test("removeAt middle", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.removeAt(1)).toBe(2);
            expect(list.len).toBe(2);
            expect(list.find(0).data).toBe(1);
            expect(list.find(1).data).toBe(3);
            expect(list.head.prev).toBe(list.tail);
            expect(list.tail.next).toBe(list.head);
        });
    });
    describe("traverse", () => {
        test("traverse empty list", () => {
            expect(list.traverse()).toEqual([]);
        });
        test("traverse single-element list", () => {
            list.append(1);
            expect(list.traverse()).toEqual([1]);
        });
        test("traverse multi-element list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.traverse()).toEqual([1, 2, 3]);
        });
    });
    describe("remove", () => {
        test("remove from empty list", () => {
            expect(list.delete(1)).toBe(false);
        });
        test("remove non-existent element", () => {
            list.append(1);
            expect(list.delete(2)).toBe(false);
            expect(list.len).toBe(1);
        });
        test("remove existing element", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(list.delete(2)).toBe(true);
            expect(list.len).toBe(2);
            expect(list.traverse()).toEqual([1, 3]);
            expect(list.head.prev).toBe(list.tail);
            expect(list.tail.next).toBe(list.head);
        });
        test("remove first element", () => {
            list.append(1);
            list.append(2);
            expect(list.delete(1)).toBe(true);
            expect(list.len).toBe(1);
            expect(list.head.data).toBe(2);
        });
        test("remove last element", () => {
            list.append(1);
            list.append(2);
            expect(list.delete(2)).toBe(true);
            expect(list.len).toBe(1);
            expect(list.tail.data).toBe(1);
        });
    });
});
