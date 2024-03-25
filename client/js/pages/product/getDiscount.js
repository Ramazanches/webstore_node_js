import { discountSvg } from '../../store/Icons.js'

function getDiscount () {
	const priceItem = document.querySelectorAll('.price__item')
	if (priceItem.length > 0) {
		priceItem.forEach( item => {
			const prevPrice = item.querySelector('.price__prev__text').innerText,
						currPrice = item.querySelector('.price__current__text').innerText,
						discount = item.querySelector('#disCount'),
						computed = parseInt(((prevPrice - currPrice) / prevPrice) * 100)

			if (discount && discountSvg) {
				discount.innerHTML = computed + discountSvg
			}
		})
	}
}

export default getDiscount