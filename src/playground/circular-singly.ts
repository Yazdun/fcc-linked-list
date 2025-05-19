export class N<T> {
  public data: T;
  public next: N<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class CircularSinglyLinkedList<T> {
  public head: N<T> | null = null;

  // ======= MAIN OPERATIONS =======
  // adds a new node with the specified data to the beginning of the list
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

  // adds a new node with the specified data to the end of the list.
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

  // removes the first node from the list
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

  // removes the last node from the list.
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

  // removes the first node with the specified data.
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

  // retrieves the data at the specified index in the list
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

  // ======= BONUS OPERATIONS =======
  // searches for a node with the specified data in the list
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

  // returns the number of nodes in the list.
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

  // inserts a new node with the specified data at the given index.
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

  // removes the node at the specified index.
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

  // traverses the list and returns an array of all data in the order of traversal.
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
}
