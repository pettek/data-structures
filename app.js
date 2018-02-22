'use strict';

// import { Node, List } from './src/list';
// import { SkipNode, SkipList } from './src/skip-list';
import { Node, BST, DSWBalancer } from './src/bst';

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

// const bst = new SkipList();
//
// const numberDesc = (a, b) => (b - a);
// const idAsc = (a, b) => (a.id - b.id);
//
// const list = new SkipList();
//
// const array = [];
// const expected = [];
// let rand;
// const howMany = 15000;
//
// for (let m = 0; m < howMany; m++) {
//   rand = Math.floor(Math.random() * 10000000000000000000000);
//   array.push(rand);
// }
//
// const t0 = new Date().getTime();
// for (let i = 0; i < howMany; i++) {
//   list.add(array[i]);
// }
// const t1 = new Date().getTime();
//
//
// const afterAddLength = list.toArray().length;
//
// let arrSorted = array.sort((a, b) => a - b);
//
// for (let n = 0; n < list.length; n++) {
//   if (list.toArray()[n] !== arrSorted[n]) {
//     console.log('Error on add');
//   }
// }
//
// for (let j = 0; j < array.length; j++) {
//   // let lengthBefore = list.toArray().length;
//   list.remove(array[j]);
//   // if (list.toArray().length === lengthBefore) {
//   //   console.log('Element ' + array[j] + ' was not removed...');
//   // }
// }
//
// const t2 = new Date().getTime();
//
// let expSorted = expected.sort((a, b) => a - b);
// let listSorted = list.toArray();
//
// for (let k = 0; k < expSorted.length; k++) {
//   if (expSorted[k] !== listSorted[k]) {
//     console.log('Error on remove');
//   }
// }
//
//
// console.log('Adding ' + (t1 - t0) + ' milliseconds.');
// console.log('Outputed length after add: ' + afterAddLength);
// console.log('Deleting ' + (t2 - t1) + ' milliseconds.');
// console.log('Expected length: ' + expSorted.length);
// console.log('Outputed length: ' + listSorted.length);

// const bst = new SkipList({comparator: (a, b) => (a - b)});
//
// bst.add(1);
// bst.add(1);
// bst.add(1);
// bst.add(1);
// bst.add(1);
// bst.remove(1);
// bst.remove(1);
// bst.remove(1);
// console.log(bst.toArray());

//
// {}

// // Init some constants
// const bst = new BST();
// const iterations = 1000;
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
//
// const tree = new BST();
// for(let i = 1; i <= 127; i++) {
//   tree.add(i);
// }
// console.log(tree.toString());
// tree.balance(new DSWBalancer());
// {}

const bst = new BST();
const iterations = 50000;
const vector =Array.from({length: iterations},
 () => Math.floor(Math.random() * iterations * 5));
 // Prepare expected array - should be without duplicates and sorted*/
const expected = Array.from(new Set(vector)).sort((a, b) => a - b);
console.log(expected);
// Add items to the tree
for (let number of vector) {
  bst.add(number);
}

// Get in-order result as an array
let result = bst.toArray();
console.log(result);
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


for (let i = 0; i < expected.length; i+=2) {
  bst.remove(expected[i]);
}
result = bst.toArray();
console.log(vector);
console.log(result);
// Check if every element of the result matches expected
let y = 0;
for (let a = 1; a < expected.length; a+=2) {

  if (expected[a] !== result[y]) {
    throw new Error('Yikes!');
  }
  y++;
}