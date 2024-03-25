export const request = async (url, $method = 'GET', data = null, type = 'json') => {
	try {	

		let $body,
				$headers = { "Accept": "application/json", },
				contentType = { "Content-Type": "application/json", },
				config = { 
					method: $method, 
					headers: $headers 
				}

			if (typeof data === 'string') {
				type = 'text'
				$headers = {
					'Accept': 'text/html',
					'Content-Type': 'text/html'
				}				
			}

			if (data) {
				type === 'json' ?
				$body = { body: JSON.stringify(data) } :
				type === 'formdata' ?
				$body = { body: new FormData(data) } :
				$body = { body: data }

				Object.assign($headers, contentType)
				Object.assign(config, $body)
			}

			const res = await fetch(url, config)
			console.log(res)

			return res.json()

	} catch (e) {
		console.log(e) 
	}

}