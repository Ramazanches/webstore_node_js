const {Schema, model} = require('mongoose')

const User = new Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	isActivated: {type: Boolean, default: false},
	activationLink: {type: String}, //Ссылка активации аккаунта по почте
	roles: {type: Array, ref: 'Role'},
	basket: {type: [String], default: []},
	likes: {type: [String], default: []},
}, 
{
	versionKey: false
})

module.exports = model('User', User)