function gotoProductItem (e) {
	try {
		if (e.target.closest('#productItem') && 
				e.target.id === 'productItem'
		) {
			e.preventDefault()
	    console.log('yes')
			const baseUrl = 'http://localhost:3000'
			const id = e.target.dataset.id
			const url = `/products/${id}`
			window.location.href = url
		}
	} catch (e) {
		console.warn(e) 
	}
}

export default gotoProductItem