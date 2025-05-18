import { CircularLinkedList } from "./playground/circular";

const list = new CircularLinkedList();

list.push(1);
list.push(2);
list.push(3);
list.pop();

console.log(list.traverse());
