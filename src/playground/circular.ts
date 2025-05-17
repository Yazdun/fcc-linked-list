export class N<T> {
  public data: T;
  public next: N<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class CircularLinkedList<T> {
  public head: N<T> | null = null;

  unshift(data: T) {
    let newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
    } else {
      let last = this.head;

      while (last !== this.head) {
        if (!last.next) throw new Error("invalid list");
        last = last.next;
      }

      last.next = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  }
}
