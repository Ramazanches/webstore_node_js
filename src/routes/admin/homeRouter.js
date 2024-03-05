const express = require("express"),
      router = express.Router(),
      jsonParser = express.json(),
      controller = require("../../controllers/homeAdminController")


router.get("/", controller.get)
      .post("/", jsonParser, controller.post)
      .delete("/:id", jsonParser, controller.delete)
      .put("/:id", jsonParser, controller.update)

module.exports = router