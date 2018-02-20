'use strict';

// import { Node, List } from './src/list';
// import { SkipNode, SkipList } from './src/skip-list';
import { Node, BST } from './src/bst/index';

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
//
//   let numberDesc = (a, b) => (b - a);
//   let idAsc = (a, b) => (a.id - b.id);
//
//   let list = new SkipList();
//
//   list.add(1).add(2).add(3).add(4).add(5).add(6).add(7).add(8);
//   let y = list.find(new SkipNode(8));
//
//   console.log(list.printLevels());
//
//   let peopleList = new SkipList({comparator: idAsc, height: 3});
//   peopleList.remove({id: 321}).
//              add({id: 4, name: 'Dennis'}).
//              add({id: 22, name: 'John'}).
//              add({id: 3, name: 'Charlie'}).
//              add({id: 5, name: 'Endrju'}).
//              add({id: 1, name: 'Andrzej'}).
//              remove({id: 66});
//
//   console.log(peopleList.printLevels('name'));
//
//   console.log(list.toArray());
//   console.log(peopleList.toArray('name'));
//
//   console.log(list.toString());
//   console.log(peopleList.toString('name'));

let tree = new BST();
tree.add(new Node(30));
tree.add(new Node(30));
tree.add(new Node(30));
tree.add(new Node(30));
tree.add(new Node(30));


let x = tree.find(new Node(40));
let a = tree._findSuccessor(x);
// let b = tree._findSuccessor(tree.find(new Node(30)));
// let c = tree._findSuccessor(tree.find(new Node(39)));


{}