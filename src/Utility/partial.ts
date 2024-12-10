interface User {
    id: number
    name: string
    email: string
}

type MyPartial<T> = {
    [P in keyof T]?: T[P]
}

type OptinaUser = MyPartial<User>
