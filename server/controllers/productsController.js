const Product = require("../models/product")

class productsController {

	async getAll (req, res) {
		try {
			const $products = await Product.find().lean().limit(10).exec()
			res.render("product.hbs", { 
				products: $products 
			})			
		} 
		catch (e) { 
			console.log(e) 
		}
	}

	async getOne (req, res) {
		try {
			const $product = await Product.findById(req.params.id).lean()
			console.log($product)
			res.render("productItem.hbs", {
				product: $product
			})		
		} 
		catch (e) { 
			console.log(e) 
		}
	}
	
}

module.exports =  new productsController()