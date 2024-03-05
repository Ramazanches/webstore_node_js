import { dataBgSelectors as arr } from '../store/dataBgSelectors.js'

function setBackground () {
	try {
		if (arr.length > 0) arr.forEach( i => setImage(i) ) 
		function setImage(element) {
			if (element) {
				const elements = document.querySelectorAll(element)
				if (elements.length > 0) {
					elements.forEach( el => {
						if (el && el.hasAttribute('data-img')) {
							el.style.backgroundImage = `url(${el.dataset.img})`
							el.removeAttribute("data-img")
						}
						else {
							console.log("Not found attribute(data-img)")
						}
					})
				}					
			}
		}				
	} catch (e) { 
		console.warn('Error ' + e.message) 
	}
}

export default setBackground