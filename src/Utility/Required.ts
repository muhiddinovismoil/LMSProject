export {}
interface User {
    id?: number
    name?: string
    email?: string
}

type MyRequired<T> = {
    [K in keyof T]-?: T[K]
}

type OptinaUser = MyRequired<User>
