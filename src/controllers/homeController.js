const Product = require("../models/product")
const Home1 = require("../models/home/model_1")
const Home2 = require("../models/home/model_2")
const Home3 = require("../models/home/model_3")
const Home4 = require("../models/home/model_4")
const Home5 = require("../models/home/model_5")
const Home6 = require("../models/home/model_6")
const Home7 = require("../models/home/model_7")

class homeController {

	async get (req, res) {

		const _home1 = await Home1.find({}).lean(),
					_home2 = await Home2.find({}).lean(),
					_home3 = await Home3.find({}).lean(),
					_home4 = await Home4.find({}).lean(),
					_home5 = await Home5.find({}).lean(),
					_home6 = await Home6.find({}).lean(),
					_home7 = await Home7.find({}).lean(),
					product = await Product.find({}).lean().limit(6).exec(),

					render = () => {
						res.render("home.hbs", {
							home1: _home1,
							home2: _home2,
							home3: _home3,
							home4: _home4,
							home5: _home5,
							home6: _home6,
							home7: _home7,
							products: product
						})
					}
		
		setTimeout(() => render(), 0)
		
	}	
}

module.exports =  new homeController()