
import { addAttribute } from '../utils/addAttribute.js'

function setDataAttributes () {
	const items = document.querySelectorAll('#productItem')

	if (items.length > 0) {
		items.forEach( item => {
			const rating = item.querySelector('.item__rating'),
						brand = item.querySelector('.item__brand'),
						product = item.querySelector('.item__name'),
						discount = item.querySelector('#disCount')
						
			if (rating && brand && product && discount) {
				new addAttribute(item, {
					'data-brand': brand.textContent,
					'data-product': product.textContent,
					'data-discount': discount.textContent,
					'data-rating': rating.dataset.rating
				}).init()
			}
		})
	}	
}

export default setDataAttributes