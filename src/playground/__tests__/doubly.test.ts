// import { DoublyLinkedList } from "../../examples/doubly";
import { DoublyLinkedList } from "../doubly";

describe("DoublyLinkedList", () => {
  let list: DoublyLinkedList<string | number>;

  beforeEach(() => {
    list = new DoublyLinkedList<string | number>();
  });

  describe("push", () => {
    test("should add to an empty list", () => {
      list.push("A");
      expect(list.get(0)?.data).toBe("A");
      expect(list.traverse()).toEqual(["A"]);
      expect(list.len).toBe(1);
      expect(list.head?.next).toBeNull();
      expect(list.tail?.prev).toBeNull();
    });

    test("should add to a non-empty list", () => {
      list.push("A");
      list.push("B");
      expect(list.get(1)?.data).toBe("B");
      expect(list.traverse()).toEqual(["A", "B"]);
      expect(list.len).toBe(2);
      expect(list.head?.next?.data).toBe("B");
      expect(list.tail?.prev?.data).toBe("A");
    });
  });

  describe("pop", () => {
    test("should return null for an empty list", () => {
      expect(list.pop()).toBeNull();
      expect(list.len).toBe(0);
    });

    test("should remove and return the only node", () => {
      list.push("A");
      expect(list.pop()).toBe("A");
      expect(list.traverse()).toEqual([]);
      expect(list.len).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("should remove and return the last node", () => {
      list.push("A");
      list.push("B");
      expect(list.pop()).toBe("B");
      expect(list.traverse()).toEqual(["A"]);
      expect(list.len).toBe(1);
      expect(list.tail?.data).toBe("A");
      expect(list.tail?.next).toBeNull();
    });
  });

  describe("unshift", () => {
    test("should add to an empty list", () => {
      list.unshift("A");
      expect(list.get(0)?.data).toBe("A");
      expect(list.traverse()).toEqual(["A"]);
      expect(list.len).toBe(1);
      expect(list.head?.next).toBeNull();
      expect(list.tail?.prev).toBeNull();
    });

    test("should add to a non-empty list", () => {
      list.push("B");
      list.unshift("A");
      expect(list.get(0)?.data).toBe("A");
      expect(list.traverse()).toEqual(["A", "B"]);
      expect(list.len).toBe(2);
      expect(list.head?.next?.data).toBe("B");
      expect(list.tail?.prev?.data).toBe("A");
    });
  });

  describe("shift", () => {
    test("should return null for an empty list", () => {
      expect(list.shift()).toBeNull();
      expect(list.len).toBe(0);
    });

    test("should remove and return the only node", () => {
      list.push("A");
      expect(list.shift()).toBe("A");
      expect(list.traverse()).toEqual([]);
      expect(list.len).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("should remove and return the first node", () => {
      list.push("A");
      list.push("B");
      expect(list.shift()).toBe("A");
      expect(list.traverse()).toEqual(["B"]);
      expect(list.len).toBe(1);
      expect(list.head?.data).toBe("B");
      expect(list.head?.prev).toBeNull();
    });
  });

  describe("get", () => {
    test("should return null for an empty list", () => {
      expect(list.get(0)).toBeNull();
    });

    test("should return null for invalid index", () => {
      list.push("A");
      expect(list.get(-1)).toBeNull();
      expect(list.get(1)).toBeNull();
    });

    test("should get node from the head (forward)", () => {
      list.push("A");
      list.push("B");
      list.push("C");
      expect(list.get(1)?.data).toBe("B");
    });

    test("should get node from the tail (backward)", () => {
      list.push("A");
      list.push("B");
      list.push("C");
      expect(list.get(2)?.data).toBe("C");
    });
  });

  describe("insertAt", () => {
    test("should return false for invalid index", () => {
      expect(list.insertAt(-1, "A")).toBe(false);
      expect(list.insertAt(1, "A")).toBe(false);
      expect(list.len).toBe(0);
    });

    test("should insert at index 0 (unshift)", () => {
      expect(list.insertAt(0, "A")).toBe(true);
      expect(list.traverse()).toEqual(["A"]);
      expect(list.len).toBe(1);
    });

    test("should insert at the end (push)", () => {
      list.push("A");
      expect(list.insertAt(1, "B")).toBe(true);
      expect(list.traverse()).toEqual(["A", "B"]);
      expect(list.len).toBe(2);
    });

    test("should insert in the middle", () => {
      list.push("A");
      list.push("C");
      expect(list.insertAt(1, "B")).toBe(true);
      expect(list.traverse()).toEqual(["A", "B", "C"]);
      expect(list.len).toBe(3);
      const nodeB = list.get(1);
      expect(nodeB?.prev?.data).toBe("A");
      expect(nodeB?.next?.data).toBe("C");
    });
  });

  describe("removeAt", () => {
    test("should return null for invalid index", () => {
      expect(list.removeAt(-1)).toBeNull();
      expect(list.removeAt(0)).toBeNull();
      expect(list.len).toBe(0);
    });

    test("should remove at index 0 (shift)", () => {
      list.push("A");
      expect(list.removeAt(0)).toBe("A");
      expect(list.traverse()).toEqual([]);
      expect(list.len).toBe(0);
    });

    test("should remove at the end (pop)", () => {
      list.push("A");
      list.push("B");
      expect(list.removeAt(1)).toBe("B");
      expect(list.traverse()).toEqual(["A"]);
      expect(list.len).toBe(1);
    });

    test("should remove in the middle", () => {
      list.push("A");
      list.push("B");
      list.push("C");
      expect(list.removeAt(1)).toBe("B");
      expect(list.traverse()).toEqual(["A", "C"]);
      expect(list.len).toBe(2);
      const nodeA = list.get(0);
      expect(nodeA?.next?.data).toBe("C");
      expect(nodeA?.next?.prev?.data).toBe("A");
    });
  });

  describe("traverse", () => {
    test("should return empty array for an empty list", () => {
      expect(list.traverse("forward")).toEqual([]);
      expect(list.traverse("backward")).toEqual([]);
    });

    test("should traverse forward correctly", () => {
      list.push("A");
      list.push("B");
      list.push("C");
      expect(list.traverse("forward")).toEqual(["A", "B", "C"]);
    });

    test("should traverse backward correctly", () => {
      list.push("A");
      list.push("B");
      list.push("C");
      expect(list.traverse("backward")).toEqual(["C", "B", "A"]);
    });
  });
});
