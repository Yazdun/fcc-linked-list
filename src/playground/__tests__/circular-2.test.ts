import { CircularDoublyLinkedList } from "../circular-2";

describe("CircularDoublyLinkedList", () => {
  let list: CircularDoublyLinkedList<number>;

  beforeEach(() => {
    list = new CircularDoublyLinkedList<number>();
  });

  const getListValues = (list: CircularDoublyLinkedList<number>): number[] => {
    return list.traverse();
  };

  const verifyCircular = (list: CircularDoublyLinkedList<number>): boolean => {
    if (!list.head || !list.tail)
      return list.head === null && list.tail === null;
    let current = list.head;
    do {
      if (!current.next || !current.prev) return false;
      if (current.next.prev !== current || current.prev.next !== current)
        return false;
      current = current.next;
    } while (current !== list.head);
    return list.head.prev === list.tail && list.tail.next === list.head;
  };

  describe("constructor", () => {
    test("creates an empty list", () => {
      expect(list.len).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(getListValues(list)).toEqual([]);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("prepend", () => {
    test("prepend to empty list", () => {
      list.prepend(1);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
      expect(list.head!.next).toBe(list.head);
      expect(list.head!.prev).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });

    test("prepend to non-empty list", () => {
      list.append(2);
      list.prepend(1);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(2);
      expect(list.head!.next).toBe(list.tail);
      expect(list.tail!.prev).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });

    test("prepend multiple elements", () => {
      list.prepend(3);
      list.prepend(2);
      list.prepend(1);
      expect(list.len).toBe(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(list.head!.next!.prev).toBe(list.head);
      expect(list.tail!.prev!.next).toBe(list.tail);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("append", () => {
    test("append to empty list", () => {
      list.append(1);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
      expect(list.head!.next).toBe(list.head);
      expect(list.head!.prev).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });

    test("append to non-empty list", () => {
      list.append(1);
      list.append(2);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(2);
      expect(list.head!.next).toBe(list.tail);
      expect(list.tail!.prev).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });

    test("append multiple elements", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.len).toBe(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(list.head!.next!.prev).toBe(list.head);
      expect(list.tail!.prev!.next).toBe(list.tail);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("deleteHead", () => {
    test("deleteHead from empty list", () => {
      expect(list.deleteHead()).toBeNull();
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(verifyCircular(list)).toBe(true);
    });

    test("deleteHead from single-node list", () => {
      list.append(1);
      expect(list.deleteHead()).toBe(1);
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(verifyCircular(list)).toBe(true);
    });

    test("deleteHead from multi-node list", () => {
      list.append(1);
      list.append(2);
      expect(list.deleteHead()).toBe(1);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([2]);
      expect(list.head!.data).toBe(2);
      expect(list.tail!.data).toBe(2);
      expect(list.head!.next).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("deleteTail", () => {
    test("deleteTail from empty list", () => {
      expect(list.deleteTail()).toBeNull();
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(verifyCircular(list)).toBe(true);
    });

    test("deleteTail from single-node list", () => {
      list.append(1);
      expect(list.deleteTail()).toBe(1);
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(verifyCircular(list)).toBe(true);
    });

    test("deleteTail from multi-node list", () => {
      list.append(1);
      list.append(2);
      expect(list.deleteTail()).toBe(2);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
      expect(list.head!.next).toBe(list.head);
      expect(verifyCircular(list)).toBe(true);
    });
  });

  describe("find", () => {
    test("find in empty list", () => {
      expect(list.find(0)).toBeNull();
    });

    test("find head node", () => {
      list.append(1);
      list.append(2);
      const node = list.find(0);
      expect(node).not.toBeNull();
      expect(node!.data).toBe(1);
    });

    test("find tail node", () => {
      list.append(1);
      list.append(2);
      const node = list.find(1);
      expect(node).not.toBeNull();
      expect(node!.data).toBe(2);
    });

    test("find invalid index", () => {
      list.append(1);
      expect(list.find(-1)).toBeNull();
      expect(list.find(1)).toBeNull();
    });
  });

  describe("delete", () => {
    test("delete from empty list", () => {
      expect(list.delete(1)).toBe(false);
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(verifyCircular(list)).toBe(true);
    });

    test("delete head value", () => {
      list.append(1);
      list.append(2);
      expect(list.delete(1)).toBe(true);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([2]);
      expect(list.head!.data).toBe(2);
      expect(verifyCircular(list)).toBe(true);
    });

    test("delete middle value", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.delete(2)).toBe(true);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 3]);
      expect(list.head!.next).toBe(list.tail);
      expect(verifyCircular(list)).toBe(true);
    });

    test("delete non-existent value", () => {
      list.append(1);
      list.append(2);
      expect(list.delete(3)).toBe(false);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(verifyCircular(list)).toBe(true);
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

    test("traverse maintains circular structure", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(verifyCircular(list)).toBe(true);
      expect(() => list.traverse()).not.toThrow();
    });
  });

  describe("insertAt", () => {
    test("insertAt head (index 0)", () => {
      list.append(2);
      expect(list.insertAt(0, 1)).toBe(true);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(2);
      expect(verifyCircular(list)).toBe(true);
    });

    test("insertAt tail (index len)", () => {
      list.append(1);
      expect(list.insertAt(1, 2)).toBe(true);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(2);
      expect(verifyCircular(list)).toBe(true);
    });

    test("insertAt middle", () => {
      list.append(1);
      list.append(3);
      expect(list.insertAt(1, 2)).toBe(true);
      expect(list.len).toBe(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(list.head!.next!.prev!.data).toBe(1);
      expect(list.tail!.prev!.next!.data).toBe(3);
      expect(verifyCircular(list)).toBe(true);
    });

    test("insertAt invalid index", () => {
      expect(list.insertAt(-1, 1)).toBe(false);
      expect(list.insertAt(1, 1)).toBe(false);
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(verifyCircular(list)).toBe(true);
    });
  });
});
