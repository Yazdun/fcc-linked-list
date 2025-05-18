"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circular_1 = require("./playground/circular");
const list = new circular_1.CircularLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.pop();
console.log(list.traverse());
