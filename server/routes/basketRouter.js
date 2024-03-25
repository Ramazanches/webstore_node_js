const controller = require("../controllers/basketController"),
			express = require("express"),
			router = express.Router(),
			jsonParser = express.json(),
			roleMiddleware = require('../middlewares/role'),
			middleware = [roleMiddleware(['USER'])]

router.post('/', controller.addProduct)
			.get('/', controller.getAll)
			.delete('/:id', controller.deleteOne)
			.delete('/', controller.deleteAll)

module.exports = router