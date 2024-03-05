export class Sort {

	constructor (wrap, attr) {
		this.wrap = wrap
		this.sortType = attr
	}

	inserAfter (elem, refElem) {
		return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
	}

	sortDesc (e) {
		const w = this.wrap

		for (let i = 0; i < w.children.length - 1; i++) {
      for (let j = i; j < w.children.length; j++) {
      	const more = +w.children[i].getAttribute(this.sortType)
      	const less = +w.children[j].getAttribute(this.sortType)
        if (more < less) {
          let replacedNode = w.replaceChild(w.children[j], w.children[i])
          this.insertAfter(replacedNode, w.children[i])
        }
      }
    }	
	}

	sortAsc (e) {
		const w = this.wrap

		for (let i = 0; i < w.children.length - 1; i++) {
      for (let j = i; j < w.children.length; j++) {
      	const more = +w.children[i].getAttribute(this.sortType)
      	const less = +w.children[j].getAttribute(this.sortType)
        if (more > less) {
          let replacedNode = w.replaceChild(w.children[j], w.children[i])
          this.insertAfter(replacedNode, w.children[i])
        }
      }
    }	
	}
	
}

