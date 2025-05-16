"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doubly_1 = require("./playground/doubly");
const list = new doubly_1.DoublyLinkedList();
list.push("A");
const t = list.get(1);
console.log(t);
