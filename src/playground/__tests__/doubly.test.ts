import { DoublyLinkedList } from "../doubly";

describe("DoublyLinkedList", () => {
  test("constructor initializes empty list", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.len).toBe(0);
  });

  test("push adds elements to the end", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    expect(list.head?.data).toBe(1);
    expect(list.tail?.data).toBe(1);
    expect(list.len).toBe(1);
    list.push(2);
    expect(list.head?.data).toBe(1);
    expect(list.tail?.data).toBe(2);
    expect(list.len).toBe(2);
    expect(list.head?.next?.data).toBe(2);
    expect(list.tail?.prev?.data).toBe(1);
  });

  test("pop removes elements from the end", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.pop()).toBeNull();
    list.push(1);
    list.push(2);
    expect(list.pop()).toBe(2);
    expect(list.tail?.data).toBe(1);
    expect(list.len).toBe(1);
    expect(list.pop()).toBe(1);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.len).toBe(0);
  });

  test("unshift adds elements to the beginning", () => {
    const list = new DoublyLinkedList<number>();
    list.unshift(1);
    expect(list.head?.data).toBe(1);
    expect(list.tail?.data).toBe(1);
    expect(list.len).toBe(1);
    list.unshift(2);
    expect(list.head?.data).toBe(2);
    expect(list.tail?.data).toBe(1);
    expect(list.len).toBe(2);
    expect(list.head?.next?.data).toBe(1);
    expect(list.tail?.prev?.data).toBe(2);
  });

  test("shift removes elements from the beginning", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.shift()).toBeNull();
    list.push(1);
    list.push(2);
    expect(list.shift()).toBe(1);
    expect(list.head?.data).toBe(2);
    expect(list.len).toBe(1);
    expect(list.shift()).toBe(2);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.len).toBe(0);
  });

  test("get retrieves elements at specified index", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.get(0)).toBeNull();
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.get(0)?.data).toBe(1);
    expect(list.get(1)?.data).toBe(2);
    expect(list.get(2)?.data).toBe(3);
    expect(list.get(3)).toBeNull();
    expect(list.get(-1)).toBeNull();
  });

  test("insertAt inserts elements at specified index", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.insertAt(0, 1)).toBe(true);
    expect(list.head?.data).toBe(1);
    expect(list.tail?.data).toBe(1);
    expect(list.len).toBe(1);
    expect(list.insertAt(1, 3)).toBe(true);
    expect(list.head?.data).toBe(1);
    expect(list.tail?.data).toBe(3);
    expect(list.len).toBe(2);
    expect(list.insertAt(1, 2)).toBe(true);
    expect(list.head?.data).toBe(1);
    expect(list.head?.next?.data).toBe(2);
    expect(list.tail?.data).toBe(3);
    expect(list.len).toBe(3);
    expect(list.insertAt(3, 4)).toBe(true);
    expect(list.tail?.data).toBe(4);
    expect(list.len).toBe(4);
    expect(list.insertAt(5, 5)).toBe(false);
  });

  test("removeAt removes elements at specified index", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.removeAt(0)).toBeNull();
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.removeAt(1)).toBe(2);
    expect(list.head?.data).toBe(1);
    expect(list.head?.next?.data).toBe(3);
    expect(list.tail?.data).toBe(3);
    expect(list.len).toBe(2);
    expect(list.removeAt(0)).toBe(1);
    expect(list.head?.data).toBe(3);
    expect(list.tail?.data).toBe(3);
    expect(list.len).toBe(1);
    expect(list.removeAt(0)).toBe(3);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.len).toBe(0);
  });

  test("traverse returns array of data in specified direction", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.traverse("forward")).toEqual([1, 2, 3]);
    expect(list.traverse("backward")).toEqual([3, 2, 1]);
  });

  test("reverse reverses the list in place", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    list.reverse();
    expect(list.head?.data).toBe(3);
    expect(list.head?.next?.data).toBe(2);
    expect(list.tail?.data).toBe(1);
    expect(list.traverse("forward")).toEqual([3, 2, 1]);
  });

  test("remove removes the first node with specified data", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    list.push(2);
    expect(list.remove(2)).toBe(true);
    expect(list.traverse("forward")).toEqual([1, 3, 2]);
    expect(list.remove(4)).toBe(false);
    expect(list.traverse("forward")).toEqual([1, 3, 2]);
  });

  test("push after popping all elements", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    list.push(2);
    expect(list.pop()).toBe(2);
    expect(list.pop()).toBe(1);
    list.push(3);
    expect(list.traverse("forward")).toEqual([3]);
    expect(list.head?.data).toBe(3);
    expect(list.tail?.data).toBe(3);
    expect(list.len).toBe(1);
  });

  test("unshift after shifting all elements", () => {
    const list = new DoublyLinkedList<number>();
    list.unshift(1);
    list.unshift(2);
    expect(list.shift()).toBe(2);
    expect(list.shift()).toBe(1);
    list.unshift(3);
    expect(list.traverse("forward")).toEqual([3]);
    expect(list.head?.data).toBe(3);
    expect(list.tail?.data).toBe(3);
    expect(list.len).toBe(1);
  });

  test("get with out-of-bounds index", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.get(0)).toBeNull();
    list.push(1);
    list.push(2);
    expect(list.get(2)).toBeNull();
    expect(list.get(-1)).toBeNull();
  });

  test("insertAt with out-of-bounds index", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.insertAt(1, 1)).toBe(false);
    list.push(2);
    expect(list.insertAt(2, 3)).toBe(false);
    expect(list.traverse("forward")).toEqual([2]);
    expect(list.len).toBe(1);
  });

  test("removeAt with out-of-bounds index", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.removeAt(0)).toBeNull();
    list.push(1);
    expect(list.removeAt(1)).toBeNull();
    expect(list.traverse("forward")).toEqual([1]);
    expect(list.len).toBe(1);
  });

  test("complex sequence: push, unshift, remove, reverse", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    list.push(2);
    list.unshift(0);
    expect(list.traverse("forward")).toEqual([0, 1, 2]);
    list.remove(1);
    expect(list.traverse("forward")).toEqual([0, 2]);
    list.reverse();
    expect(list.traverse("forward")).toEqual([2, 0]);
    expect(list.len).toBe(2);
  });

  test("multiple reverses", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    list.reverse();
    expect(list.traverse("forward")).toEqual([3, 2, 1]);
    list.reverse();
    expect(list.traverse("forward")).toEqual([1, 2, 3]);
    list.reverse();
    expect(list.traverse("forward")).toEqual([3, 2, 1]);
    expect(list.len).toBe(3);
  });

  test("insertAt and shift combination", () => {
    const list = new DoublyLinkedList<number>();
    list.insertAt(0, 2);
    list.insertAt(0, 1);
    list.insertAt(2, 3);
    expect(list.traverse("forward")).toEqual([1, 2, 3]);
    expect(list.shift()).toBe(1);
    expect(list.traverse("forward")).toEqual([2, 3]);
    expect(list.len).toBe(2);
  });

  test("remove non-existent element", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    list.push(3);
    expect(list.remove(2)).toBe(false);
    expect(list.traverse("forward")).toEqual([1, 3]);
    expect(list.len).toBe(2);
  });

  test("traverse backward after reverse", () => {
    const list = new DoublyLinkedList<number>();
    list.push(1);
    list.push(2);
    list.push(3);
    list.reverse();
    expect(list.traverse("backward")).toEqual([1, 2, 3]);
    expect(list.len).toBe(3);
  });

  test("mixed data types", () => {
    const list = new DoublyLinkedList<any>();
    list.push(1);
    list.push("two");
    list.push({ value: 3 });
    expect(list.traverse("forward")).toEqual([1, "two", { value: 3 }]);
    expect(list.pop()).toEqual({ value: 3 });
    expect(list.shift()).toBe(1);
    expect(list.traverse("forward")).toEqual(["two"]);
    expect(list.len).toBe(1);
  });

  test("large number of elements", () => {
    const list = new DoublyLinkedList<number>();
    for (let i = 0; i < 100; i++) {
      list.push(i);
    }
    expect(list.len).toBe(100);
    expect(list.get(0)?.data).toBe(0);
    expect(list.get(99)?.data).toBe(99);
    list.reverse();
    expect(list.get(0)?.data).toBe(99);
    expect(list.get(99)?.data).toBe(0);
    expect(list.len).toBe(100);
  });
});
