import removeAll from '../modules/utils/removeAll.js'

function reload (e, id, callback, form) {

	const t = 1000

	const init = (e, id, callback, form) => {
		if (id && callback) {
			if (e.target.closest(id)) {
				new Promise( resolve => {
					callback(e)
					resolve()
				})
				.then( () => {
					if (form) removeAll(form) 
				})
				.then( () => setTimeout(() => window.location.reload(), t ))
			}				
		}
	}

	if (id instanceof Array) id.forEach( arrId => {
		init(e, arrId, callback, form)
	})
	else {
		init(e, id, callback, form)
	}

}

export default reload