const lodash = require('lodash')

const itemsWriter = knex => async (arctosaPayload) => {

    const dbRows = arctosaPayload.items.map(item => ({
        "product_id": item.itemId,
        "market_id": arctosaPayload.market_id,
        "title": item.title,
        "price": lodash.get(item, 'sellingStatus.currentPrice.__value__', -1),
        "category_id": lodash.get(item, 'primaryCategory.categoryId'),
        "category_name": lodash.get(item, 'primaryCategory.categoryName'),
        "selling_state": lodash.get(item, 'sellingStatus.sellingState'),
        "payment_method": item.paymentMethod,
        "sellerUserName": lodash.get(item, 'sellerInfo.sellerUserName', 'Anon'),
        "location": item.location
    }))

    // TODO - batch inserts
    const promises = dbRows.map(row => knex('sales').insert(row))
    
    return await Promise.all(promises)
}

module.exports = {itemsWriter}