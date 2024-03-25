const Home1 = require("../models/home/model_1")
const Home2 = require("../models/home/model_2")
const Home3 = require("../models/home/model_3")
const Home4 = require("../models/home/model_4")
const Home5 = require("../models/home/model_5")
const Home6 = require("../models/home/model_6")
const Home7 = require("../models/home/model_7")

class homeAdminController {

	async get (req, res) {

		const _home1 = await Home1.find({}).lean(),
					_home2 = await Home2.find({}).lean(),
					_home3 = await Home3.find({}).lean(),
					_home4 = await Home4.find({}).lean(),
					_home5 = await Home5.find({}).lean(),
					_home6 = await Home6.find({}).lean(),
					_home7 = await Home7.find({}).lean(),

		render = () => {
			res.render("homeAdmin.hbs", {
				home1: _home1,
				home2: _home2,
				home3: _home3,
				home4: _home4,
				home5: _home5,
				home6: _home6,
				home7: _home7
			})
		}
		
		setTimeout(() => render(), 0)
		
	}	

	async post (req, res) {
		const body = req.body,
					table = body.table

		if (!body) return sendStatus(400)

		try {
			table === 'home1' ? await new Home1(body).save() :
			table === 'home2' ? await new Home2(body).save() :
			table === 'home3' ? await new Home3(body).save() :
			table === 'home4' ? await new Home4(body).save() :
			table === 'home5' ? await new Home5(body).save() :
			table === 'home6' ? await new Home6(body).save() :
			table === 'home7' ? await new Home7(body).save() :
			console.log('Error set attribute data-table')	
		} 
		catch (e) { 
			console.warn('Error' + e.message) 
		}
	}

	async delete (req, res) {
		if (!req.body) return sendStatus(400)
		let table = req.body.table,
				id = req.params.id,
				result

		try {
			table === 'home1' ? result = await Home1.findOneAndDelete({_id: id}) :
			table === 'home2' ? result = await Home2.findOneAndDelete({_id: id}) :
			table === 'home3' ? result = await Home3.findOneAndDelete({_id: id}) :
			table === 'home4' ? result = await Home4.findOneAndDelete({_id: id}) :
			table === 'home5' ? result = await Home5.findOneAndDelete({_id: id}) :
			table === 'home6' ? result = await Home6.findOneAndDelete({_id: id}) :
			table === 'home7' ? result = await Home7.findOneAndDelete({_id: id}) :
			console.log('Set attribute data-table')	
		} 
		catch (e) {
			console.warn('Error' + e.message) 
		} 	
				
		console.log(req.body)		
		requestResult(req, res, result)
	}

	async update (req, res) {
		let body = req.body
		let result
		const id = body._id,
					table = body.table,
					home1 = new Home1(body),
					home2 = new Home2(body),
					home3 = new Home3(body),
					home4 = new Home4(body),
					home5 = new Home5(body),
					home6 = new Home6(body),
					home7 = new Home7(body)
				
		if (!req.body) return sendStatus(400)	

		try {
			table == 'home1' ? result = await Home1.findOneAndUpdate({_id: id}, home1, {new: true}) :
			table == 'home2' ? result = await Home2.findOneAndUpdate({_id: id}, home2, {new: true}) :
			table == 'home3' ? result = await Home3.findOneAndUpdate({_id: id}, home3, {new: true}) :
			table == 'home4' ? result = await Home4.findOneAndUpdate({_id: id}, home4, {new: true}) :
			table == 'home5' ? result = await Home5.findOneAndUpdate({_id: id}, home5, {new: true}) :
			table == 'home6' ? result = await Home6.findOneAndUpdate({_id: id}, home6, {new: true}) :
			table == 'home7' ? result = await Home7.findOneAndUpdate({_id: id}, home7, {new: true}) :
			table == 'product' ? result = await Product.findOneAndUpdate({_id: id}, product, {new: true}):
			console.log('Set attribute data-table')	
		} 
		catch (e) { 
			console.warn('Error' + e.message) 
		}		
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

module.exports = new homeAdminController()


