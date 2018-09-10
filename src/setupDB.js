const setupDB = env => async (knex) => {

    if(await knex.schema.hasTable('sales')) {
        if(env.DESTROY_TABLES) {
            console.log('destroying sales table')
            await knex.schema.dropTable('sales')
        } else {
            console.log('"sales" table already exists. skipping creation.')
            return
        }
    }

    console.log('creating "sales" table because it does not exist')

    await knex.schema.createTable('sales', table => {
        table.string('product_id')
        table.string('market_id')
        table.string('title')
        table.string('price')

        table.string('category_id')
        table.string('category_name')
        table.string('selling_state')
        table.string('end_time')
        table.string('payment_method')
        table.string('location')

        table.string('sellerUserName')

        table.timestamps()
    })

    console.log('successfully created "sales" table.')
    return
}

module.exports = { setupDB }