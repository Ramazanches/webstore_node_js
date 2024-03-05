const {Schema, model} = require('mongoose')

const home7 = new Schema({
	table: String,
	badgesPath: String,
	badgesTitle: String
})


module.exports = model("Home7", home7)