/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'todos'

export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.timestamps(true, true)
    })
}

export async function down(knex) {
    await knex.schema.dropTable(tableName)
}
