class N<T> {
  public value: T;
  public next: N<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  protected head: N<T> | null = null;

  append(val: T): void {
    const newNode = new N(val);

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

  delete(val: T): void {
    if (!this.head) return;

    if (this.head.value === val) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    while (current.next) {
      if (current.next.value === val) {
        current.next = current.next.next;
        return;
      }

      current = current.next;
    }
  }

  search(val: T): N<T> | null {
    if (!this.head) return null;

    let current: N<T> | null = this.head;

    while (current) {
      if (current.value === val) return current;
      current = current.next;
    }

    return null;
  }

  traverse(): void {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }

  insertAt(pos: number, val: T): void {
    const newNode = new N(val);
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

  deleteAt(pos: number): void {
    let current: N<T> | null = this.head;
    let idx = 0;

    if (pos === 0) {
      this.head = current?.next ?? null;
    }

    while (current && idx < pos - 1) {
      current = current.next;
      idx++;
    }

    if (current && current.next) {
      current.next = current.next.next;
    }
  }

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

  findMiddle(): N<T> | null {
    let slow: N<T> | null = this.head;
    let fast: N<T> | null | undefined = this.head;

    while (fast && fast.next) {
      slow = slow?.next ?? null;
      fast = fast.next.next;
    }

    return slow;
  }
}
