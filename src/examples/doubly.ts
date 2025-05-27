/** Node for doubly linked list */
export class N<T> {
  /** Node data */
  data: T;
  /** Next node reference */
  next: N<T> | null;
  /** Previous node reference */
  prev: N<T> | null;

  /** Creates a node with given data */
  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

/** Doubly linked list implementation */
export class DoublyLinkedList<T> {
  /** Head node */
  public head: N<T> | null;
  /** Tail node */
  public tail: N<T> | null;
  /** List length */
  public len: number;

  /** Creates an empty list */
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  /** Adds node to list start */
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

  /** Adds node to list end */
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

  /** Removes and returns head node data */
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

  /** Removes and returns tail node data */
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

  /** Removes first node with given data */
  delete(data: T): boolean {
    let current = this.head;

    if (!current) return false;

    if (current.data === data) {
      this.head = current.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
      this.len--;
      return true;
    }

    while (current.next) {
      if (current.next.data === data) {
        let nodeToRemove = current.next;
        current.next = nodeToRemove.next;
        if (current.next) current.next.prev = current;
        else this.tail = current;
        nodeToRemove.next = null;
        nodeToRemove.prev = null;
        this.len--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  /** Finds node at given index */
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

  /** Returns array of node data */
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

  /** Inserts node at given index */
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
}
