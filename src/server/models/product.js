const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')

const Product = new Schema({
	table: { type: String, default: 'tableName'},
	img: { type: String },
	imgAlt: { type: String, default: 'alt'},
	price: { type: Number },
	prevPrice: { type: Number },
	brand: { type: String },
	prodname: { type: String },
	description: { type: String },
	size: { type: String },
	material: { type: String },
	colors: { type: String },
	shewingPeriod: { type: String },
	deliveryTime: { type: String },
	optional: {type: String },
	likes: { type: Number, default: null},
	views: { type: Number, default: 0},	
})


module.exports = model("Product", Product)