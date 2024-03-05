import setCookie from "./setCookie.js";

function deleteCookie(name) { 
	if (name) {
		setCookie(name, "", { 'max-age': -1 }) 
	} else {
		console.warn('Error ' + e.message) 
	}
}

export default deleteCookie