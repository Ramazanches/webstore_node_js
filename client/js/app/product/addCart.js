import getCookie from "../http/getCookie.js"
import { request } from "../http/request.js"

function addCart (e, nodeId) {
	try {

		let product = e.target.parentElement.parentElement,
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
				DATA = localStorage.getItem('data').split(',')
				console.log(DATA)
		  	data = {
		  		email: EMAIL, 
		  		data: DATA 
		  	}		
				console.log(data)
		  	if (state === true) {
					setTimeout(() => {
						request('/basket/', 'POST', data)
						state = false
					}, 5000)
				}

			})
		}


	} catch (e) {
		console.warn(e)
	}	
}

export default addCart

