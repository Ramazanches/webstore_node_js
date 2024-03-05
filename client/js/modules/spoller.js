	import _slideUp from './animation/slideUp.js'
	import _slideDown from './animation/slideDown.js'
	
	export default function spoller () {
		const spollersArray = document.querySelectorAll('[data-spollers]')

		if (spollersArray.length > 0) {
			const spollersRegular = Array.from(spollersArray).filter( (item, index, self) => {
				//Ищем обычные спойлеры которые не зависят от ширины экрана
				!item.dataset.spollers.split(",")[0]; //Проверяем отсутствие параметров (первого параметра) у атрибута data-spollers
			})
			
			if (spollersRegular.length > 0) initSpollers(spollersRegular) //Инициализация обычных спойлеров
			
			//Получаем спойлеры с медиа запросами
			const spollersMedia = Array.from(spollersArray).filter( (item, index, self) => {
				return item.dataset.spollers.split(",")[0];
			})


			//Инициализация спойлеров с медиа запросами
			if (spollersMedia.length > 0) {
				const breakpointsArray = []
				spollersMedia.forEach(item => {
					const params = item.dataset.spollers
					const breakpoint = {}
					const paramsArray = params.split(",")
					breakpoint.value = paramsArray[0]
					breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"
					breakpoint.item = item
					breakpointsArray.push(breakpoint)
				});

				//Получаем уникальные брекпоинты
				let mediaQueries = breakpointsArray.map( (item) => {
					return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type
				})
				mediaQueries = mediaQueries.filter( (item, index, self) => {
					return self.indexOf(item) === index
				});

				//Работаем с каждым брекпоинтом
				mediaQueries.forEach(breakpoint => {
					const paramsArray = breakpoint.split(",")
					const mediaBreakpoint = paramsArray[1]
					const mediaType = paramsArray[2]
					const matchMedia = window.matchMedia(paramsArray[0])

					//Объекты с нужными условиями
					const spollersArray = breakpointsArray.filter( (item) => {
						if (item.value === mediaBreakpoint && item.type === mediaType) {
							return true
						}
					})

					matchMedia.addListener( () => initSpollers(spollersArray, matchMedia) )
					initSpollers(spollersArray, matchMedia) //Запускаем функцию сразу при загрузке страницы
				})
			}

			function initSpollers(spollersArray, matchMedia = false) {
				spollersArray.forEach(spollersBlock => {
					spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
					if (matchMedia.matches || !matchMedia) {
						spollersBlock.classList.add('_init') //Превращаем обычный блок в спойлер
						initSpollerBody(spollersBlock)
						spollersBlock.addEventListener('click', setSpollerAction)
					}
					else {
						spollersBlock.classList.remove('_init')  //Отображаем блоки в обычном виде
						initSpollerBody(spollersBlock, false)
						spollersBlock.removeEventListener("click", setSpollerAction);
					}
				})
			}

			//Работа с контентом

			function initSpollerBody(spollersBlock, hideSpollerBody = true) {
				const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
				if (spollerTitles.length > 0) {
					spollerTitles.forEach(spollerTitle => {
						if (hideSpollerBody) {
							spollerTitle.removeAttribute('tabindex'); //Дает возможность перехода по клику на таб
							if (!spollerTitle.classList.contains('_active')) {
								spollerTitle.nextElementSibling.hidden = true;
							}
						}
						else {
							spollerTitle.setAttribute('tabindex', '-1');
							spollerTitle.nextElementSibling.hidden = false;
						}
					});
				}
			}

			function setSpollerAction(e) {
				const el = e.target;
				if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
					const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
					const spollersBlock = spollerTitle.closest('[data-spollers]');
					const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
					if (!spollersBlock.querySelectorAll('._slide').length) {
						if (oneSpoller && !spollerTitle.classList.contains('_active')) {
							hideSpollersBody(spollersBlock);
						}
						spollerTitle.classList.toggle('_active');
						_slideToggle(spollerTitle.nextElementSibling, 500);
					}
					e.preventDefault();
				}
			}
			function hideSpollersBody(spollersBlock) {
				const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
				if (spollerActiveTitle) {
					spollerActiveTitle.classList.remove('_active');
					_slideUp(spollerActiveTitle.nextElementSibling, 500);
				}
			}

		}
		

	  let _slideToggle = (target, duration = 500) => {
	  	if (target.hidden) {
	  		return _slideDown(target, duration);
	  	}
	  	else {
	  		return _slideUp(target, duration);
	  	}
	  }	
	}

	