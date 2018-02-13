import List from './src/list/list';
import Node from './src/list/node';

let list = new List;
list.add(new Node(5));
list.add(new Node(10));
list.add(new Node(3));
list.add(new Node(null));
list.add(106);
list.remove(7)
list.remove(-56)

let emptyList = new List;
emptyList.remove(new Node(-56));
emptyList.find(new Node(2));

let a = list.find(5);
let b = list.find(3);
let c = list.find(10);

let string = list.toString();
let array = list.toArray();

console.log("");
