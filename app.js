'use strict';

// import { Node, List } from './src/list';
import { SkipNode, SkipList } from './src/skip-list';

// {
// function descOrder (a, b) {
//   return a < b;
// }
//
// function randomOrder (a, b) {
//   return Math.random() > 0.5;
// }
//
// function ascByAge (a, b) {
//   return a.age > b.age;
// }
//
// let list = new List(randomOrder);
// list.add(new Node(5))
//     .add(new Node(3))
//     .add(10)
//     .add(20)
//     .add(15)
//     .remove(7)
//     .remove(-56);
//
// let found = list.find(5);
//
// let emptyList = new List();
// emptyList.remove(new Node(-56));
// emptyList.find(new Node(2));
//
// let string = list.toString();
// let array = list.toArray();
//
// let listOfPeople = new List(ascByAge);
// listOfPeople.add({name: 'Piotr', age: 24})
//             .add({name: 'Osoba1', age: -100})
//             .add({name: 'Osoba2', age: 100});
//
// let skipList = new SkipList();
// }
let numberDesc = (a, b) => (a < b) ? 1 : ((a > b) ? -1 : 0);
let idAsc = (a, b) => (a.id > b.id) ? 1 : ((a.id < b.id) ? -1 : 0);

let list = new SkipList(6, numberDesc);
list.remove(222).
     add(new SkipNode(7)).
     add(new SkipNode(6)).
     add(5).
     add(105).
     add(222).
     add(new SkipNode(4)).
     add(new SkipNode(3)).
     add(new SkipNode(2)).
     add(new SkipNode(1)).
     remove(4).
     remove(5);

let peopleList = new SkipList(4, idAsc);
peopleList.remove({id: 321}).
           add({id: 4, name: 'Dennis'}).
           add({id: 22, name: 'John'}).
           add({id: 3, name: 'Charlie'}).
           add({id: 5, name: 'Endrju'}).
           add({id: 1, name: 'Andrzej'}).
           remove({id: 66});

console.log(list.printLevels());
console.log(peopleList.printLevels('name'));
{}