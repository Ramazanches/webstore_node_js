
export default function parallax () {
		const parallax = document.querySelector('.parallax')

		if (parallax) {
			const content = document.querySelector('.parallax__container')
			const clouds = document.querySelector('.images-parallax__clouds')

			// Коэффициенты
			const forClouds = 40;
			const forMountains = 20;
			const forHuman = 10;

			// Скорость анимации
			const speed = 0.05

			let positionX = 0, positionY = 0
			let coordXprocent = 0, coordYprocent = 0

			function setMouseParallaxStyle() {
				const distX = coordXprocent - positionX
				const distY = coordXprocent - positionY

				positionX = positionX + (distX * speed)
				positionY = positionY + (distY * speed)

				clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`

				requestAnimationFrame(setMouseParallaxStyle)
			}

			setMouseParallaxStyle()

			parallax.addEventListener('mousemove', (e) => {
				// Получение ширины и высоты блока
				const parallaxWidth = parallax.offsetWidth;
				const parallaxHeight = parallax.offsetHeight;

				// Ноль по середине
				const coordX = e.pageX - parallaxWidth / 2
				const coordY = e.pageY - parallaxHeight / 2

				coordXprocent = coordX / parallaxWidth * 100
				coordYprocent = coordY / parallaxHeight * 100
			});

			// Parallax при скролле

			let tresholdSets = []
			for (let i = 0; i <= 1.0; i += 0.005) {
				tresholdSets.push(i)
			}
			const callback = (entries, observer) => {
				const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100
				setParallaxItemsStyle(scrollTopProcent)
			}
			const observer = new IntersectionObserver(callback, {
				treshold: tresholdSets
			})

			observer.observe(document.querySelector('.content'))

			function setParallaxItemsStyle(scrollTopProcent) {
				if (content) {
					content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`			
				}
			}
		}	
}
