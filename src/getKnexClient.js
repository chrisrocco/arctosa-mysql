const Knex = require('knex')

const getKnexClient = (env) => {
    return Knex({
        client: 'mysql',
        connection: {
            host: env.MYSQL_HOST,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASS,
            database: env.MYSQL_DB
        }
    })
}

module.exports = { getKnexClient }