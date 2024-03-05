import initSliders from './modules/initSliders.js'
import appHeight from './modules/mediaQueries/appHeight.js'
// import parallax from './modules/animation/parallax.js'
import setBackground from './modules/setBackground.js'
import counter from './modules/counter.js'
import scrollAnimation from './modules/animation/scrollAnimation.js'
import menuToggle from './modules/animation/menuToggle.js'
import { adminClick, adminLoad } from './admin/index.js'
import setSvgIcons from './modules/setSvgIcons.js'
import splitText from './modules/splitText.js'
import getDiscount from './modules/product/getDiscount.js'
import setDataAttributes from './modules/product/setDataAttributes.js'
import gotoProductItem from './modules/product/gotoProductItem.js'
import addCart from './modules/product/addCart.js'
import logOut from './admin/logout.js'
import Concealer from './modules/utils/concealer.js'
import FormSendler from './modules/utils/formSendler.js'

const clickEvent = (e) => {
	adminClick(e)
	menuToggle(e)
	gotoProductItem(e)
	counter(e, '#like')
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
	// .then( () => parallax() )
	.then( () => adminLoad() )
	.then( () => setSvgIcons() )
	.then( () => getDiscount() )
	.then( () => setDataAttributes() )
	.then( () => splitText() )
	.then( () => scrollAnimation() )
	.then( () => new Concealer('#user').forUsers() )
	.then( () => new Concealer('#admin').forAdmins() )
	.then( () => {
		new FormSendler({
			registration: ['signup_form', 'signup_admin_form'],
			authorization: ['signin_form'],
			redirect: '/home'
		}).main()		
	})
}


document.addEventListener("DOMContentLoaded", () => {

  loadFunctions()

	window.addEventListener('click', clickEvent)
	window.addEventListener("resize", resizeEvent)		
	window.addEventListener("scroll", scrollEvent)

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
						icons.forEach( icon => icon.classList.remove('_active'))
					}
				}
			}
		})
	}

})
	

