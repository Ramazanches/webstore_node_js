const express = require('express'),
			router = express.Router(),
			admin = require('./admin/index'),		
			auth = require('./authRouter'),						
			about = require('./aboutRouter'),
			home = require('./homeRouter'),
			products = require('./productsRouter'),
			basket = require('./basketRouter')

router.use("/auth", auth)
			.use("/about", about)
			.use("/home", home)
			.use("/products", products)
			.use("/basket", basket)
			.use("/admin", admin)

module.exports = router
