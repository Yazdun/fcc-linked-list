import { CircularSinglyLinkedList } from "../circular-1";

describe("CircularSinglyLinkedList", () => {
  let list: CircularSinglyLinkedList<number>;

  beforeEach(() => {
    list = new CircularSinglyLinkedList<number>();
  });

  // Helper function to get list values as an array
  const getListValues = (list: CircularSinglyLinkedList<number>): number[] => {
    return list.traverse();
  };

  // Helper function to verify circular structure
  const verifyCircular = (list: CircularSinglyLinkedList<number>): boolean => {
    if (!list.head) return true;
    let current = list.head;
    do {
      if (!current.next) return false;
      current = current.next;
    } while (current !== list.head);
    return true;
  };

  describe("constructor", () => {
    test("creates an empty list", () => {
      expect(list.head).toBeNull();
      expect(getListValues(list)).toEqual([]);
    });
  });

  describe("prepend", () => {
    test("prepend to empty list", () => {
      list.prepend(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.head!.next).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });

    test("prepend to non-empty list", () => {
      list.append(2);
      list.prepend(1);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.next!.next).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });

    test("prepend multiple elements", () => {
      list.prepend(3);
      list.prepend(2);
      list.prepend(1);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("append", () => {
    test("append to empty list", () => {
      list.append(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.head!.next).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });

    test("append to non-empty list", () => {
      list.append(1);
      list.append(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.next!.next).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });

    test("append multiple elements", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(list.size()).toBe(3);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("deleteHead", () => {
    test("deleteHead from empty list", () => {
      list.deleteHead();
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
    });

    test("deleteHead from single-node list", () => {
      list.append(1);
      list.deleteHead();
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
    });

    test("deleteHead from multi-node list", () => {
      list.append(1);
      list.append(2);
      list.deleteHead();
      expect(getListValues(list)).toEqual([2]);
      expect(list.head!.next).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("deleteTail", () => {
    test("deleteTail from empty list", () => {
      expect(list.deleteTail()).toBe(false);
      expect(getListValues(list)).toEqual([]);
    });

    test("deleteTail from single-node list", () => {
      list.append(1);
      expect(list.deleteTail()).toBe(true);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
    });

    test("deleteTail from multi-node list", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.deleteTail()).toBe(true);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("delete", () => {
    test("delete from empty list", () => {
      expect(list.delete(1)).toBe(false);
      expect(getListValues(list)).toEqual([]);
    });

    test("delete head value", () => {
      list.append(1);
      list.append(2);
      expect(list.delete(1)).toBe(true);
      expect(getListValues(list)).toEqual([2]);

      expect(verifyCircular(list)).toBe(true);
    });

    test("delete middle value", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.delete(2)).toBe(true);
      expect(getListValues(list)).toEqual([1, 3]);

      expect(verifyCircular(list)).toBe(true);
    });

    test("delete non-existent value", () => {
      list.append(1);
      list.append(2);
      expect(list.delete(3)).toBe(false);
      expect(getListValues(list)).toEqual([1, 2]);

      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("find", () => {
    test("find in empty list", () => {
      expect(list.find(0)).toBeNull();
    });

    test("find head data", () => {
      list.append(1);
      list.append(2);
      expect(list.find(0)).toBe(1);
    });

    test("find tail data", () => {
      list.append(1);
      list.append(2);
      expect(list.find(1)).toBe(2);
    });

    test("find invalid index", () => {
      list.append(1);
      expect(list.find(-1)).toBeNull();
      expect(list.find(1)).toBeNull();
    });
  });

  describe("traverse", () => {
    test("traverse empty list", () => {
      expect(getListValues(list)).toEqual([]);
    });

    test("traverse single-node list", () => {
      list.append(1);
      expect(getListValues(list)).toEqual([1]);
    });

    test("traverse multi-node list", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
    });
  });

  describe("insertAt", () => {
    test("insertAt head (index 0)", () => {
      list.append(2);
      expect(list.insertAt(1, 0)).toBe(true);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(verifyCircular(list)).toBe(true);
    });

    test("insertAt tail (index equal to size)", () => {
      list.append(1);
      expect(list.insertAt(2, 1)).toBe(true);
      expect(getListValues(list)).toEqual([1, 2]);

      expect(verifyCircular(list)).toBe(true);
    });

    test("insertAt middle", () => {
      list.append(1);
      list.append(3);
      expect(list.insertAt(2, 1)).toBe(true);
      expect(getListValues(list)).toEqual([1, 2, 3]);

      expect(verifyCircular(list)).toBe(true);
    });

    test("insertAt invalid index", () => {
      list.append(1);
      expect(list.insertAt(2, 2)).toBe(false);
      expect(getListValues(list)).toEqual([1]);
    });
  });
});
