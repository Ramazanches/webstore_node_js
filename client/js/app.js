import initSliders from './modules/initSliders.js'
import appHeight from './modules/media/appHeight.js'
// import parallax from './modules/animation/parallax.js'
import setBackground from './modules/setBackground.js'
import likeCounter from './pages/product/likeCounter.js'
import scrollAnimation from './modules/animation/scrollAnimation.js'
import menuToggle from './modules/animation/menuToggle.js'
import { adminClick, adminLoad } from './admin/index.js'
import setSvgIcons from './modules/setSvgIcons.js'
import splitText from './modules/splitText.js'
import getDiscount from './pages/product/getDiscount.js'
import setDataAttributes from './pages/product/setDataAttributes.js'
import gotoProductItem from './pages/product/gotoProductItem.js'
import addCart from './pages/product/addCart.js'
import logOut from './admin/logout.js'
import FormSendler from './modules/http/formSendler.js'
import getCookie from './modules/http/getCookie.js'


const clickEvent = (e) => {
	adminClick(e)
	menuToggle(e, '.menu__icon', '.menu__body')
	// menuToggle(e, '.menu__link', '.menu__sublist')
	gotoProductItem(e)
	likeCounter(e, '#like')
	addCart(e, '#addCart')
	logOut(e, '#logOut')

}

const resizeEvent = async () => {
	await appHeight()	
}

const scrollEvent = async () => {
	await scrollAnimation()
}

const loadFunctions = () => {
	new Promise( resolve => {
		appHeight()		
		resolve()
	})
	.then( () => initSliders() )
	.then( () => setBackground() )
	.then( () => adminLoad() )
	.then( () => setSvgIcons() )
	.then( () => getDiscount() )
	.then( () => setDataAttributes() )
	.then( () => splitText() )
	.then( () => scrollAnimation() )
	// .then( () => parallax() )	
	.then( () => {
		new FormSendler({
			registration: ['signup_form', 'signup_admin_form'],
			authorization: ['signin_form'],
			redirect: '/home'
		}).main()		
	})
	.then( () => {

		const likeBtns = document.querySelectorAll('#like')

		if (likeBtns.length > 0) {
			likeBtns.forEach( button => {
				const span = button.querySelector('[data-value]')
				const value = span.dataset.value
				if (value !== 0 && value >= 1) {
					button.children[0].classList.remove('_active')
					button.children[1].classList.add('_active')
					span.innerHTML = value
				} else {
					button.children[0].classList.add('_active')
					button.children[1].classList.remove('_active')
					span.innerHTML = ''	
				}

			})
		}
	})

}


document.addEventListener("DOMContentLoaded", () => {

  loadFunctions()

	window.addEventListener('click', clickEvent)
	window.addEventListener("resize", resizeEvent)		
	window.addEventListener("scroll", scrollEvent)

	window.addEventListener('mouseover', (e) => {
		const tooltip = document.querySelector('.tooltip')
		if (e.target.closest('#tooltip') && tooltip) {
			tooltip.classList.add('_active')
		}
	})

	const items = document.querySelectorAll('#productItem');

	if (items.length > 0) {
		items.forEach( item => {
			const icons = item.querySelectorAll('.item__button')
			
			item.onmouseover = e => {
				if (icons) {
					icons.forEach( icon => icon.classList.add('_active'))
				}
			}

			item.onmouseout = e => {
				const t = e.relatedTarget
				if (t.className === 'gallery__wrapper') {
					if (icons) {
						// icons.forEach( icon => icon.classList.remove('_active'))
					}
				}
			}
		})
	}

})
	

