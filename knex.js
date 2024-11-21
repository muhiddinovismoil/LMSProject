import knex from 'knex'

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
    },
})

// const users = await db.select("*").table('users')
// console.log(users)

// const users = await db.select("users.email as UserEmail").table('users')
// const users = await db
//   .select('*')
//   .fromRaw('(select * from "users" where "id" > ?)', '5');

// // eslint-disable-next-line no-console
// console.log(users)

// console.log(users)

// const result = await db("users")
//   .insert({
// name: "killer",
// email: 'qodirali_coder@gmail.com',
// password: '$2b$10m5O',
// role: 'admin',
// avatar: "https://picsum.photos/4000",
// username: 'qodirali_coder1',
// phone_number: '9499955772',
// is_active: true,
//   })
//   .returning("*")
//   .onConflict('email')
//   .ignore();

// // eslint-disable-next-line no-console
// console.log(result)

// db
//   .transaction(function (trx) {
//     db('users')
//       .transacting(trx)
//       .insert({
//         name: "killer",
//         email: 'qodirali_coder8@gmail.com',
//         password: '$2b$10m5O2trx',
//         role: 'admin',
//         avatar: "https://picsum.photos/4000",
//         username: 'qodirali_coder8',
//         phone_number: '9499955778s',
//         is_active: true,
//       })
//       .returning('*')
//       .then(function (resp) {

//         db('users')
//           .transacting(trx)
//           .where("role", "user")
//           .del()
//           .then(trx.commit)
//           .catch(trx.rollback)
//       })

//   })
//   .then(function (resp) {
//     console.log('Transaction complete.');
//   })
//   .catch(function (err) {
//     console.error(err);
//   });
