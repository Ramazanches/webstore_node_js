import setCookie from "./setCookie.js";

function deleteCookie(name) { 
	try {

		if (name) setCookie(name, "", { 'max-age': -1 })
			
	} catch (e) {
		console.warn(e)
	}
}

export default deleteCookie