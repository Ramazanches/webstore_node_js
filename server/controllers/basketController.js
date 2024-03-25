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
			user.basket = [...new Set(newData)]

			user.save()
		} catch (e) {
			return ApiError.InternalServer()
			console.warn(e)
		}
	}

	async getAll (req, res) {
		try {
			let { email } = req.cookies,
					products = [],
					user

			if (email) {
				user = await User.findOne({ email: email })
			}
				
			if (user) {
				new Promise(async (resolve) => {
					for (let i = 0; i < user.basket.length; i++) {
						const id = user.basket[i]
						const item = await Product.findOne({_id: id}).lean().exec()
						if (item) products.push(item)
					}
					resolve()				
				})
				.then(() => {
					res.render('basket.hbs', {
						products: products
					})				
				})				
			} else {
				return ApiError.Unauthorized('Пользователь не найден')
			}

		} catch (e) {
			console.warn(e)
		}
	}

	async deleteOne (req, res) {
		try {

			let user,
					{ id } = req.params,
					{ email } = req.cookies
				
			if (email) {
				user = await User.findOne({ email: email })
				if (user.likes.length > 0) {
					user.likes = user.likes.filter(item => {
						item !== id
					})
					user.save()
				}
			}
			
		} catch (e) {
			console.warn(e)
		}
	}

	async deleteAll (req, res) {
		try {

			let user,
					email = req.cookies.email
				
			if (email) {
				user = await User.findOne({ email: email })
				user.likes = []
				user.save()
			}

		} catch (e) {
			console.warn(e)
		}
	}

}

module.exports = new BasketController