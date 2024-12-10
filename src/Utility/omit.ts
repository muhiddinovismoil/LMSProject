export {}
interface User {
    id: number
    name: string
    email: string
    password: string
    gender: 'male' | 'female'
    age: number
}

type UserWithoutEmail = Omit<User, 'password'>

type MyExclude<T, U> = T extends U ? never : T

type T1 = MyExclude<keyof User, 'password'>
type T2 = Pick<User, T1>

const user: T2 = {
    id: 1,
    name: 'Alice',
    age: 12,
    gender: 'male',
    email: 'test@test.com',
}

console.log(user) // { id: 1, name: 'Alice' }
