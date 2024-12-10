function createUser(name: string, age: number, email: string) {
    return { name, age, email }
}

type CreateUserParams = Parameters<typeof createUser>
// type CreateUserParams = [string, number, string];

const userParams: CreateUserParams = ['Alice', 30, 'alice@example.com']
const newUser = createUser(...userParams)
console.log(newUser) // { name: 'Alice', age: 30, email: 'alice@example.com' }
