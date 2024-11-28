const str = 'abc'

const iterator = str[Symbol.iterator]()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// import { Hono } from 'hono'
// const app = new Hono()

// app.get('/', (c) => c.text('Hono!'))

// export default app
