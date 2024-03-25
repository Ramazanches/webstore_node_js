const express = require('express'),
			jsonParser = express.json(),
			router = express.Router(),
			controller = require('../controllers/userController'),
			{ check } = require('express-validator'),
			authMiddleware = require('../middlewares/auth'),
			roleMiddleware = require('../middlewares/role'),

			emptyMsg = 'Имя пользователя не может быть пустым',
			lengthMsg = 'Пароль должен быть более 4-х и менее 25 символов',
			
			validate = [
				jsonParser,
				check('email').isEmail(),
				check('password', lengthMsg).isLength({min: 4, max: 25}),
			],
			authRole = [
				authMiddleware, 
				roleMiddleware(['USER'])
			]

router.post('/registration', validate, controller.registration)
			.post('/login', jsonParser, controller.login)
			.post('/logout', controller.logout)
			.post('/likes', controller.setLike)
			.get('/activate/:link', controller.activate)
			.get('/refresh', controller.refresh)
			.get('/user', controller.getOne)
			.get('/users', authRole, controller.getUsers)			
			.get('/signin', controller.signin)
			.get('/signup', controller.signup)
			.get('/admin/signup', controller.signupAdmin)


module.exports = router