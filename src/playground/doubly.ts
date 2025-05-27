/** Node for doubly linked list */
export class N<T> {}

/** Doubly linked list implementation */
export class DoublyLinkedList<T> {
  /** Head node */
  public head: N<T> | null;
  /** Tail node */
  public tail: N<T> | null;
  /** List length */
  public len: number;

  /** Creates an empty list */
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  /** Adds node to list start */
  prepend(data: T): void {}

  /** Adds node to list end */
  append(data: T): void {}

  /** Removes and returns head node data */
  deleteHead(): T | null {
    return null;
  }

  /** Removes and returns tail node data */
  deleteTail(): T | null {
    return null;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    return false;
  }

  /** Finds node at given index */
  find(idx: number): N<T> | null {
    return null;
  }

  /** Returns array of node data */
  traverse(dir: "forward" | "backward" = "forward"): T[] {
    return [];
  }

  /** Inserts node at given index */
  insertAt(idx: number, data: T): boolean {
    return false;
  }
}
