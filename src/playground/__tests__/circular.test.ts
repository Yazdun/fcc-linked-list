import { CircularLinkedList } from "../circular";

describe("CircularLinkedList", () => {
  let list: CircularLinkedList<number>;

  beforeEach(() => {
    list = new CircularLinkedList<number>();
  });

  describe("unshift", () => {
    it("should add a node to the beginning of an empty list", () => {
      list.unshift(1);
      expect(list.head!.data).toBe(1);
      expect(list.head!.next).toBe(list.head);
      expect(list.size()).toBe(1);
    });

    it("should add multiple nodes to the beginning", () => {
      list.unshift(3);
      list.unshift(2);
      list.unshift(1);
      expect(list.traverse()).toEqual([1, 2, 3]);
      expect(list.size()).toBe(3);
    });
  });

  describe("push", () => {
    it("should add a node to the end of an empty list", () => {
      list.push(1);
      expect(list.head!.data).toBe(1);
      expect(list.head!.next).toBe(list.head);
      expect(list.size()).toBe(1);
    });

    it("should add multiple nodes to the end", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.traverse()).toEqual([1, 2, 3]);
      expect(list.size()).toBe(3);
    });
  });

  describe("shift", () => {
    it("should do nothing when shifting an empty list", () => {
      list.shift();
      expect(list.head).toBeNull();
      expect(list.size()).toBe(0);
    });

    it("should remove the only node in a single-node list", () => {
      list.push(1);
      list.shift();
      expect(list.head).toBeNull();
      expect(list.size()).toBe(0);
    });

    it("should remove the first node in a multi-node list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.shift();
      expect(list.traverse()).toEqual([2, 3]);
      expect(list.size()).toBe(2);
    });
  });

  describe("pop", () => {
    it("should do nothing when popping an empty list", () => {
      list.pop();
      expect(list.head).toBeNull();
      expect(list.size()).toBe(0);
    });

    it("should remove the only node in a single-node list", () => {
      list.push(1);
      list.pop();
      expect(list.head).toBeNull();
      expect(list.size()).toBe(0);
    });

    it("should remove the last node in a multi-node list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.pop();
      expect(list.traverse()).toEqual([1, 2]);
      expect(list.size()).toBe(2);
    });
  });

  describe("search", () => {
    it("should return false when searching an empty list", () => {
      expect(list.search(1)).toBe(false);
    });

    it("should return false when the value is not in the list", () => {
      list.push(1);
      list.push(2);
      expect(list.search(3)).toBe(false);
    });

    it("should return true when the value is in the list", () => {
      list.push(1);
      list.push(2);
      expect(list.search(2)).toBe(true);
    });
  });

  describe("get", () => {
    it("should return null when getting from an empty list", () => {
      expect(list.get(0)).toBeNull();
    });

    it("should return null for a negative index", () => {
      list.push(1);
      expect(list.get(-1)).toBeNull();
    });

    it("should return null for an index out of bounds", () => {
      list.push(1);
      list.push(2);
      expect(list.get(2)).toBeNull();
    });

    it("should return the correct data for a valid index", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
    });
  });

  describe("insertAt", () => {
    it("should insert at index 0 in an empty list", () => {
      list.insertAt(1, 0);
      expect(list.traverse()).toEqual([1]);
      expect(list.size()).toBe(1);
    });

    it("should insert at index 0 in a non-empty list", () => {
      list.push(2);
      list.insertAt(1, 0);
      expect(list.traverse()).toEqual([1, 2]);
      expect(list.size()).toBe(2);
    });

    it("should insert at the end when index equals size", () => {
      list.push(1);
      list.push(2);
      list.insertAt(3, 2);
      expect(list.traverse()).toEqual([1, 2, 3]);
      expect(list.size()).toBe(3);
    });

    it("should insert in the middle", () => {
      list.push(1);
      list.push(3);
      list.insertAt(2, 1);
      expect(list.traverse()).toEqual([1, 2, 3]);
      expect(list.size()).toBe(3);
    });

    it("should do nothing for a negative index", () => {
      list.push(1);
      list.insertAt(2, -1);
      expect(list.traverse()).toEqual([1]);
      expect(list.size()).toBe(1);
    });

    it("should do nothing for an index greater than size", () => {
      list.push(1);
      list.push(2);
      list.insertAt(3, 3);
      expect(list.traverse()).toEqual([1, 2]);
      expect(list.size()).toBe(2);
    });
  });

  describe("removeAt", () => {
    it("should do nothing when removing from an empty list", () => {
      list.removeAt(0);
      expect(list.head).toBeNull();
      expect(list.size()).toBe(0);
    });

    it("should do nothing for a negative index", () => {
      list.push(1);
      list.removeAt(-1);
      expect(list.traverse()).toEqual([1]);
      expect(list.size()).toBe(1);
    });

    it("should do nothing for an index out of bounds", () => {
      list.push(1);
      list.push(2);
      list.removeAt(2);
      expect(list.traverse()).toEqual([1, 2]);
      expect(list.size()).toBe(2);
    });

    it("should remove the node at index 0", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.removeAt(0);
      expect(list.traverse()).toEqual([2, 3]);
      expect(list.size()).toBe(2);
    });

    it("should remove a node from the middle", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.removeAt(1);
      expect(list.traverse()).toEqual([1, 3]);
      expect(list.size()).toBe(2);
    });

    it("should remove the last node", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.removeAt(2);
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
      list.push(1);
      list.push(2);
      list.remove(3);
      expect(list.traverse()).toEqual([1, 2]);
      expect(list.size()).toBe(2);
    });

    it("should remove the head when it matches the data", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.remove(1);
      expect(list.traverse()).toEqual([2, 3]);
      expect(list.size()).toBe(2);
    });

    it("should remove a node from the middle", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.remove(2);
      expect(list.traverse()).toEqual([1, 3]);
      expect(list.size()).toBe(2);
    });

    it("should remove the last node", () => {
      list.push(1);
      list.push(2);
      list.push(3);
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
      list.push(1);
      expect(list.traverse()).toEqual([1]);
    });

    it("should return the correct array for a multi-node list", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.traverse()).toEqual([1, 2, 3]);
    });
  });

  describe("size", () => {
    it("should return 0 for an empty list", () => {
      expect(list.size()).toBe(0);
    });

    it("should return the correct size after adding nodes", () => {
      list.push(1);
      expect(list.size()).toBe(1);
      list.push(2);
      expect(list.size()).toBe(2);
      list.push(3);
      expect(list.size()).toBe(3);
    });

    it("should return the correct size after removing nodes", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.pop();
      expect(list.size()).toBe(2);
      list.shift();
      expect(list.size()).toBe(1);
      list.remove(2);
      expect(list.size()).toBe(0);
    });
  });
});
