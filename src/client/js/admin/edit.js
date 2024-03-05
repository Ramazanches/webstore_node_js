import {request} from '../modules/http/request.js'
import reload from './reload.js'

function edit (e) {
	let tr = e.target.parentElement.parentElement,
			table = tr.parentElement.parentElement,
			id = tr.querySelector('input').value,
			t = e.target.id

	if (t === '_edit' || t === '_delete') {
		table = table.parentElement.parentElement
		id = tr.parentElement.querySelector('input').value
	}

	const URL = document.querySelector('[data-url]').dataset.url,
				url = URL + id,
				cells = tr.querySelectorAll('td'),
				attr = table.dataset.table,
				arr = [],	

				update = () => {
					cells.forEach( cell => {
						const values = []
						const inp = cell.children[0]
						if (inp && inp.tagName === 'INPUT' && inp.name) {
							values.push(inp.name)
							if (values.length < 2) {
								if (inp.dataset.type === 'number') values.push(+inp.value)
								if (inp.value) values.push(inp.value)					
							}
							if (values.length === 0) values.remove()
							arr.push(values)
						}
					})
					arr.unshift(['_id', id], ['table', attr])
					const obj = Object.fromEntries(arr)
					request(url, 'PUT', obj)	
				},

				del = () => {
					arr.unshift(['_id', id], ['table', attr])
					const obj = Object.fromEntries(arr)
					request(url, 'DELETE', obj)
				}

	if (t === 'delete' || t === '_delete') del()
	if (t === 'edit' || t === '_edit') update()
}

export default edit