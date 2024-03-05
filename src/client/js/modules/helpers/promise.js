function promise (callback) {
	return new Promise((resolve, reject) => {
		if (callback) {
			callback()
			resolve()
		} else {
			reject((err) => console.warn(err.message) )
		}
	})
}

export default promise