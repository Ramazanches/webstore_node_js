const {Schema, model} = require('mongoose')

const BasketId = new Schema({ id: String })

module.exports = model('BasketId', BasketId)