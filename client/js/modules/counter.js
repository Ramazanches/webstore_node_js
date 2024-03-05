import { likeSvg } from '../store/Icons.js'
import iconToggler from './utils/iconToggler.js'

async function counter (e, id) {
	try {

		if (e.target.closest(id)) {
			let value,
					count = e.target.querySelector('[data-value]'),
					wrapper = count.parentElement
			
			if (count) value = count.dataset.value

			setTimeout( () => {
				value = Number(value) + 1
				count.dataset.value = value
				count.innerHTML = value
			}, 200)



			new Promise ( (resolve, reject) => {
				if (wrapper) {
					wrapper.firstElementChild.remove()
					resolve()					
				} else {
					reject('wrapper not exist')
				}
			})
			.then(() => wrapper.insertAdjacentHTML('afterbegin', likeSvg))
			.then(() => iconToggler(wrapper, {from: 'from', to: 'to'}))
			
		}		
	} catch (e) {
		console.warn(e)
	}
}

export default counter