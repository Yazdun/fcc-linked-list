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

  push(data: T): void {
    let newNode = new N(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.len++;
  }

  pop(): T | null {
    if (!this.tail) return null;

    let removedItem = this.tail;

    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
      removedItem.prev = null;
    }

    this.len--;

    return removedItem.data;
  }

  unshift(data: T): void {
    let newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let prevHead = this.head;
      newNode.next = prevHead;
      prevHead.prev = newNode;
      this.head = newNode;
    }

    this.len++;
  }

  shift(): T | null {
    if (!this.head) return null;

    let removedItem = this.head;

    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedItem.next;
      this.head!.prev = null;
      removedItem.next = null;
    }

    this.len--;

    return removedItem.data;
  }

  get(idx: number): N<T> | null {
    if (idx < 0 || idx >= this.len) return null;

    let current: N<T> | null = this.head;

    if (idx <= this.len / 2) {
      current = this.head;
      for (let i = 0; i < idx; i++) {
        current = current!.next;
      }
    } else {
      current = this.tail;
      for (let i = this.len - 1; i > idx; i--) {
        current = current?.prev ?? null;
      }
    }

    return current;
  }

  insertAt(idx: number, data: T): boolean {
    if (idx < 0 || idx > this.len) return false;

    if (idx === 0) {
      this.unshift(data);
      return true;
    }

    if (idx === this.len) {
      this.push(data);
      return true;
    }

    let newNode = new N(data);
    let current = this.get(idx);

    if (!current) return false;

    newNode.next = current;
    newNode.prev = current?.prev ?? null;
    current.prev!.next = newNode;
    current.prev = newNode;

    this.len++;

    return true;
  }

  removeAt(idx: number): T | null {
    if (idx < 0 || idx >= this.len) return null;

    if (idx === 0) return this.shift();
    if (idx === this.len - 1) return this.pop();

    let current = this.get(idx);

    if (!current) return null;

    current.next!.prev = current!.prev;
    current.prev!.next = current!.next;
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
