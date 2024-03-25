function iconToggler (...args) {
	try {
		
		const [e, id] = args

		if (e.target.closest(id)) {

			const container = document.querySelector(id);
			const first = container.firstElementChild		
			const last = container.lastElementChild

			Array.from(container.children).map( child => {
				if (child.classList.contains('_active')) {
					child.classList.remove('_active')
				} else {
					child.classList.add('_active')
				}
			})

		}

	} catch (e) {
		console.warn(e)
	}
}

export default iconToggler