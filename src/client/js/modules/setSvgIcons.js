import { dataIcons } from '../store/dataIcons.js'

export default function setSvgIcons () {

	const { nodes, icons } = dataIcons

	if (nodes.length > 0 &&
			nodes instanceof Array &&
			icons.length > 0 &&
			icons instanceof Array) {

		for (let i = 0; i < nodes.length; i++) {
			const selectors = document.querySelectorAll(nodes[i])
			selectors.forEach( selector => {
				selector.insertAdjacentHTML('beforeend', icons[i])					
			})
		}

	}

}