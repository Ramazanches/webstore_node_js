import getCookie from "../../modules/http/getCookie.js"
import { request } from "../../modules/http/request.js"

function counter (e, id) {
	try {

		if (e.target.closest(id)) {

			let count = e.target.querySelector('[data-value]'),
					dataValue = count.dataset.value,
					ID = count.parentElement.dataset.id,
					EMAIL = getCookie('email'),
					button = e.target,
					value,
					emails,
					options = { 
						id: ID, 
						email: EMAIL 
					},

					toggleIcon = e => {
						if (e.target.id === 'like') {
							if (value === 0) {
								button.children[0].classList.add('_active')
								button.children[1].classList.remove('_active')
							} else {
								button.children[0].classList.remove('_active')
								button.children[1].classList.add('_active')
							}
						}
					}


			if (EMAIL && dataValue) { 

					new Promise( async (resolve) => {
						emails = await request('/products/likes', 'POST', options)
						value = emails.length
						resolve()
					})
					.then( async () => await request('/auth/likes', 'POST', options) )
					.then(() => {
						value !== 0 ?
						count.innerHTML = value :
						count.innerHTML = ''
					})
					.then(() => toggleIcon(e) )

			} else {
				console.warn('Error: не авторизован!')
			}				
		}		
	} catch (e) {
		console.warn(e)
	}
}

export default counter