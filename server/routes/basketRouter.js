const controller = require("../controllers/basketController"),
			express = require("express"),
			router = express.Router(),
			jsonParser = express.json(),
			// authMiddleware = require('../middlewares/auth'),
			roleMiddleware = require('../middlewares/role'),
			middleware = [roleMiddleware(['USER'])]

router.post('/', controller.addProduct)
			.get('/', middleware, controller.getAll)
			.delete('/:id', middleware, controller.deleteOne)
			.delete('/', middleware, controller.deleteAll)

module.exports = router