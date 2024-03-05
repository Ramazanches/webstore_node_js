const {Schema, model} = require('mongoose')

const home2 = new Schema({
	table: String,
	gsap: String
})

module.exports = model("Home2", home2)