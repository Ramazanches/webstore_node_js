export default function initSliders () {

		const swiper = new Swiper('#homeBanner', {
		  slidesPerView: 1,
		  grabCursor: true,
		  speed: 800,      
		  effect: 'fade',
		  fadeEffect: {
		    crossFade: true
		  },
		  keyboard: {
		    enabled: true,
		  },
		  pagination: {
		    el: ".swiper-pagination",
		    clickable: true,
		  },
		})	
		
}


