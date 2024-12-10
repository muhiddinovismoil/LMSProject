type NullableUser = {
    id: number
    name: string | null
    email?: string
}

type NonNullableUser = NonNullable<NullableUser['name']>
// type NonNullableUser = string;

function processUser(name: NonNullableUser) {
    console.log(`Processing user: ${name}`)
}

// processUser(null); // Xato: 'null' turi 'string' turiga mos kelmaydi.
processUser('Alice') // Processing user: Alice
