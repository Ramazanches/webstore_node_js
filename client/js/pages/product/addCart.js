import getCookie from "../../modules/http/getCookie.js"
import { request } from "../../modules/http/request.js"

function addCart (e, nodeId) {
	try {

		let product = e.target.parentElement.parentElement,
				cart = document.querySelector('#cart'),
		    EMAIL = getCookie('email'),
		    id = product.dataset.id,
		    store = localStorage.getItem('data'),
		    state = false,
		    DATA = [],		    
		    array,
		    data;

		if (e.target.closest(nodeId)) {	
			new Promise(resolve => resolve())
			.then(() => {
				if (!store) {
					//если нет локального хранилища создаем и кидаем туда id
					localStorage.setItem('data', id)
					state = true					
					DATA.push(id)
				}
			})
			.then(() => {
				if (store) {
					array = store.split(',')
	    		array.push(id)
	    		array = [...new Set(array)]
					localStorage.setItem('data', array.join(','))
					state = true					
				}				
			})
			.then(() => {
				DATA = store.split(',')
		  	data = {
		  		email: EMAIL, 
		  		data: DATA 
		  	}		
		  	if (state === true) {
					setTimeout(() => {
						request('/basket/', 'POST', data)
						state = false
					}, 5000)
				}
			})
			.then((e) => {
				if (DATA.length >= 5) console.log('more 0')
				if (DATA.length < 1) console.log('less 5')
				if (cart) {
					if (DATA.length < 1) {
						cart.children[0].classList.add('_active')
						cart.children[1].classList.remove('_active')
					}
					if (DATA.length >= 1) {
						cart.children[0].classList.remove('_active')
						cart.children[1].classList.add('_active')
					}
				}
			})
		}


	} catch (e) {
		console.warn(e)
	}	
}

export default addCart

