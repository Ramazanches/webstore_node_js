const Product = require("../models/product")
const User = require('../models/user')
const ApiError = require('../errors/ApiError')

class productsController {

	async getAll (req, res) {
		try {
			const $products = await Product.find().lean().exec()
			res.render("product.hbs", { 
				products: $products,
				signinIcon: true,
				auth: req.cookies.refreshToken !== undefined
			})			
		} 
		catch (e) { 
			console.warn(e)
		}
	}

	async getOne (req, res) {
		try {
			const { id } = req.query
			
			Product.findOneAndUpdate(
				{ _id: id  },
				{ $inc: { views: 1 } },
				{ returnDocument: 'after' }
			)

			const $product = await Product.findById(id).lean()
			res.render("productItem.hbs", {
				product: $product
			})				
		} 
		catch (e) { 
			console.warn(e)
		}
	}

	async setUserLike (req, res) {
		try {
			const { email, id } = req.body
			const product = await Product.findById(id)
			if (product) {
				let arr = [...product.likes]
				arr = arr.filter( item => item !== '')

				arr.includes(email) ?
				arr = arr.filter( i => i !== email) :
				arr.push(email)					

				product.likes = [...arr]
				product.save()
				res.json(product.likes)
			}
		} catch (e) {
			console.warn(e)
		}
	}

	async getLikedProducts (req, res) {
		try {
			let user, 
					products = [],
					{ email } = req.cookies
		
      if (email) {
      	user = await User.findOne({email: email})
      }

			if (user) {
				new Promise(async (resolve) => {
					for (let i = 0; i < user.likes.length; i++) {
						const id = user.likes[i]
						const item = await Product.findOne({_id: id}).lean().exec()
						if (item) products.push(item)
					}
					resolve()				
				})
				.then(() => {
					res.render('productLiked.hbs', {
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
	
}

module.exports =  new productsController()