import { CircularDoublyLinkedList } from "../circular-doubly";

describe("CircularDoublyLinkedList", () => {
  let list: CircularDoublyLinkedList<number>;

  beforeEach(() => {
    list = new CircularDoublyLinkedList<number>();
  });

  test("constructor creates empty list", () => {
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.len).toBe(0);
  });

  describe("push", () => {
    test("push to empty list", () => {
      list.push(1);
      expect(list.len).toBe(1);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
      expect(list.head!.next).toBe(list.head);
      expect(list.head!.prev).toBe(list.head);
    });

    test("push multiple elements", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.len).toBe(3);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(3);
      expect(list.head!.next!.data).toBe(2);
      expect(list.tail!.prev!.data).toBe(2);
      expect(list.head!.prev).toBe(list.tail);
      expect(list.tail!.next).toBe(list.head);
    });
  });

  describe("pop", () => {
    test("pop from empty list", () => {
      expect(list.pop()).toBeNull();
      expect(list.len).toBe(0);
    });

    test("pop from single-element list", () => {
      list.push(1);
      expect(list.pop()).toBe(1);
      expect(list.len).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("pop from multi-element list", () => {
      list.push(1);
      list.push(2);
      list.push;
      list.push(3);
      expect(list.pop()).toBe(3);
      expect(list.len).toBe(2);
      expect(list.tail!.data).toBe(2);
      expect(list.head!.prev).toBe(list.tail);
      expect(list.tail!.next).toBe(list.head);
    });
  });

  describe("unshift", () => {
    test("unshift to empty list", () => {
      list.unshift(1);
      expect(list.len).toBe(1);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
      expect(list.head!.next).toBe(list.head);
      expect(list.head!.prev).toBe(list.head);
    });

    test("unshift multiple elements", () => {
      list.unshift(3);
      list.unshift(2);
      list.unshift(1);
      expect(list.len).toBe(3);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(3);
      expect(list.head!.next!.data).toBe(2);
      expect(list.tail!.prev!.data).toBe(2);
      expect(list.head!.prev).toBe(list.tail);
      expect(list.tail!.next).toBe(list.head);
    });
  });

  describe("shift", () => {
    test("shift from empty list", () => {
      expect(list.shift()).toBeNull();
      expect(list.len).toBe(0);
    });

    test("shift from single-element list", () => {
      list.push(1);
      expect(list.shift()).toBe(1);
      expect(list.len).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("shift from multi-element list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.shift()).toBe(1);
      expect(list.len).toBe(2);
      expect(list.head!.data).toBe(2);
      expect(list.head!.prev).toBe(list.tail);
      expect(list.tail!.next).toBe(list.head);
    });
  });

  describe("get", () => {
    test("get from empty list", () => {
      expect(list.get(0)).toBeNull();
    });

    test("get with invalid index", () => {
      list.push(1);
      expect(list.get(-1)).toBeNull();
      expect(list.get(1)).toBeNull();
    });

    test("get valid indices", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.get(0)!.data).toBe(1);
      expect(list.get(1)!.data).toBe(2);
      expect(list.get(2)!.data).toBe(3);
    });
  });

  describe("insertAt", () => {
    test("insertAt invalid index", () => {
      expect(list.insertAt(-1, 1)).toBe(false);
      expect(list.insertAt(1, 1)).toBe(false);
    });

    test("insertAt beginning (index 0)", () => {
      list.push(2);
      expect(list.insertAt(0, 1)).toBe(true);
      expect(list.len).toBe(2);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(2);
    });

    test("insertAt end (index len)", () => {
      list.push(1);
      expect(list.insertAt(1, 2)).toBe(true);
      expect(list.len).toBe(2);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(2);
    });

    test("insertAt middle", () => {
      list.push(1);
      list.push(3);
      expect(list.insertAt(1, 2)).toBe(true);
      expect(list.len).toBe(3);
      expect(list.get(0)!.data).toBe(1);
      expect(list.get(1)!.data).toBe(2);
      expect(list.get(2)!.data).toBe(3);
      expect(list.head!.prev).toBe(list.tail);
      expect(list.tail!.next).toBe(list.head);
    });
  });

  describe("removeAt", () => {
    test("removeAt invalid index", () => {
      expect(list.removeAt(-1)).toBeNull();
      expect(list.removeAt(0)).toBeNull();
    });

    test("removeAt beginning (index 0)", () => {
      list.push(1);
      list.push(2);
      expect(list.removeAt(0)).toBe(1);
      expect(list.len).toBe(1);
      expect(list.head!.data).toBe(2);
      expect(list.tail!.data).toBe(2);
    });

    test("removeAt end (index len-1)", () => {
      list.push(1);
      list.push(2);
      expect(list.removeAt(1)).toBe(2);
      expect(list.len).toBe(1);
      expect(list.head!.data).toBe(1);
      expect(list.tail!.data).toBe(1);
    });

    test("removeAt middle", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.removeAt(1)).toBe(2);
      expect(list.len).toBe(2);
      expect(list.get(0)!.data).toBe(1);
      expect(list.get(1)!.data).toBe(3);
      expect(list.head!.prev).toBe(list.tail);
      expect(list.tail!.next).toBe(list.head);
    });
  });

  describe("traverse", () => {
    test("traverse empty list", () => {
      expect(list.traverse()).toEqual([]);
    });

    test("traverse single-element list", () => {
      list.push(1);
      expect(list.traverse()).toEqual([1]);
    });

    test("traverse multi-element list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.traverse()).toEqual([1, 2, 3]);
    });
  });

  describe("remove", () => {
    test("remove from empty list", () => {
      expect(list.remove(1)).toBe(false);
    });

    test("remove non-existent element", () => {
      list.push(1);
      expect(list.remove(2)).toBe(false);
      expect(list.len).toBe(1);
    });

    test("remove existing element", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.remove(2)).toBe(true);
      expect(list.len).toBe(2);
      expect(list.traverse()).toEqual([1, 3]);
      expect(list.head!.prev).toBe(list.tail);
      expect(list.tail!.next).toBe(list.head);
    });

    test("remove first element", () => {
      list.push(1);
      list.push(2);
      expect(list.remove(1)).toBe(true);
      expect(list.len).toBe(1);
      expect(list.head!.data).toBe(2);
    });

    test("remove last element", () => {
      list.push(1);
      list.push(2);
      expect(list.remove(2)).toBe(true);
      expect(list.len).toBe(1);
      expect(list.tail!.data).toBe(1);
    });
  });
});
