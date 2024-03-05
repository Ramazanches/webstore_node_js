import { request } from "../http/request.js"
import setCookie from "../http/setCookie.js"
import deleteCookie from "../http/deleteCookie.js"

class FormSendler {

	constructor (config) {
		this.config = config
		this.regUrl = '/auth/registration'
		this.authUrl = '/auth/login'
		this.options = {secure: true, 'max-age': 3600}
	}

	updateCookie (cookie) {
		new Promise( resolve => resolve())
		.then(() => deleteCookie(cookie.name))
		.then(() => setCookie(cookie.name, cookie.value, this.options))
	}

	cookieSet (cookie) {
		cookie ? 
		this.updateCookie(cookie) : 
		setCookie(cookie.name, cookie.value, this.options)
	}

	sendAuthorization (name) {
		try {
			const form = document.forms[name]
			if (form) {
				form.addEventListener('submit', (event) => {
					event.preventDefault()
					const email = form.elements['email'].name
					console.log(email)
					const data = Object.fromEntries(new FormData(form))
					if (data) {
						const res = request(this.regUrl, 'POST', data)
						if (res) window.location.href = this.config.redirect
					}
					this.cookieSet('email')
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
					const data = Object.fromEntries(new FormData(form))
					if (data) {
						const res = request(this.regUrl, 'POST', data)
						if (res) window.location.href = this.config.redirect
					}
				})					
			}
		} catch (e) {
			console.warn(e)
		}
	}

	authorization (arg) {
		try {
			if (arg instanceof Array && arg.length > 0) {
				arg.map( name => this.sendAuthorization(name) )
			}			
		} catch (e) {
			console.warn(e)
		}
	}

	registration (arg) {
		try {
			if (arg instanceof Array && arg.length > 0) {
				arg.map( name => this.sendRegistration(name) )
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