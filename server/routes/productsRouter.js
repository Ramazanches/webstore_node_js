const controller = require("../controllers/productsController"),
			express = require("express"),
			router = express.Router(),
			jsonParser = express.json()

router.get("/", controller.getAll)
			.get("/single/", controller.getOne)	
			.get("/liked", controller.getLikedProducts)
			.post('/likes', controller.setUserLike)

module.exports = router

