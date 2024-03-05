const Product = require("../models/product")

class productsAdminController {

	async get (req, res) {
		const _product = await Product.find().lean()
		const	render = () => {
			res.render("productsAdmin.hbs", {
				products: _product,
				title: 'Товары'
			})						
		}
		setTimeout(() => render(), 0)
	}	

	async post (req, res) {
		if (!req.body) return sendStatus(400)
		try {
			req.body.table === 'product' ? 
			await new Product(req.body).save() :
			console.log('Set attribute data-table')		
		} 
		catch (e) { 
			console.warn('Error' + e.message) 
		} 
	}

	async delete (req, res) {
		try {		
			if (!req.body) return sendStatus(400)
			let table = req.body.table,
					id = req.params.id,
				 	result

			table === 'product' ? 
			result = await Product.findOneAndDelete({_id: id}) :
			console.log('Set attribute data-table')	

			requestResult(req, res, result)			
		} 
		catch (e) { 
			console.warn('Error' + e.message) 
		} 
	}

	async update (req, res) {
		let body = req.body,
				result,
				id = body._id,
				table = body.table,
				product = new Product(body)

		if (!req.body) return sendStatus(400)	

		try {
			table == 'product' ? 
			result = await Product.findOneAndUpdate({_id: id}, product, {new: true}) :
			console.log('Set attribute data-table')	
		} 
		catch (e) { 
			console.warn('Error' + e.message) 
		}
		console.log(req.body)
		requestResult(req, res, result)
	}	
}

function requestResult(req, res, result) {
	if (result) {
		res.json({
			status: "Success",
			message: "Record is update successfully",
			data: result
		})		
	}
	else {
		res.json({
			status: "Failed",
			message: "Records not update"
		})		
	}
}

module.exports = new productsAdminController()


