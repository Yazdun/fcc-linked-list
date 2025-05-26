/** Node for circular doubly linked list */
export class N<T> {}

/** Circular doubly linked list implementation */
export class CircularDoublyLinkedList<T> {
  public head: N<T> | null = null;

  /** Adds node to list end */
  append(data: T): void {}

  /** Removes and returns tail node data */
  deleteTail(): T | null {
    return null;
  }

  /** Adds node to list start */
  prepend(data: T): void {}

  /** Removes and returns head node data */
  deleteHead(): T | null {
    return null;
  }

  /** Finds node at given index */
  find(idx: number): N<T> | null {
    return null;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    return false;
  }

  /** Returns array of node data */
  traverse(): T[] {
    return [];
  }
}
