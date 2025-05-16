import { SinglyLinkedList } from "../singly";

describe("SinglyLinkedList", () => {
  let list: SinglyLinkedList<string | number>;

  beforeEach(() => {
    list = new SinglyLinkedList<string | number>();
  });

  describe("append", () => {
    test("should append to an empty list", () => {
      list.append("A");
      expect(list.search("A")?.value).toBe("A");
      expect(list.search("A")?.next).toBeNull();
    });

    test("should append to a non-empty list", () => {
      list.append("A");
      list.append("B");
      const nodeA = list.search("A");
      expect(nodeA?.next?.value).toBe("B");
      expect(list.search("B")?.next).toBeNull();
    });
  });

  describe("delete", () => {
    test("should do nothing on an empty list", () => {
      list.delete("A");
      expect(list.search("A")).toBeNull();
    });

    test("should delete the head node", () => {
      list.append("A");
      list.append("B");
      list.delete("A");
      expect(list.search("A")).toBeNull();
      expect(list.search("B")?.value).toBe("B");
    });

    test("should delete a middle node", () => {
      list.append("A");
      list.append("B");
      list.append("C");
      list.delete("B");
      const nodeA = list.search("A");
      expect(nodeA?.next?.value).toBe("C");
      expect(list.search("B")).toBeNull();
    });

    test("should do nothing if value not found", () => {
      list.append("A");
      list.delete("B");
      expect(list.search("A")?.value).toBe("A");
    });
  });

  describe("search", () => {
    test("should return null for an empty list", () => {
      expect(list.search("A")).toBeNull();
    });

    test("should find a value in the list", () => {
      list.append("A");
      list.append("B");
      const node = list.search("B");
      expect(node?.value).toBe("B");
    });

    test("should return null if value not found", () => {
      list.append("A");
      expect(list.search("B")).toBeNull();
    });
  });

  describe("traverse", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test("should not log anything for an empty list", () => {
      list.traverse();
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test("should log all values in order", () => {
      list.append("A");
      list.append("B");
      list.traverse();
      expect(consoleSpy).toHaveBeenCalledWith("A");
      expect(consoleSpy).toHaveBeenCalledWith("B");
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("insertAt", () => {
    test("should insert at position 0 in an empty list", () => {
      list.insertAt(0, "A");
      expect(list.search("A")?.value).toBe("A");
      expect(list.search("A")?.next).toBeNull();
    });

    test("should insert at position 0 in a non-empty list", () => {
      list.append("B");
      list.insertAt(0, "A");
      expect(list.search("A")?.next?.value).toBe("B");
    });

    test("should insert in the middle", () => {
      list.append("A");
      list.append("C");
      list.insertAt(1, "B");
      const nodeA = list.search("A");
      expect(nodeA?.next?.value).toBe("B");
      expect(nodeA?.next?.next?.value).toBe("C");
    });

    test("should throw error for negative position", () => {
      expect(() => list.insertAt(-1, "A")).toThrow("failed");
    });

    test("should throw error for position beyond list length", () => {
      list.append("A");
      expect(() => list.insertAt(2, "B")).toThrow("failed");
    });
  });

  describe("deleteAt", () => {
    test("should do nothing on an empty list", () => {
      list.deleteAt(0);
      expect(list.search("A")).toBeNull();
    });

    test("should delete at position 0", () => {
      list.append("A");
      list.append("B");
      list.deleteAt(0);
      expect(list.search("A")).toBeNull();
      expect(list.search("B")?.value).toBe("B");
    });

    test("should delete in the middle", () => {
      list.append("A");
      list.append("B");
      list.append("C");
      list.deleteAt(1);
      const nodeA = list.search("A");
      expect(nodeA?.next?.value).toBe("C");
      expect(list.search("B")).toBeNull();
    });

    test("should not throw for position beyond list length", () => {
      list.append("A");
      list.deleteAt(1); // No-op
      expect(list.search("A")?.value).toBe("A");
    });
  });

  describe("reverse", () => {
    test("should do nothing on an empty list", () => {
      list.reverse();
      expect(list.search("A")).toBeNull();
    });

    test("should reverse a single-node list", () => {
      list.append("A");
      list.reverse();
      expect(list.search("A")?.value).toBe("A");
      expect(list.search("A")?.next).toBeNull();
    });

    test("should reverse a multi-node list", () => {
      list.append("A");
      list.append("B");
      list.append("C");
      list.reverse();
      const nodeC = list.search("C");
      expect(nodeC?.next?.value).toBe("B");
      expect(nodeC?.next?.next?.value).toBe("A");
      expect(list.search("A")?.next).toBeNull();
    });
  });

  describe("findMiddle", () => {
    test("should return null for an empty list", () => {
      expect(list.findMiddle()).toBeNull();
    });

    test("should find middle of a single-node list", () => {
      list.append("A");
      const middle = list.findMiddle();
      expect(middle?.value).toBe("A");
    });

    test("should find middle of an odd-length list", () => {
      list.append("A");
      list.append("B");
      list.append("C");
      const middle = list.findMiddle();
      expect(middle?.value).toBe("B");
    });

    test("should find middle of an even-length list", () => {
      list.append("A");
      list.append("B");
      list.append("C");
      list.append("D");
      const middle = list.findMiddle();
      expect(middle?.value).toBe("B");
    });
  });
});
