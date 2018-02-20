'use strict';

// import { Node, List } from './src/list';
import { SkipNode, SkipList } from './src/skip-list';
// import { Node, BST } from './src/bst';

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
const skipList = new SkipList();

const numberDesc = (a, b) => (b - a);
const idAsc = (a, b) => (a.id - b.id);

const list = new SkipList();

const array = [];
let rand;
for(let i = 0; i < 10000; i++){
  rand = Math.floor(Math.random() * 10);
  array.push(rand);
  list.add(rand);
}

for(let j = 0; j < array.length; j++){
  if(j % 4 === 0) list.remove(array[j]);
}

console.log(list.toArray().length);


// // Init some constants
// const bst = new BST();
// const iterations = 100;
// const vector = Array.from({length: iterations},
//   () => Math.floor(Math.random() * iterations * 2));
// // Prepare expected array - should be without duplicates and sorted
// const expected = Array.from(new Set(vector))
//                        .sort((a, b) => a - b);
//
// // Add items to the tree
// for (let number of vector) {
//   bst.add(new Node(number));
// }
//
// // Get in-order result as an array
// const result = bst.toArray();
//
// // Result array's length doesn't match expected array's length
// if (expected.length !== result.length) {
//   throw new Error('Fuck!');
// }
//
// // Check if every element of the result matches expected
// for (let i = 0; i < expected.length; i++) {
//   if (expected[i] !== result[i]) {
//     throw new Error('Yikes!');
//   }
// }

{}