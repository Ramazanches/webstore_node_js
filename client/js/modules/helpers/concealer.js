import getCookie from "../http/getCookie.js"
import { request } from "../http/request.js"

class Concealer {

	constructor (id, config) {
		this.id = id
		this.config = config
		this.url = '/auth/user'
		this.nodes = document.querySelectorAll(this.id)
	}

	async forUsers () {
		try {
			const user = await request(this.url)
			if (user) {
				const ADMIN = user.roles[0].value
				const USER = user.roles[1].value
				console.log(user)
				if (this.nodes.length > 0) {
					this.nodes.forEach( node => {
						if (!USER || USER !== 'USER') {
							node.classList.add('_hidden')
						}
					})
				}
			}			
		} catch (e) {
			console.warn(e)
		}

	}

	async forAdmins () {
		const user = await request(this.url)
		if (user) {
			const ADMIN = user.roles[1].value
			if (this.nodes.length > 0) {
				this.nodes.forEach( node => {
					if (!ADMIN || ADMIN !== 'ADMIN') {
						node.classList.add('_hidden')
					}
				})
			}
		}
	}

}

export default Concealer