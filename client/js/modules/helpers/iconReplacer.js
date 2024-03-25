function iconReplacer (...args) {
	try {

		const [wrapper, options] = args
		const {from, to} = options

		console.log(from)
		console.log(to)

		if (wrapper) {

			if (from) {
				from.remove()
			} else {
				console.log('Не корректная заменяемая иконка')
			}

			setTimeout(() => {
				if (to && typeof to === 'string') {
					wrapper.inserAdjacentHTML('afterbegin', to)						
				} else {
					console.log('Не корректная заменяющая иконка')
				}				
			}, 0)

		} else {
			console.log('Отсутствует контейнер иконок')
		}

	} catch (e) {
		console.warn(e)
	}
}

export default iconReplacer