export {}
// function add<T1 extends number , T2 extends string >(a:T1, b:T2){
//     return a + b
// }

// type T1 = string | number | undefined
// type T1 = "a" | "b" | "c"

// type T2 = `a ${T1}`

// const a:T2 = "a c"

// function createArray <T = number>(length:number, value:T):T[]{
//     return Array(length).fill(value)
// }
// createArray(1,"a")

// type PringValue = (value:number|string)=>string|number

// const printValue:PringValue = (value)=>{
//     if(typeof value ==="string"){
//         return value.toUpperCase()
//     }
//         return value.toFixed(2)

// }

// function add (a:number, b:string):string{
//     return a+b
// }

// type T1 = typeof add

// const obj = {
//     name:"xamidullo",
//     age:99,
//     gender:"Male",
//     isMerried:false,
//     hobbies:["coding", "tenis", "cs:go","cs.16", 1, true]
// }

// type Person = typeof obj
// interface IPerson  {
//     name:string,
//     age:number
// }

// type keyOfPerson = keyof Person
// type keyOfIPerson = keyof IPerson

// type Name =  string

// const ism:Name =  "a" as const

// const person:{
//     readonly name:string
// } = {
//    name:"ali"
// } as const

// type GetValue<T, K extends keyof T> = (obj:T, key:K)=> T[K]

// const getValue = <T, K extends keyof T>(obj:T, key:K):T[K]=>{
//     return obj[key]
// }

// const car ={
//     name:"BMW",
//     year:2024,
//     model:"M5"
// }
// getValue(car, "name")

// interface IPerson {
//     name: string,
//     age: number
//     gender: "male" | "female",
//     isMerried: boolean
// }

// type MyReadonly<T> = {
//     readonly [P in keyof T]: T[P];
// };

// type MyOptinal<T> = {
//     [P in keyof T]?: T[P];
// };

// type AllRequired<T> = {
//     [P in keyof T]: T[P];
// };

// const person : MyReadonly<IPerson> = {
//     name: "Guli",
//     age: 18,
//     gender: "female",
//     isMerried: true
// }

// type A = MyOptinal<IPerson>
// type B =AllRequired<A>

// const person2 : MyOptinal<IPerson> = {

// }

let promise = (): Promise<string> =>
    new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, 'PROMISE')
    })

// function fetchData (uri:string):Promise<string>{
//     return Promise.resolve("A")
// }

type FetchdataResult = {
    ok: boolean
    data: object | null
    message?: string
}

class MyError extends Error {
    constructor(name: string, message: string) {
        super(message)
        this.name = name
    }
}
async function fetchData(uri: string): Promise<FetchdataResult> {
    try {
        const response = await fetch(uri)
        if (!response.ok) {
            return {
                ok: false,
                data: null,
            }
        }

        throw new MyError(`Qo'lbola XATO`, 'Bu oddiy xato')
    } catch (error) {
        if (error instanceof MyError) {
            return {
                ok: false,
                data: null,
                message: error.name,
            }
        } else if (error instanceof Error) {
            return {
                ok: false,
                data: null,
                message: error.message,
            }
        }
        return {
            ok: false,
            data: null,
        }
    }
}

// const arr: string[][] = [[]]
