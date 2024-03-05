
export class addAttribute {

	constructor (node, config) {
		this.node = node
		this.config = config
	}

	getAttributes (selector, attr) {
		const nodes = document.querySelectorAll(selector)
		if (nodes.length > 0) {

			nodes.forEach( node => {
				if (attr instanceof Object) {
					const arr = Object.entries(attr)
					for (let i = 0; i < arr.length; i++) {
						node.setAttribute(arr[i][0], arr[i][1])						
					}
				}	
				if (attr instanceof Array) {
					attr.forEach( obj => {
						node.setAttribute(obj.name, obj.value)
					})
				}
			})

		}
	}

	init () {
		const node = this.node
		if (node !== null) {
			if (!this.config && node instanceof Object) {
				this.getAttributes(node.selector, node.attributes)
			}

			if (typeof node === 'string' && this.config !== null) {
				this.getAttributes(node, this.config)
			}			
		}
	}

}

// new addAttribute('input', {'autocomplete': 'true'}).init()