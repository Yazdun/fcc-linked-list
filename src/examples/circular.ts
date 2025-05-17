export class N<T> {
  data: T;
  next: N<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class CircularLinkedList<T> {
  head: N<T> | null = null;

  // Adds a new node to the beginning of the list
  unshift(data: T): void {
    const newN = new N(data);
    if (this.head === null) {
      this.head = newN;
      newN.next = this.head;
    } else {
      let last: N<T> | null = this.head;
      while (last!.next !== this.head) {
        last = last!.next;
      }
      newN.next = this.head;
      last!.next = newN;
      this.head = newN;
    }
  }

  // Inserts a new node at the end
  push(data: T): void {
    const newN = new N(data);
    if (this.head === null) {
      this.head = newN;
      newN.next = this.head; // Points to itself
    } else {
      let last: N<T> | null = this.head;
      while (last!.next !== this.head) {
        last = last!.next;
      }
      newN.next = this.head;
      last!.next = newN;
    }
  }

  // Removes the first node in the list
  shift(): void {
    if (this.head === null) {
      return;
    }
    if (this.head.next === this.head) {
      this.head = null;
      return;
    }
    const newHead = this.head!.next!;
    let last: N<T> | null = this.head;
    while (last!.next !== this.head) {
      last = last!.next;
    }
    last!.next = newHead;
    this.head = newHead;
  }

  // Removes the last node
  pop(): void {
    if (this.head === null) {
      return;
    }
    if (this.head.next === this.head) {
      this.head = null;
      return;
    }
    let last: N<T> | null = this.head;
    while (last!.next !== this.head) {
      last = last!.next;
    }
    let secondLast: N<T> | null = this.head;
    while (secondLast!.next !== last) {
      secondLast = secondLast!.next;
    }
    secondLast!.next = this.head;
  }

  // Checks if the given data exists in the list
  search(data: T): boolean {
    if (this.head === null) {
      return false;
    }
    let current: N<T> | null = this.head;
    do {
      if (current!.data === data) {
        return true;
      }
      current = current!.next;
    } while (current !== this.head);
    return false;
  }

  // Gets the data at the specified index (0-based)
  get(index: number): T | null {
    if (this.head === null || index < 0) {
      return null;
    }
    let current: N<T> | null = this.head;
    let count = 0;
    do {
      if (count === index) {
        return current!.data;
      }
      current = current!.next;
      count++;
    } while (current !== this.head);
    return null; // Index out of bounds
  }

  // Inserts a new node at the specified index (0-based)
  insertAt(data: T, index: number): void {
    if (index < 0) {
      return; // Invalid index
    }
    if (index === 0) {
      this.unshift(data);
      return;
    }
    if (this.head === null) {
      if (index === 0) {
        this.unshift(data);
      }
      return; // Cannot insert at non-zero index in empty list
    }
    let current: N<T> | null = this.head;
    let prev: N<T> | null = null;
    let count = 0;
    do {
      if (count === index) {
        const newN = new N(data);
        newN.next = current;
        prev!.next = newN;
        return;
      }
      prev = current;
      current = current!.next;
      count++;
    } while (current !== this.head);
    if (count === index) {
      this.push(data); // Insert at end if index equals size
    }
  }

  // Removes the node at the specified index (0-based)
  removeAt(index: number): void {
    if (this.head === null || index < 0) {
      return;
    }
    if (index === 0) {
      this.shift();
      return;
    }
    let current: N<T> | null = this.head;
    let prev: N<T> | null = null;
    let count = 0;
    do {
      if (count === index) {
        prev!.next = current!.next;
        return;
      }
      prev = current;
      current = current!.next;
      count++;
    } while (current !== this.head);
  }

  // Removes the first occurrence of the given data
  remove(data: T): void {
    if (this.head === null) {
      return;
    }
    if (this.head.data === data) {
      this.shift();
      return;
    }
    let current: N<T> | null = this.head;
    let prev: N<T> | null = null;
    do {
      if (current!.data === data) {
        prev!.next = current!.next;
        return;
      }
      prev = current;
      current = current!.next;
    } while (current !== this.head);
  }

  // Traverses the list and returns elements
  traverse(): T[] {
    if (this.head === null) {
      return [];
    }
    const result: T[] = [];
    let current: N<T> | null = this.head;
    do {
      result.push(current!.data);
      current = current!.next;
    } while (current !== this.head);
    return result;
  }

  // Gets the size of the list
  size(): number {
    if (this.head === null) {
      return 0;
    }
    let count: number = 1;
    let current: N<T> | null = this.head!.next;
    while (current !== this.head) {
      count++;
      current = current!.next;
    }
    return count;
  }
}
