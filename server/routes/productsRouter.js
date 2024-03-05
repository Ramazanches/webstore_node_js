const controller = require("../controllers/productsController"),
			express = require("express"),
			router = express.Router(),
			jsonParser = express.json()

router.get("/", controller.getAll)
			.get("/:id", controller.getOne)


module.exports = router

