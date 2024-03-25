import { request } from "./request.js"
import setCookie from "./setCookie.js"
import deleteCookie from "./deleteCookie.js"
import getCookie from "./getCookie.js"
import Ajaxer from "./ajaxer.js"


class FormSendler {

	constructor (config) {
		this.config = config
		this.regUrl = '/auth/registration'
		this.authUrl = '/auth/login'
		this.redirect = this.config.redirect
	}

	cookieSet (cookie) {
		try {
			
			if (cookie instanceof Object) {
				const { name, value, options } = cookie
				if (getCookie('email')) {
					deleteCookie(name)
				}
				setCookie(name, value, this.options)			
			} else {
				console.warn('Error: cookie must be an Object') 
			}

		} catch (e) {
			console.warn(e)
		}
	}

	sendAuthorization (name) {
		try {

			const form = document.forms[name]
			if (form) {
				form.addEventListener('submit', (event) => {
					event.preventDefault()
					const data = Object.fromEntries(new FormData(form))
					const email = form.elements.email.value
					// const res = Ajaxer.post(this.authUrl, { body: data })
					const res = request(this.authUrl, 'POST', data)
					this.cookieSet({
						name: 'email', 
						value: email,
						options: {
							secure: true, 
							'max-age': 3600
						}
					})	
					console.log('Успешная авторизация!')
					window.location.href = this.redirect
				})					
			}

		} catch (e) {
			console.warn(e)
		}
	}

	sendRegistration (name) {
		try {
			const form = document.forms[name]
			if (form) {
				form.addEventListener('submit', (event) => {
					event.preventDefault()
					// const res = Ajaxer.post(this.regUrl, { 
					// 	body: Object.fromEntries(new FormData(form)) 
					// })
					const res = request(this.regUrl, 'POST', Object.fromEntries(new FormData(form)))
					console.log(res)
					if (res.ok) window.location.href = this.authUrl
				})					
			}
		} catch (e) {
			console.warn(e)
		}
	}

	authorization (arg) {
		try {
			if (arg instanceof Array && arg.length > 0) {
				arg.map(name => this.sendAuthorization(name))
			}
		} catch (e) {
			console.warn(e)
		}
	}

	registration (arg) {
		try {
			if (arg instanceof Array && arg.length > 0) {
				arg.map(name => this.sendRegistration(name))
			}
		} catch (e) {
			console.warn(e)
		}
	}

	main (arg) {
		try {
			if (this.config instanceof Object) {
				this.authorization(this.config.authorization)
				this.registration(this.config.registration)
			}
		} catch (e) {
			console.warn(e)
		}
	}
}

export default FormSendler