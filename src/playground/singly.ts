/** Node for singly linked list */
class N<T> {}

/** Singly linked list implementation */
export class SinglyLinkedList<T> {
  /** Head node */
  public head: N<T> | null = null;

  /** Adds node to list start */
  prepend(val: T): void {}

  /** Adds node to list end */
  append(data: T): void {}

  /** Removes head node */
  deleteHead(): void {}

  /** Removes tail node */
  deleteTail(): void {}

  /** Removes first node with given value */
  delete(data: T): void {}

  /** Finds node with given value */
  find(data: T): N<T> | null {
    return null;
  }

  /** Logs all node values */
  traverse(): void {}

  /** Inserts node at given position */
  insertAt(pos: number, data: T): void {}
}
