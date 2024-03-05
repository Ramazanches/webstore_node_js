const {Schema, model} = require('mongoose')

const home4 = new Schema({
	table: String,
	linkHref: String,
	linkContent: String,
	subMenu: {type: Boolean, default: false}
})

module.exports = model("Home4", home4)