/** Node for circular singly linked list */
export class N<T> {}

/** Circular singly linked list implementation */
export class CircularSinglyLinkedList<T> {
  /** Head node */
  public head: N<T> | null = null;

  // ┌──────────────────────────┐
  // │ CORE OPERATIONS
  // └──────────────────────────┘
  /** Adds node to list start */
  prepend(data: T): void {}

  /** Adds node to list end */
  append(data: T): void {}

  /** Removes head node */
  deleteHead(): void {}

  /** Removes tail node */
  deleteTail(): boolean {
    return false;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    return false;
  }

  /** Finds data at given index */
  find(idx: number): T | null {
    return null;
  }

  // ┌────────────────────────────┐
  // │ BONUS OPERATIONS
  // └────────────────────────────┘
  /** Searches for node with given data */
  search(data: T): boolean {
    return false;
  }

  /** Returns number of nodes */
  size(): number {
    return 0;
  }

  /** Inserts node at given index */
  insertAt(data: T, idx: number): boolean {
    return false;
  }

  /** Removes node at given index */
  deleteAt(idx: number): boolean {
    return false;
  }

  /** Returns array of node data */
  traverse(): T[] {
    return [];
  }
}
