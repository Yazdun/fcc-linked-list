"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const singly_1 = require("../singly");
describe("SinglyLinkedList", () => {
    let list;
    beforeEach(() => {
        list = new singly_1.SinglyLinkedList();
        jest.spyOn(console, "log").mockImplementation(() => { });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    const getListValues = (list) => {
        const values = [];
        let current = list.head;
        while (current) {
            values.push(current.data);
            current = current.next;
        }
        return values;
    };
    describe("constructor", () => {
        test("creates an empty list", () => {
            expect(getListValues(list)).toEqual([]);
        });
    });
    describe("prepend", () => {
        test("prepend to empty list", () => {
            list.prepend(1);
            expect(getListValues(list)).toEqual([1]);
        });
        test("prepend to non-empty list", () => {
            list.append(2);
            list.prepend(1);
            expect(getListValues(list)).toEqual([1, 2]);
        });
        test("prepend multiple elements", () => {
            list.prepend(3);
            list.prepend(2);
            list.prepend(1);
            expect(getListValues(list)).toEqual([1, 2, 3]);
        });
    });
    describe("append", () => {
        test("append to empty list", () => {
            list.append(1);
            expect(getListValues(list)).toEqual([1]);
        });
        test("append to non-empty list", () => {
            list.append(1);
            list.append(2);
            expect(getListValues(list)).toEqual([1, 2]);
        });
        test("append multiple elements", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            expect(getListValues(list)).toEqual([1, 2, 3]);
        });
    });
    describe("deleteHead", () => {
        test("deleteHead from empty list", () => {
            list.deleteHead();
            expect(getListValues(list)).toEqual([]);
        });
        test("deleteHead from single-node list", () => {
            list.append(1);
            list.deleteHead();
            expect(getListValues(list)).toEqual([]);
        });
        test("deleteHead from multi-node list", () => {
            list.append(1);
            list.append(2);
            list.deleteHead();
            expect(getListValues(list)).toEqual([2]);
        });
    });
    describe("deleteTail", () => {
        test("deleteTail from empty list", () => {
            list.deleteTail();
            expect(getListValues(list)).toEqual([]);
        });
        test("deleteTail from single-node list", () => {
            list.append(1);
            list.deleteTail();
            expect(getListValues(list)).toEqual([]);
        });
        test("deleteTail from multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.deleteTail();
            expect(getListValues(list)).toEqual([1, 2]);
        });
    });
    describe("delete", () => {
        test("delete from empty list", () => {
            list.delete(1);
            expect(getListValues(list)).toEqual([]);
        });
        test("delete head value", () => {
            list.append(1);
            list.append(2);
            list.delete(1);
            expect(getListValues(list)).toEqual([2]);
        });
        test("delete middle value", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.delete(2);
            expect(getListValues(list)).toEqual([1, 3]);
        });
        test("delete non-existent value", () => {
            list.append(1);
            list.append(2);
            list.delete(3);
            expect(getListValues(list)).toEqual([1, 2]);
        });
    });
    describe("find", () => {
        test("find in empty list", () => {
            expect(list.find(1)).toBeNull();
        });
        test("find existing value", () => {
            list.append(1);
            list.append(2);
            const node = list.find(2);
            expect(node).not.toBeNull();
            expect(node.data).toBe(2);
        });
        test("find non-existent value", () => {
            list.append(1);
            list.append(2);
            expect(list.find(3)).toBeNull();
        });
    });
    describe("traverse", () => {
        test("traverse empty list", () => {
            list.traverse();
            expect(console.log).not.toHaveBeenCalled();
        });
        test("traverse single-node list", () => {
            list.append(1);
            list.traverse();
            expect(console.log).toHaveBeenCalledWith(1);
            expect(console.log).toHaveBeenCalledTimes(1);
        });
        test("traverse multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.traverse();
            expect(console.log).toHaveBeenCalledWith(1);
            expect(console.log).toHaveBeenCalledWith(2);
            expect(console.log).toHaveBeenCalledWith(3);
            expect(console.log).toHaveBeenCalledTimes(3);
        });
    });
    describe("insertAt", () => {
        test("insertAt position 0 (head)", () => {
            list.append(2);
            list.insertAt(0, 1);
            expect(getListValues(list)).toEqual([1, 2]);
        });
        test("insertAt middle position", () => {
            list.append(1);
            list.append(3);
            list.insertAt(1, 2);
            expect(getListValues(list)).toEqual([1, 2, 3]);
        });
        test("insertAt invalid negative position throws error", () => {
            expect(() => list.insertAt(-1, 1)).toThrow("failed");
        });
        test("insertAt position beyond length throws error", () => {
            list.append(1);
            expect(() => list.insertAt(2, 2)).toThrow("failed");
        });
    });
    describe("deleteAt", () => {
        test("deleteAt position 0 (head)", () => {
            list.append(1);
            list.append(2);
            list.deleteAt(0);
            expect(getListValues(list)).toEqual([2]);
        });
        test("deleteAt middle position", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.deleteAt(1);
            expect(getListValues(list)).toEqual([1, 3]);
        });
        test("deleteAt invalid position does nothing", () => {
            list.append(1);
            list.deleteAt(1);
            expect(getListValues(list)).toEqual([1]);
        });
    });
    describe("findMiddle", () => {
        test("findMiddle of empty list", () => {
            expect(list.findMiddle()).toBeNull();
        });
        test("findMiddle of single-node list", () => {
            list.append(1);
            const middle = list.findMiddle();
            expect(middle).not.toBeNull();
            expect(middle.data).toBe(1);
        });
        test("findMiddle of odd-length list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            const middle = list.findMiddle();
            expect(middle.data).toBe(2);
        });
        test("findMiddle of even-length list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.append(4);
            const middle = list.findMiddle();
            expect(middle.data).toBe(2);
        });
    });
    describe("reverse", () => {
        test("reverse empty list", () => {
            list.reverse();
            expect(getListValues(list)).toEqual([]);
        });
        test("reverse single-node list", () => {
            list.append(1);
            list.reverse();
            expect(getListValues(list)).toEqual([1]);
        });
        test("reverse multi-node list", () => {
            list.append(1);
            list.append(2);
            list.append(3);
            list.reverse();
            expect(getListValues(list)).toEqual([3, 2, 1]);
        });
    });
});
