export {}
type UserRoles = 'admin' | 'user' | 'guest'
type AdminRoles = 'admin' | 'superadmin'

type T1 = UserRoles & AdminRoles
type T2 = UserRoles | AdminRoles

type CommonRoles = Extract<UserRoles, AdminRoles>
// type CommonRoles = "admin";

function assignRole(role: CommonRoles) {
    console.log(`Assigning role: ${role}`)
}

assignRole('admin') // Assigning role: admin
assignRole('admin') // Xato: 'user' turi 'admin' turiga mos kelmaydi.
