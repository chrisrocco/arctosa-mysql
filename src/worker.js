const {setupDB} = require("./setupDB")
const {getKnexClient} = require('./getKnexClient')
const {itemsWriter} = require('./itemsWriter')

const PubSub = require('@google-cloud/pubsub')
const dotenv = require('dotenv')

dotenv.config()
const {env} = process

const main = async () => {
    const pubsub = new PubSub()
    const subscription = pubsub.subscription('rdbs-stream')
    const knex = getKnexClient(env)
    const writeHandler = itemsWriter(knex)

    await setupDB(env)(knex)

    subscription.on('message', async  event => {
        const payload = JSON.parse(event.data.toString())

        try {
            console.log('attempting insert..')
            await writeHandler(payload)
            console.log('insert succeeded!')
            event.ack()
        } catch (insertError) {
            console.log('insert failed..')
            event.ack()
        }

        console.log()
    })
}

main()
console.log('Listening for messages...')
