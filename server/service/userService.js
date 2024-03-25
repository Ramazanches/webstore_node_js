const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dto/user')
const ApiError = require('../errors/ApiError')
const UserModel = require('../models/user')
const Role = require('../models/role')

class UserService {

	async registration (req, email, password) {
		try {

			const candidate = await UserModel.findOne({email})
			if (candidate) {
				const errMsg = `Пользователь с почтовым адресом ${email} уже существует`
				throw ApiError.BadRequest(errMsg)
			}

			const hashPassword = await bcrypt.hash(password, 3)
			const userRole = await Role.findOne({value: 'USER'})
			const adminRole = await Role.findOne({value: 'ADMIN'})
			const activationLink = uuid.v4()
			let roles = [userRole]
			if (req.body.adminKey) {
				roles.push(adminRole)
			}
			const user = await UserModel.create({
				email, 
				password: hashPassword, 
				roles: roles,
				activationLink 
			})
			const mailLink = process.env.API_URL + '/auth/activate/' + activationLink
			await mailService.sendActivationMail(email, mailLink) //(активация) смс на почту

			const userData = new UserDto(user) //id, email, isActivated
			const tokens = tokenService.generateTokens({...userData}) //генерируем токены
			await tokenService.saveToken(userData.id, tokens.refreshToken) //сохраняем в бд

			return {...tokens, user: userData} //access/refresh-токены, поля из Dto		

		} catch (e) {
			console.warn(e)
		}
	}

	async login(email, password) {
		try {

			const user = await UserModel.findOne({email})
			if (!user) {
				throw ApiError.BadRequest('Пользователь не найден')
			}
			//Проверяем введенный пароль и захешированный на сервере
			const isPassEquals = await bcrypt.compare(password, user.password)

			if (!isPassEquals) {
				throw ApiError.BadRequest('Неверный пароль или почта')
			}
		  //выбрасываем не нужные поля
			const userData = new UserDto(user)
			const tokens = tokenService.generateTokens({...userData})
			await tokenService.saveToken(userData.id, tokens.refreshToken)
		  //access/refresh-токены, поля из Dto		
			return { ...tokens, user: userData }

		} catch (e) {
			console.warn(e)
		}
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		try {
			
			if (!refreshToken) {
				throw ApiError.Unauthorized()
			}
			const userData = tokenService.validateRefreshToken(refreshToken)
			//проверка наличия токена в базе данных
			const tokenFromDb = await tokenService.findToken(refreshToken)

	    //если токен просрочен, не подлинный или его нет в бд 
			if (!userData) throw ApiError.Unauthorized()
			if (!tokenFromDb) throw ApiError.Unauthorized()
			//Если условие выше не выполнилось генерируем пару токенов
			const user = await UserModel.findById(userData.id) //получаем пользователя
			const userDto = new UserDto(user) //выбрасываем не нужные поля
			const tokens = tokenService.generateTokens({...userDto}) //генерируем токены
			//сохраняем refresh-токен в бд для пользователя
			await tokenService.saveToken(userDto.id, tokens.refreshToken)
			return {...tokens, user: userDto} //access/refresh-токены, поля из Dto

		} catch (e) {
			console.warn(e)
		}
	}

	async getAllUsers() {
		try {

			const users = await UserModel.find({}).lean()
			return users			

		} catch (e) {
			console.warn(e)
		}
	}

	async getUser(email) {
		try {

			const user = await UserModel.findOne({email: email})
			return user

		} catch (e) {
			console.warn(e)
		}
	}

	async activate(activationLink) {
		try {

			const user = await UserModel.findOne({activationLink})
			if (!user) {
				throw ApiError.BadRequest("Некорректная ссылка активации")
			}
			user.isActivated = true //пользователь активирован
			console.log('Пользоатель был активирован по почте')
			await user.save()			

		} catch (e) {
			console.warn(e)
		}
	}

	setRefreshToken (res, data) {
		try {

			console.log(data)

			res.cookie('refreshToken', data.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, //30дней
				httpOnly: true
			})
			res.cookie('accessToken', data.accessToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, //30дней
				httpOnly: true
			})

			if (!res) console.warn('Not exist argument res') 
			if (!data) console.warn('Not exist argument data') 

			return res.json(data) //отправляем в браузер							

		} catch (e) {
			console.warn(e)
		}
	}

	async setLike (email, id) {
		try {

			const user = await UserModel.findOne({ email: email })
			if (!user) {
				throw ApiError.BadRequest('Пользователь не найден')
			}

			let arr = [...user.likes]

			arr.includes(id) ?
			arr = arr.filter( i => i !== id) :
			arr.push(id);

			user.likes = [...new Set(arr)] 
			user.save()
			
			return user.likes

		} catch (e) {
			console.warn(e)
		}
	}

}

module.exports = new UserService()