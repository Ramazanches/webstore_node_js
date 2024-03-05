async function logOut (e, id, url = '/auth/logout') {
	try {
		if (e.target.closest(id)) {
			await fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			})
			.then(() => window.location.href = '/home')
			.catch(() => console.warn('Error не удалось выйти'))
		}
	} catch (e) {
		console.warn(e)
	}
}

export default logOut