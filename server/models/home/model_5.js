const {Schema, model} = require('mongoose')

const home5 = new Schema({
	table: String,
	sublinkHref: String, 
	sublinkContent: String
})

module.exports = model("Home5", home5)