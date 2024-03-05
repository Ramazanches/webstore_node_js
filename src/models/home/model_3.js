const {Schema, model} = require('mongoose')

const home3 = new Schema({
	table: String,
	bannerTitle: String,
	bannerSubtitle: String,
})

module.exports = model("Home3", home3)