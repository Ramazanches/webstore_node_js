const {Schema, model} = require('mongoose')

const home = new Schema({
	table: String,
	desc: String,
	title: String,
	table: String,
	gsap: String,
	table: String,
	bannerTitle: String,
	bannerSubtitle: String,
	buttonText: String,
	table: String,
	linkGoto: String,
	linkContent: String,
	table: String,
	sublinkHref: String, 
	sublinkClass: String, 
	sublinkContent: String,
	table: String,
	slidesPath: String,
	slidesTitle: String,
	table: String,
	badgesPath: String,
	badgesTitle: String
})

module.exports = model("Home", home)