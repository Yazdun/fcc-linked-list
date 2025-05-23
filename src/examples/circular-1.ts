/** Node for circular singly linked list */
export class N<T> {
  /** Node data */
  public data: T;
  /** Next node reference */
  public next: N<T> | null;

  /** Creates a node with given data */
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

/** Circular singly linked list implementation */
export class CircularSinglyLinkedList<T> {
  /** Head node */
  public head: N<T> | null = null;

  // ┌──────────────────────────┐
  // │ CORE OPERATIONS
  // └──────────────────────────┘
  /** Adds node to list start */
  prepend(data: T) {
    let newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
    } else {
      let last = this.head;

      while (last.next !== this.head) {
        if (!last.next) throw new Error("invalid list");
        last = last.next;
      }

      last.next = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  /** Adds node to list end */
  append(data: T): void {
    let newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let last = this.head;

      while (last.next !== this.head) {
        if (!last.next) throw new Error("invalid list");
        last = last.next;
      }

      last.next = newNode;
      newNode.next = this.head;
    }
  }

  /** Removes head node */
  deleteHead(): void {
    if (!this.head) return;

    if (this.head.next === this.head) {
      this.head = null;
      return;
    }

    let last = this.head;

    while (last.next !== this.head) {
      if (!last.next) throw new Error("invalid list");
      last = last.next;
    }

    let newHead = this.head.next;
    last.next = newHead;
    this.head = newHead;
  }

  /** Removes tail node */
  deleteTail(): boolean {
    if (!this.head) return false;

    if (this.head.next === this.head) {
      this.head = null;
      return true;
    }

    let current: N<T> = this.head;
    let prev: N<T> | null = null;

    while (current.next !== this.head) {
      prev = current;
      current = current.next!;
    }

    prev!.next = this.head;
    return true;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    if (!this.head) return false;

    if (this.head.data === data) {
      this.deleteHead();
      return true;
    }

    let current: N<T> = this.head;
    let prev: N<T> | null = null;

    do {
      if (current.data === data) {
        prev!.next = current.next;
        return true;
      }

      prev = current;
      current = current.next!;
    } while (current !== this.head);

    return false;
  }

  /** Finds data at given index */
  find(idx: number): T | null {
    if (!this.head || idx < 0) return null;

    let current = this.head;
    let count = 0;

    do {
      if (!current.next) throw new Error("invalid list");

      if (count === idx) {
        return current.data;
      }

      count++;
      current = current.next;
    } while (current !== this.head);

    return null;
  }

  /** Returns array of node data */
  traverse(): T[] {
    if (!this.head) return [];
    const result: T[] = [];

    let current = this.head;

    do {
      result.push(current.data);
      current = current.next!;
    } while (current !== this.head);

    return result;
  }

  // ┌────────────────────────────┐
  // │ BONUS OPERATIONS
  // └────────────────────────────┘
  /** Searches for node with given data */
  search(data: T): boolean {
    if (!this.head) return false;

    let current = this.head;

    do {
      if (!current.next) throw new Error("invalid list");

      if (current.data === data) {
        return true;
      }

      current = current.next;
    } while (current !== this.head);

    return false;
  }

  /** Returns number of nodes */
  size(): number {
    if (!this.head) return 0;
    let count = 1;
    let current = this.head.next;
    while (current !== this.head) {
      if (!current?.next) throw new Error("invalid list");
      count++;
      current = current.next;
    }
    return count;
  }

  /** Inserts node at given index */
  insertAt(data: T, idx: number): boolean {
    if (idx < 0) return false;

    if (idx === 0) {
      this.prepend(data);
      return true;
    }

    if (!this.head) {
      if (idx === 0) {
        this.prepend(data);
        return true;
      }
      return false;
    }

    let current: N<T> | null = this.head;
    let prev: N<T> | null = null;
    let count = 0;

    do {
      if (count === idx) {
        const newN = new N(data);
        newN.next = current;
        prev!.next = newN;
        return true;
      }
      prev = current;
      current = current!.next;
      count++;
    } while (current !== this.head);

    if (count === idx) {
      this.append(data);
      return true;
    }

    return false;
  }

  /** Removes node at given index */
  deleteAt(idx: number): boolean {
    if (!this.head || idx < 0) return false;

    if (idx === 0) {
      this.deleteHead();
      return true;
    }

    let current: N<T> = this.head;
    let prev: N<T> | null = null;
    let count = 0;

    do {
      if (count === idx) {
        prev!.next = current.next;
        return true;
      }
      prev = current;
      current = current.next!;
      count++;
    } while (current !== this.head);

    return false;
  }
}
