const express = require('express'),
			router = express.Router(),
			home = require('./homeRouter'),
			products = require('./productsRouter')

router.use('/home', home)
			.use('/products', products)

module.exports = router

