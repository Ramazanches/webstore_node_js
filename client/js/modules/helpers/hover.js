export class Hover {

	constructor (node, id) {
		this.node = node
		this.id = id
	}

	show (event) {
		if (event.target.closest(this.id)) {
			const items = event.target.querySelectorAll(this.node)
			if (items.length > 0) {
				items.forEach(item => item.classList.add('_active'))
			}
		}
	}

	hide (event) {
		if (event.target.closest(this.id)) {
			const items = event.target.querySelectorAll(this.node)
			if (items.length > 0) {
				items.forEach(item => item.classList.remove('_active'))
			}
		}
	}

}

