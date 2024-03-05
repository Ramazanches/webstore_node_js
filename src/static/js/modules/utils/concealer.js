import getCookie from "../http/getCookie.js"
import { request } from "../http/request.js"

class Concealer {

	constructor (id, config) {
		this.id = id
		this.config = config
		this.url = new URL('http://localhost:3000/auth/user')
		this.nodes = document.querySelectorAll(this.id)
	}

	async forUsers () {
		const user = await request(this.url)
		if (user) {
			const ADMIN = user.roles[0].value
			const USER = user.roles[1].value
			if (this.nodes.length > 0) {
				this.nodes.forEach( node => {
					if (USER && USER === 'USER') {
						node.classList.add('_hidden')
					}
					if (ADMIN && ADMIN === 'ADMIN') {
						node.classList.add('_hidden')
					}
				})
			}
		}
	}

	async forAdmins () {
		const user = await request(this.url)
		if (user) {
			const role = user.roles[1].value
			if (this.nodes.length > 0) {
				this.nodes.forEach( node => {
					if (role && role === 'ADMIN') {
						node.classList.add('_hidden')
					}
				})
			}
		}
	}

}

export default Concealer