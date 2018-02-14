'use strict';

import {Node, List} from './src/list';

function descOrder(a, b) {
    return a < b;
}

function randomOrder(a, b) {
    return Math.random() > 0.5;
}

function ascByAge(a, b){
    return a.age > b.age;
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

let listOfPeople = new List(ascByAge);
listOfPeople.add({name: 'Piotr', age: 24});
listOfPeople.add({name: 'Osoba1', age: -100});
listOfPeople.add({name: 'Osoba2', age: 100});

{}
