function removeAll (nodes) {
	const elements = document.querySelectorAll(nodes)
	if (elements.length > 0) {
		elements.forEach( node => node.remove() )
	}				
}

export default removeAll