/**
 *
 * @param {number} a
 * @param {number} b
 * @returns
 */
const add = (a, b) => {
    return a + b
}

/**
 *
 * @param {string} name
 * @param {number} age
 * @param {string} gender
 */
function Person(name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
}

const person = new Person(1, 'b', true)

// console.log(person);

console.log(1)
const promise = new Promise((resolve) => {
    console.log(2)
    resolve()
    console.log(3)
})

console.log(4)

promise
    .then(() => {
        console.log(5)
    })
    .then(() => {
        console.log(6)
    })

console.log(7)

setTimeout(() => {
    console.log(8)
}, 10)

setTimeout(() => {
    console.log(9)
}, 0)
