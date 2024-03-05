const userService = require('../service/userService')
const { validationResult } = require('express-validator')
const ApiError = require('../errors/ApiError')

class UserController {

	async registration (req, res, next) {
		try {
			const errors = validationResult(req)
			const { email, password} = req.body
			// const { email, password, admin } = req.body
			let userData
			// admin ?
			// userData = await userService.registration(email, password, admin)	:
			userData = await userService.registration(email, password)
	
			if (!errors.isEmpty()) {
				const errMsg = 'Ошибка при валидации'
				return next(ApiError.BadRequest(errMsg, errors.array()))
			}

			userService.setRefreshToken(res, userData)
		} 
		catch (e) {
			next(e) 
		}
	}

	async login (req, res, next) {
		try {
			const {email, password} = req.body
			const userData = await userService.login(email, password)
			userService.setRefreshToken(res, userData)
		} 
		catch (e) { 
			next(e) 
		}
	}

	async logout (req, res, next) {
		try {
			const { refreshToken } = req.cookies //из куки достаем refresh-токен
			const token = await userService.logout(refreshToken)
			res.clearCookie('refreshToken') //удаляем токен
			res.clearCookie('email') //удаляем токен
			return res.json(token)
		} 
		catch (e) { 
			next(e) 
		}
	}

	async activate (req, res, next) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			res.render('successActivate.hbs')
		} 
		catch (e) { 
			next(e) 
		}
	}

	async refresh (req, res, next) {
		try {
			const {refreshToken} = req.cookies //достаем из куки токен
			const userData = await userService.refresh(refreshToken) //перезапись куки
			userService.setRefreshToken(res, userData)
		} 
		catch (e) { next(e) }
	}

	async getUsers (req, res, next) {
		try {
			const users = await userService.getAllUsers()
			return res.json(users)
		} 
		catch (e) { 
			next(e) 
		}
	}

	async getOne (req, res) {
		try {
			const email = req.cookies.email
			const user = await userService.getUser(email)
			return res.json(user)
		} catch (e) {
			console.warn(e)
		}
	}

	signin (req, res) {
		res.render("signin.hbs", {title: 'Вход'})
	}

	signup (req, res) {
		res.render("signup.hbs", {title: 'Регистрация'})
	}

	signupAdmin (req, res) {
		res.render("signupAdmin.hbs", {title: 'Регистрация администратора'})
	}

}

module.exports = new UserController()
