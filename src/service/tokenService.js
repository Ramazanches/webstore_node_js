const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token')
const accesKey = process.env.JWT_ACCESS_SECRET
const refreshKey = process.env.JWT_REFRESH_SECRET

class TokenService {

	generateTokens(payload) {
		const accessToken = jwt.sign(payload, accesKey, {expiresIn: '30m'})
		const refreshToken = jwt.sign(payload, refreshKey, {expiresIn: '30d'})
		return { accessToken, refreshToken }
	}

	//Проверка срока годности и подлинность access-токена
	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, accesKey)
			return userData
		} 
		catch (e) {
			return null
		}
	}

	//Проверка срока годности и подлинность refresh-токена
	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, refreshKey)
			return userData
		} 
		catch (e) {
			return null
		}
	}

	async saveToken(userId, refreshToken) {
		try {
			const tokenData = await tokenModel.findOne({user: userId})
			if (tokenData) {
				tokenData.refreshToken = refreshToken
				return tokenData.save()
			}
			const token = await tokenModel.create({user: userId, refreshToken})
			return token			
		} 
		catch (e) { 
			console.log(e) 
		}
	}

	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({refreshToken})
		return tokenData
	}
	
	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne({refreshToken})
		return tokenData
	}
}

module.exports = new TokenService()