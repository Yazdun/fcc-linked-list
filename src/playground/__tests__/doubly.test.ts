import { DoublyLinkedList } from "../doubly";

describe("DoublyLinkedList", () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  const getListValues = (
    list: DoublyLinkedList<number>,
    dir: "forward" | "backward" = "forward",
  ): number[] => {
    return list.traverse(dir);
  };

  describe("constructor", () => {
    test("creates an empty list", () => {
      expect(list.len).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(getListValues(list)).toEqual([]);
    });
  });

  describe("prepend", () => {
    test("prepend to empty list", () => {
      list.prepend(1);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
      expect(list.head!.prev).toBeNull();
      expect(list.head!.next).toBeNull();
    });

    test("prepend to non-empty list", () => {
      list.append(2);
      list.prepend(1);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(2);
      expect(list.head!.prev).toBeNull();
      expect(list.tail!.next).toBeNull();
    });

    test("prepend multiple elements", () => {
      list.prepend(3);
      list.prepend(2);
      list.prepend(1);
      expect(list.len).toBe(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(list.head!.next!.prev!.data).toBe(1);
      expect(list.tail!.prev!.next!.data).toBe(3);
    });
  });

  describe("append", () => {
    test("append to empty list", () => {
      list.append(1);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
      expect(list.head!.prev).toBeNull();
      expect(list.head!.next).toBeNull();
    });

    test("append to non-empty list", () => {
      list.append(1);
      list.append(2);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(2);
      expect(list.head!.prev).toBeNull();
      expect(list.tail!.next).toBeNull();
    });

    test("append multiple elements", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.len).toBe(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(list.head!.next!.prev!.data).toBe(1);
      expect(list.tail!.prev!.next!.data).toBe(3);
    });
  });

  describe("deleteHead", () => {
    test("deleteHead from empty list", () => {
      expect(list.deleteHead()).toBeNull();
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("deleteHead from single-node list", () => {
      list.append(1);
      expect(list.deleteHead()).toBe(1);
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("deleteHead from multi-node list", () => {
      list.append(1);
      list.append(2);
      expect(list.deleteHead()).toBe(1);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([2]);
      expect(list.head!.prev).toBeNull();
      expect(list.head!.data).toBe(2);
    });
  });

  describe("deleteTail", () => {
    test("deleteTail from empty list", () => {
      expect(list.deleteTail()).toBeNull();
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("deleteTail from single-node list", () => {
      list.append(1);
      expect(list.deleteTail()).toBe(1);
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("deleteTail from multi-node list", () => {
      list.append(1);
      list.append(2);
      expect(list.deleteTail()).toBe(2);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.tail!.next).toBeNull();
      expect(list.tail!.data).toBe(1);
    });
  });

  describe("delete", () => {
    test("delete from empty list", () => {
      expect(list.delete(1)).toBe(false);
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
    });

    test("delete head value", () => {
      list.append(1);
      list.append(2);
      expect(list.delete(1)).toBe(true);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([2]);
      expect(list.head!.prev).toBeNull();
    });

    test("delete middle value", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.delete(2)).toBe(true);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 3]);
      expect(list.head!.next!.prev!.data).toBe(1);
    });

    test("delete non-existent value", () => {
      list.append(1);
      list.append(2);
      expect(list.delete(3)).toBe(false);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
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

  describe("insertAt", () => {
    test("insertAt head (index 0)", () => {
      list.append(2);
      expect(list.insertAt(0, 1)).toBe(true);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.head!.prev).toBeNull();
      expect(list.head!.next!.prev!.data).toBe(1);
    });

    test("insertAt tail (index len)", () => {
      list.append(1);
      expect(list.insertAt(1, 2)).toBe(true);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 2]);
      expect(list.tail!.next).toBeNull();
      expect(list.tail!.prev!.next!.data).toBe(2);
    });

    test("insertAt middle", () => {
      list.append(1);
      list.append(3);
      expect(list.insertAt(1, 2)).toBe(true);
      expect(list.len).toBe(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
      expect(list.head!.next!.prev!.data).toBe(1);
      expect(list.tail!.prev!.next!.data).toBe(3);
    });

    test("insertAt invalid index", () => {
      expect(list.insertAt(-1, 1)).toBe(false);
      expect(list.insertAt(1, 1)).toBe(false);
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
    });
  });

  describe("removeAt", () => {
    test("removeAt invalid index", () => {
      expect(list.removeAt(-1)).toBeNull();
      expect(list.removeAt(0)).toBeNull();
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
    });

    test("removeAt head (index 0)", () => {
      list.append(1);
      list.append(2);
      expect(list.removeAt(0)).toBe(1);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([2]);
      expect(list.head!.prev).toBeNull();
    });

    test("removeAt tail (index len-1)", () => {
      list.append(1);
      list.append(2);
      expect(list.removeAt(1)).toBe(2);
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.tail!.next).toBeNull();
    });

    test("removeAt middle", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.removeAt(1)).toBe(2);
      expect(list.len).toBe(2);
      expect(getListValues(list)).toEqual([1, 3]);
      expect(list.head!.next!.prev!.data).toBe(1);
      expect(list.tail!.prev!.next!.data).toBe(3);
    });
  });

  describe("traverse", () => {
    test("traverse empty list", () => {
      expect(getListValues(list)).toEqual([]);
      expect(getListValues(list, "backward")).toEqual([]);
    });

    test("traverse single-node list forward", () => {
      list.append(1);
      expect(getListValues(list)).toEqual([1]);
    });

    test("traverse single-node list backward", () => {
      list.append(1);
      expect(getListValues(list, "backward")).toEqual([1]);
    });

    test("traverse multi-node list forward", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(getListValues(list)).toEqual([1, 2, 3]);
    });

    test("traverse multi-node list backward", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(getListValues(list, "backward")).toEqual([3, 2, 1]);
    });
  });

  describe("reverse", () => {
    test("reverse empty list", () => {
      list.reverse();
      expect(list.len).toBe(0);
      expect(getListValues(list)).toEqual([]);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("reverse single-node list", () => {
      list.append(1);
      list.reverse();
      expect(list.len).toBe(1);
      expect(getListValues(list)).toEqual([1]);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
    });

    test("reverse multi-node list", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      list.reverse();
      expect(list.len).toBe(3);
      expect(getListValues(list)).toEqual([3, 2, 1]);
      expect(list.head!.data).toBe(3);
      expect(list.tail!.data).toBe(1);
      expect(list.head!.next!.prev!.data).toBe(3);
      expect(list.tail!.prev!.next!.data).toBe(1);
    });
  });
});
