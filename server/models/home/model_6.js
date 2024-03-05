const {Schema, model} = require('mongoose')

const home6 = new Schema({
	table: String,
	slidesPath: String,
	slidesTitle: String
})

module.exports = model("Home6", home6)