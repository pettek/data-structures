'use strict';

// import { Node, List } from './src/list';
// import { SkipNode, SkipList } from './src/skip-list';
import { Node, BST } from './src/bst';

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
// let numberDesc = (a, b) => (b - a);
// let idAsc = (a, b) => (a.id - b.id);
//
// let list = new SkipList();
//
//
// let array = [];
// for (let i = 0; i < 1000; i++) {
//   let randomValue = Math.floor(Math.random() * 1000);
//   array.push(randomValue);
//   list.add(randomValue);
// }
// console.log(list.printLevels());
// let start = new Date().getTime();
// for (let i = 0; i < array.length; i++) {
//   console.log('loop ' + i);
//   list.remove(array[i]);
// }
// console.log(new Date().getTime() - start + " ms");
//
// console.log("remaining: "+ list.toString());

// const tree = new BST();
// tree.add(new Node(30));
// tree.add(new Node(40));
// tree.add(new Node(45));
//
// tree.remove(new Node(30));
//
// console.log(tree.toArray());

// Init some constants
const bst = new BST();
const iterations = 100;
const vector = Array.from({length: iterations},
  () => Math.floor(Math.random() * iterations * 2));
// Prepare expected array - should be without duplicates and sorted
const expected = Array.from(new Set(vector))
                       .sort((a, b) => a - b);

// Add items to the tree
for (let number of vector) {
  bst.add(new Node(number));
}

// Get in-order result as an array
const result = bst.toArray();

// Result array's length doesn't match expected array's length
if (expected.length !== result.length) {
  throw new Error('Fuck!');
}

// Check if every element of the result matches expected
for (let i = 0; i < expected.length; i++) {
  if (expected[i] !== result[i]) {
    throw new Error('Yikes!');
  }
}

{}