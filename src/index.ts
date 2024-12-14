import { Role as UserRole } from '@app/index'
// import { Role as A } from './app/index.ts'

// Typescript asoslari-1. TS tiplari. Array, Tuple, Alias, Union, Function, Literal type, Object type,
const b: string = 'SALOM DUNYO'
console.log(b.toLowerCase())
let d: number = 12
d.toString()

const isMerried: boolean = true

let r: null

let j: undefined

let l: bigint = 1n

let symbol: symbol = Symbol('a')

// let d = '12' as string

let ageOfPerson = 12

const arr1: Array<number> = [1, 2, 3, 4]
const arr2: number[] = [1, 2, 3, 4]
const arr3 = [1, 2, 3, 4] as Array<number>
const arr4 = [1, 2, 3, 4] as number[]
const arr5: Array<number | string> = [1, 'sas', 'sa', 11]
const arr6: Array<Array<number>> = [[1]] // nested array - ichma ich array
const arr7: Array<any> = [1, 3, 'sasa', true, Symbol(1), null, undefined, 1n] //
const arr8: (string | number | null)[] = [1, 3, 'sasa', null]

type myArray = Array<string>

type superMytype = myArray & Array<number>

const myStringArray: myArray = ['1', 'salom']
const myStringArray2: myArray = ['1', 'salom']
const myStringArray3: myArray = ['1', 'salom']
const myStringArray4: myArray = ['1', 'salom']

const superArr: Array<any> = [1, 2, 3]

///  alias
type numberOrString = number | string

type stringOrNull = string | null | number | boolean
// const str: numberOrString = 12
// const str: numberOrString = '12'
// const str: numberOrString = true

type Person = {
    name: string
    age: number
    isMerried?: boolean
}

const obj: Person = {
    name: 'john',
    age: 21,
    isMerried: true,
}

const obj2: Person = {
    name: 'john',
    age: 12,
}

type Student = Person & {
    univer: string
    course: 1 | 2 | 3 | 4
}

const ozodbek: Student = {
    name: 'Ozozbek',
    age: 19,
    isMerried: false,
    univer: 'TATU',
    course: 2,
}

const tuple: [string, number] = ['salom', 1]
const tuple2: [string, number, boolean, number] = ['salom', 1, true, 1]

let str: 12 = 12

str = 12

let newType: string = str + 'salm'
// if (str === 12) {

// }

type Role = 'admin' | 'user' | 'manager'

const userRole: Role = 'admin'

function toUpper(str: string): string {
    return str.toUpperCase()
}
console.log(toUpper('asasa')) // bu katta harfda qilib beradi!.

// let a: any = 'guli'
let a: unknown = 12

// console.log(a.toString())
if (typeof a === 'string') {
    console.log(a.toUpperCase())
} else if (typeof a === 'number') {
    console.log(a.toString())
}

// function inFunc(): never {
//     for (let i: number = 0; i < Infinity; i++) {}

//     return 1
// }
// function inFunc(): never {
//     throw new Error('a')
// }

function inFunc(a: number | string): string {
    if (typeof a === 'number') {
        return a.toString().toUpperCase()
    }
    return a.toUpperCase()
}

type TodoType = {
    userId: number
    id: number
    title: string
    complited: boolean
}

type emptyTodoType = {
    ok: boolean
    error?: Error
    data?: string
}

// async function fetchData(uri: string): Promise<TodoType[] | emptyTodoType> {
//     try {
//         const response: Response = await fetch(uri)
//         if (!response.ok) {
//             return {
//                 ok: false,
//             }
//         }
//         const result: TodoType[] = await response.json()

//         return result
//     } catch (error) {
//         return {
//             ok: false,
//         }
//     }
// }

// fetchData('https://jsonplaceholder.typicode.com/todos')
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((err) => {
//         console.error(err)
//     })

// let s: any = 12

// s.toString()

// let s: unknown = 12

// s.toString()

// function unknownFunc ()
