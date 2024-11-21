/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'products'

export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary()
        table.string('name').notNullable().unique()
        table.string('category').notNullable()
        table.decimal('price').notNullable()
        table.timestamps(true, true)
    })
}

export async function down(knex) {
    await knex.schema.dropTable(tableName)
}
