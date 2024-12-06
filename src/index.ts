// type T1 = {
//     name: string
//     age: number
// }

import { Agent } from 'http'

// type T2 = {
//     email: string
//     password: string
// }

// // type T3 = T2 & T1
// type T3 = T2 | T1

// const obj: T3 = {
//     name: 'ali',
//     age: 12,
//     email: 'test@test.com',
//     password: 'sas',
// }

// type T1 = 'a' | 'b' | 'c'
// type T2 = 'd' | 'b' | 'c'

// type T3 = T1 & T2
// type T4 = T1 | T2

// interface IPerson {
//     name: string
//     age: number
// }
// interface IPerson {
//     gender: string
// }

// // interface IStudent extends IPerson {
// //     course: string
// // }

// const student: IPerson = {
//     name: 'sa',
//     age: 12,
//     gender: 'M',
// }

// type Add = (a: string) => void

// const add: Add = (a) => {
//     a.toUpperCase()
// }

// interface IPerson {
//     name: string
//     age: number
//     sayHello(): void
// }

// class Peron implements IPerson {
//     name: string
//     age: number
//     constructor() {
//         this.name = '1'
//         this.age = 1
//     }

//     sayHello(): void {
//         console.log(`Hello ${this.name}`)
//     }
// // }

// enum Role {
//     user = 'USER',
//     admin = 'Admin',
//     superAdmin = 'SuperAdmin',
// }

// interface IPerson {
//     name: string
//     age: number
//     gender: string
//     role: Role
// }

// const user: IPerson = {
//     name: 'Ali',
//     age: 12,
//     gender: 'MALE',
//     role: Role['admin'],
//     // role: '
// }

// console.log(user)

// function add(a: string, b: string) {
//     return a + b
// }

// interface Box<Type> {
//     content: Type
// }

// interface Box2<Type1, Type2> {
//     content: Type1
//     model: Type2
// }
// interface StringBox {
//     content: string
// }

// let boxA: Box<string> = {
//     content: 'uzum',
// }
// let boxB: Box<number> = {
//     content: 1,
// }

// let boxC: Box2<number, string> = {
//     content: 1,
//     model: 'A',
// }

// function indentity<T>(arg: T): T {
//     return arg
// }

// function indentity2<T1, T2>(a: T1, b: T2): T1 | T2 {
//     return a
// }

// const i1 = indentity<String>('MEN BU MENR')
// const i2 = indentity<Number>(1)
// const i3 = indentity<boolean>(true)
// const i4 = indentity2<boolean, string>(true, '1')

function createArray<T = string>(length: number, value: T): T[] {
    return Array(length).fill(value)
}

const strArray = createArray<number>(10, 12)
const strArray2 = createArray<boolean>(10, true)
