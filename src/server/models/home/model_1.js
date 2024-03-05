const {Schema, model} = require('mongoose')

const home1 = new Schema({
	table: String,
	desc: String,
	title: String
})

module.exports = model("Home1", home1)