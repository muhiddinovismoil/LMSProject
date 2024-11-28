let counter = 0
let limit = 5

const iteratorObjectProtocol = {
    next() {
        counter++
        if (counter >= limit) {
            return { values: undefined, done: true }
        }

        return { value: counter, done: false }
    },
}

// console.log(iteratorObjectProtocol.next());
// console.log(iteratorObjectProtocol.next());
// console.log(iteratorObjectProtocol.next());
// console.log(iteratorObjectProtocol.next());
// console.log(iteratorObjectProtocol.next());
// console.log(iteratorObjectProtocol.next());

// const customObj = {
//   [Symbol.iterator]: function () {
//     return iteratorObjectProtocol
//   }
// }

// console.log(...customObj);

// const obj = {
//   name: "alex",
//   age: 44
// }
// for (const item in obj) {
//   console.log(item);
// }
// console.log(...obj)

// console.log(...iteratorObjectProtocol)
// console.log(...customObj)

const str = 'abc'

const iterator = str[Symbol.iterator]()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
