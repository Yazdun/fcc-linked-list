/** Node for singly linked list */
class N<T> {}

/** Singly linked list implementation */
export class SinglyLinkedList<T> {
  /** Head node */
  protected head: N<T> | null = null;

  /** Adds node to list start */
  prepend(val: T): void {}

  /** Adds node to list end */
  append(val: T): void {}

  /** Removes head node */
  deleteHead(): void {}

  /** Removes tail node */
  deleteTail(): void {}

  /** Removes first node with given value */
  delete(val: T): void {}

  /** Finds node with given value */
  find(val: T): N<T> | null {
    return null;
  }

  /** Logs all node values */
  traverse(): void {}
}
