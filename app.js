'use strict';

import List from './src/list/list';
import Node from './src/list/node';

function descOrder(a, b) {
    return a < b;
}

function randomOrder(a, b) {
    return Math.random() > 0.5;
}

let list = new List(randomOrder);
list.add(new Node(5));
list.add(new Node(3));
list.add(10);
list.add(20);
list.add(15);
list.remove(7);
list.remove(-56);
let found = list.find(5);

let emptyList = new List();
emptyList.remove(new Node(-56));
emptyList.find(new Node(2));

let string = list.toString();
let array = list.toArray();