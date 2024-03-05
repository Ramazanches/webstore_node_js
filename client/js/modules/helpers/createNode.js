export class createNode {

	constructor (node, config) {
		this.node = node
		this.cls = config.cls
		this.id = config.id
		this.inner = config.inner
		this.parent = config.parent
		this.wrapper = config.wrapper
		this.attr = config.attributes
	}

	setAttributes (node, arr) {
		if (arr.length > 0) {
			arr.forEach( entry => {
				node.setAttribute(entry[0], entry[1])
			})	
		}
		else console.log('error in attributes')
	}

	setClass (node, cls) {
		if (cls instanceof Array && cls.length > 0) {
			for (let i = 0; i < cls.length; i++) {
				node.classList.add(cls[i])
			}
		}
		else node.className = cls
	}

	generate (node) { 
		if (this.id) node.id = this.id
		if (this.inner) {
			typeof this.inner === 'string' ? 
			node.textContent = this.inner :
			typeof this.inner === 'number' ?
			node.innerHTML = this.inner :
			node.insertAdjacentHTML('beforeend', this.inner)
		}
		if (this.cls) this.setClass(node, this.cls)
		if (this.attr) {
			const arr = Object.entries(this.attr)
			this.setAttributes(node, arr)
		}
	}

	add (parent, node, wrapper) {	
		if (wrapper) {
			let wrap = document.createElement(wrapper)
			this.generate(node)
			wrap.append(node)
			parent.append(wrap)
		}
		else {
			this.generate(node)
			parent.append(node) 
		}
	}

	init () {
		try {
			const p = this.parent,
						w = this.wrapper,
						n = this.node
			if (this.node) {
				const el = document.createElement(this.node)
				if (el) {
					if (p && !w) this.add(p, el) 
					if (p && w) this.add(p, el, w) 
					if (!p) {
						this.generate(el)
						return el
					}				
				}
			}
			else	console.log('not found node')
		} 
		catch (e) { 
			console.warn(e) 
		}
	}
}