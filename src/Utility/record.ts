export {}
interface Person {
    name: string
    age: number
    gender: 'male' | 'female'
    address: string
}

type User = keyof Person
type UserRoles = 'admin' | 'user' | 'guest'

type UserPermissions = Record<User, UserRoles>

const permissions: UserPermissions = {
    name: 'admin',
    age: 'guest',
    gender: 'user',
    address: 'user',
}

console.log(permissions)
