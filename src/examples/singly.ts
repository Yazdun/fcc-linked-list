/** Node for singly linked list */
class N<T> {
  /** Node value */
  public data: T;
  /** Next node reference */
  public next: N<T> | null = null;

  /** Creates a node with given value */
  constructor(value: T) {
    this.data = value;
  }
}

/** Singly linked list implementation */
export class SinglyLinkedList<T> {
  /** Head node */
  public head: N<T> | null = null;

  /** Adds node to list start */
  prepend(data: T): void {
    const newNode = new N(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  /** Adds node to list end */
  append(data: T): void {
    const newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
  }

  /** Removes head node */
  deleteHead(): void {
    if (this.head) {
      this.head = this.head.next;
    }
  }

  /** Removes tail node */
  deleteTail(): void {
    if (!this.head) return;

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }

    current.next = null;
  }

  /** Removes first node with given value */
  delete(data: T): void {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return;
      }

      current = current.next;
    }
  }

  /** Finds node with given value */
  find(data: T): N<T> | null {
    if (!this.head) return null;

    let current: N<T> | null = this.head;

    while (current) {
      if (current.data === data) return current;
      current = current.next;
    }

    return null;
  }

  /** Logs all node values */
  traverse(): void {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  /** Inserts node at given position */
  insertAt(pos: number, data: T): void {
    const newNode = new N(data);
    let current: N<T> | null = this.head;

    if (pos < 0) throw new Error("failed");

    if (pos === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let idx = 0;

    while (current && idx < pos - 1) {
      current = current.next;
      idx++;
    }

    if (!current) throw new Error("failed");

    newNode.next = current.next;
    current.next = newNode;
  }

  // ┌────────────────────────────┐
  // │ BONUS OPERATION
  // └────────────────────────────┘

  /** Reverses list in place */
  reverse(): void {
    type TT = N<T> | null | undefined;
    let current: TT = this.head;
    let following: TT = this.head;
    let prev: TT = null;

    while (current) {
      following = following?.next;
      current.next = prev;
      prev = current;
      current = following;
    }

    this.head = prev;
  }
}
