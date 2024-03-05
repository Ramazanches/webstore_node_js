const controller = require("../controllers/homeController")
const express = require("express")
const router = express.Router()
const jsonParser = express.json()

router.get("/", jsonParser, controller.get)

module.exports = router

