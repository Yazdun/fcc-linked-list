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

  // ======= MAIN OPERATIONS =======
  prepend(data: T): void {
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

  append(data: T): void {
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

  deleteHead(): T | null {
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

  deleteTail(): T | null {
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

  delete(data: T): boolean {
    let current = this.head;
    let idx = 0;
    while (current) {
      if (current.data === data) {
        this.removeAt(idx);
        return true;
      }
      current = current.next;
      idx++;
    }
    return false;
  }

  find(idx: number): N<T> | null {
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

  // ======= BONUS OPERATIONS =======
  insertAt(idx: number, data: T): boolean {
    if (idx < 0 || idx > this.len) return false;

    if (idx === 0) {
      this.prepend(data);
      return true;
    }

    if (idx === this.len) {
      this.append(data);
      return true;
    }

    let newNode = new N(data);
    let current = this.find(idx);

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

    if (idx === 0) return this.deleteHead();
    if (idx === this.len - 1) return this.deleteTail();

    let current = this.find(idx);

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

  reverse(): void {
    if (this.len <= 1) return;
    let current = this.head;
    let temp: N<T> | null = null;
    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }
}
