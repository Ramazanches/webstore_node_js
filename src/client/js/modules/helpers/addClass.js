export const setClass = (nodes, cls) => {
	if (nodes && nodes.length > 0) {
		nodes.forEach( node => node.classList.add(cls))
	}
}	

export const addClasses = (elements, cls) => {
	try {

		if (elements instanceof Array) {
			elements.forEach( element => {
				const nodes = document.querySelectorAll(element)
				if (cls instanceof Array) {
					for (let i = 0; i < cls.length; i++) {
						setClass(nodes, cls[i])
					}
				}
				else setClass(nodes, cls)
			})
		}	
		else {
			const nodes = document.querySelectorAll(elements)
			if (cls instanceof Array) {
				for (let i = 0; i < cls.length; i++) {
					setClass(nodes, cls[i])
				}
			} 
			else setClass(nodes, cls)
		}	

	} catch (e) { 
		console.log(e) 
	}

}