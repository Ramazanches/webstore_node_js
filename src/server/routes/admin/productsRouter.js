const express = require("express"),
			jsonParser = express.json(),
			router = express.Router(),			
			controller = require("../../controllers/ProductsAdminController")

router.get("/", controller.get)
			.post("/", jsonParser, controller.post)
			.delete("/:id", jsonParser, controller.delete)
			.put("/:id", jsonParser, controller.update)

module.exports = router