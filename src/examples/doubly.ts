export class N<T> {
  data: T;
  next: N<T> | null;
  prev: N<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList<T> {
  public head: N<T> | null;
  public tail: N<T> | null;
  public len: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  // Add to the end - O(1)
  push(data: T): void {
    const newN = new N(data);
    if (!this.head) {
      this.head = newN;
      this.tail = newN;
    } else {
      this.tail!.next = newN;
      newN.prev = this.tail;
      this.tail = newN;
    }
    this.len++;
  }

  // Remove from the end - O(1)
  pop(): T | null {
    if (!this.tail) return null;
    const removed = this.tail;
    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
      removed.prev = null;
    }
    this.len--;
    return removed.data;
  }

  // Add to the beginning - O(1)
  unshift(data: T): void {
    const newN = new N(data);
    if (!this.head) {
      this.head = newN;
      this.tail = newN;
    } else {
      newN.next = this.head;
      this.head.prev = newN;
      this.head = newN;
    }
    this.len++;
  }

  // Remove from the beginning - O(1)
  shift(): T | null {
    if (!this.head) return null;
    const removed = this.head;
    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head!.prev = null;
      removed.next = null;
    }
    this.len--;
    return removed.data;
  }

  // Get data at index, optimized - O(n/2)
  get(index: number): N<T> | null {
    if (index < 0 || index >= this.len) return null;
    let current: N<T> | null;
    if (index <= this.len / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current!.next;
      }
    } else {
      current = this.tail;
      for (let i = this.len - 1; i > index; i--) {
        current = current!.prev;
      }
    }
    return current;
  }

  // Insert at index - O(n)
  insertAt(index: number, data: T): boolean {
    if (index < 0 || index > this.len) return false;
    if (index === 0) {
      this.unshift(data);
      return true;
    }
    if (index === this.len) {
      this.push(data);
      return true;
    }
    const newN = new N(data);
    const current = this.get(index);
    if (!current) return false;
    newN.next = current;
    newN.prev = current.prev;
    current.prev!.next = newN;
    current.prev = newN;
    this.len++;
    return true;
  }

  // Remove at index - O(n)
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.len) return null;
    if (index === 0) return this.shift();
    if (index === this.len - 1) return this.pop();
    const current = this.get(index);
    if (!current) return null;
    current.prev!.next = current.next;
    current.next!.prev = current.prev;
    current.next = null;
    current.prev = null;
    this.len--;
    return current.data;
  }

  traverse(dir: "forward" | "backward" = "forward"): T[] {
    const isForward = dir === "forward";
    let current = isForward ? this.head : this.tail;
    const result: T[] = [];

    while (current) {
      result.push(current.data);
      current = isForward ? current.next : current.prev;
    }

    return result;
  }
}
