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

  /** Returns array of node data */
  traverse(): T[] {
    return [];
  }
}
