const jwt = require('jsonwebtoken')
const {secret} = require('../config')
const ApiError = require('../errors/ApiError')

module.exports = (roles) => (req, res, next) => {

	if (req.method === 'OPTIONS') next()

	console.log(req.headers)

	try {

		let token

		if (req.headers.authorization) {
			token = req.headers.authorization.split(' ')[1]			
		}

		if (!token) ApiError.Unauthorized()	

		let	{roles: userRoles} = jwt.verify(token, secret),			
				hasRole = false	

		userRoles.forEach( role => {
			if (roles.includes(role)) {
				hasRole = true 
				console.log('roleMiddleware пройден')
			}
		})

		if (!hasRole) ApiError.Forbidden()
		next()
		
	} catch (e) { 
		console.log(e)  
		ApiError.Unauthorized()
	}
	
}