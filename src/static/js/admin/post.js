import { request } from '../modules/http/request.js'

export default function post (e) {
	const prev = e.target.previousElementSibling,
				url = document.querySelector('[data-url]').dataset.url,
				attr = e.target.dataset.table,
				inputs = prev.querySelectorAll('input'),				
				arr = []

	e.preventDefault()

	if (inputs.length > 0) {
		inputs.forEach(inp => {
			let entry = []
			entry.push(inp.name, inp.value)
			arr.push(entry)
		})		
	}
	arr.push(['table', attr])
	const obj = Object.fromEntries(arr)
	console.log(obj)

	request(url, 'POST', obj)
}