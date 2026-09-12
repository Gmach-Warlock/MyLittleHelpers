class Node {
  value;
  next = null;
  constructor(value) {
    this.value = value;
  }
}

class SingleLinkedList {
  head = null;
  length = 0;
  addToFront(value) {
    let temp = this.head;
    this.head = new Node(value);
    this.head.next = temp;
    this.length += 1;
  }
  addToBack(value) {
    if (!this.head) {
      this.head = new Node(value);
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = new Node(value);
    this.length++;
  }
  removeHead() {
    this.head = this.head.next;
    this.length -= 1;
  }
  removeTail() {
    if (this.head.next === null) {
      this.head = null;
    }
    let current = this.head;
    for (let i = 0; i < this.length - 2; i++) {
      current = current.next;
    }
    current.next = null;
  }
  insertAtIndex(index, value) {
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
  }
  print() {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current) {
        console.log(current.value);
        current = current.next;
      }
    }
  }
}

let list1 = new SingleLinkedList();
list1.addToFront(1);
list1.addToFront(2);
list1.addToFront(3);
list1.addToFront(4);
list1.addToFront(5);
list1.addToBack(6);
list1.removeHead();
list1.removeTail();
list1.insertAtIndex(2, 30);
list1.print();
