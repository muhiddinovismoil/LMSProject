export {}
class User {
    constructor(
        public name: string,
        public age: number,
        public email: string,
    ) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>
// type UserConstructorParams = [string, number, string];

const userParams: UserConstructorParams = ['Alice', 30, 'alice@example.com']
const newUser = new User(...userParams)
console.log(newUser) // User { name: 'Alice', age: 30, email: 'alice@example.com' }
