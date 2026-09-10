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
  removeFromFront() {
    this.head = this.head.next;
    this.length -= 1;
  }
}

let list1 = new SingleLinkedList();
list1.addToFront(45);
list1.addToFront(35);
list1.addToFront(25);

console.log(list1);
