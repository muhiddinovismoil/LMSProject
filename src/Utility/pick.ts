interface User {
    id: number
    name: string
    email: string
    password: string
    gender: 'male' | 'female'
    age: string
}

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type UserNameAndEmail = MyPick<User, 'email' | 'password'>

const user: UserNameAndEmail = {
    password: 'qwer12345',
    email: 'alice@example.com',
}

console.log(user) // { name: 'Alice', email: 'alice@example.com' }
