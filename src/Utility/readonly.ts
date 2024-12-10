export {}

type MyReadOnly<T> = {
    readonly [P in keyof T]: T[P]
}

interface Person {
    name: string
    age: number
    gender: 'male' | 'female'
    address: string
}

type ReadonlyPeron = MyReadOnly<Person>

type MyRecord<T, K> = {
    [P in keyof T]: K
}

type T1 = MyRecord<Person, boolean>

const a: T1 = {
    name: true,
    age: false,
    gender: false,
    address: true,
}
