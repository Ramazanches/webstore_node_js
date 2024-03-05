export default function scrollAnimation () {
	let animItems = document.querySelectorAll('._anim-scroll')
	if (animItems.length > 0) {

		function animOnScroll(params) {
			for (let i = 0; i < animItems.length; i++) {
				const animItem = animItems[i]
				const animItemHeight = animItem.offsetHeight //высота объекта
				const animItemOffset = offset(animItem).top //позиция объекта относительно верха
				const animStart = 4
				//Точка старта = Высота окна - высота аним-го объекта деленная на коэф. момента старта анимации
				let animItemPoint = window.innerHeight - animItemHeight / animStart
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart
				}
				if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
					animItem.classList.add('_active')
				}
				else {
					if (!animItem.classList.contains('_anim-static')) {
						animItem.classList.remove('_active')					
					}
				}
			}
		}

		function offset(el) {
			const rect = el.getBoundingClientRect(),
						scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
						scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return {
				top: rect.top + scrollTop, 
				left: rect.left + scrollLeft
			}
		}

		setTimeout( () =>  animOnScroll() , 300)
	}		
}