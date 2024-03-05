const jwt = require('jsonwebtoken')
const {secret} = require('../config')
const ApiError = require('../errors/ApiError')
const tokenService = require('../service/tokenService')

module.exports = (req, res, next) => {
	try {

		const authHeader = req.headers.authorization
		console.log(req.headers)
		if (!authHeader) return next(ApiError.Unauthorized())

		const accessToken = authHeader.split(' ')[1],
					userData = tokenService.validateAccessToken()
		
		if (!accessToken) return next(ApiError.Unauthorized())
		if (!userData) return next(ApiError.Unauthorized())

		req.user = userData
		console.log('authMiddleware пройден')
		next()

	} catch (e) {
		return next(ApiError.Unauthorized())
		console.log(e)
	}
}