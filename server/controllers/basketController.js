const ApiError = require('../errors/ApiError')
const User = require('../models/user')
const Product = require('../models/product')

class BasketController {
	
	async addProduct (req, res) {
		try {
			const { email, data } = req.body
			const user = await User.findOne({ 
				email: email
			})
			const newData = user.basket.concat(data)
			console.log(newData)
			user.basket = [...new Set(newData)]
			console.log(user)		

			user.save()
		} catch (e) {
			return ApiError.InternalServer()
			console.warn(e)
		}
	}

	async getAll (req, res) {
		try {
			
		} catch (e) {
			console.warn(e)
		}
	}

	async deleteOne (req, res) {
		try {

			const { id } = req.body
			
		} catch (e) {
			console.warn(e)
		}
	}

	async deleteAll (req, res) {
		try {
			
		} catch (e) {
			console.warn(e)
		}
	}
}

module.exports = new BasketController