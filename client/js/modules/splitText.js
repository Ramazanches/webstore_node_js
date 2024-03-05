export default function splitText () {
	const title = document.querySelector('.parallax__title')
	if (title) main(title, 10)

	// title.classList.add('._active')
	// setTimeout(() => {
	// 	title.classList.remove('._active')
	// }, 1000)
}

function main (title, gap) {
		const text = [...title.textContent]
		title.innerHTML = ''

		if (Array.isArray(text)) {

			let newText = text.map( (item, index, array) => {

				!gap ? gap = 2 : gap

				let content,
						trs = 'transition: all .7s ease .' + index + 's',
						m = `margin: 0 ${gap * 2}px;`

				item === ' ' ?
				content = `<span style="${m} ${trs}">${item}</span>` :
				content = `<span style="${trs}">${item}</span>`					

				return content

			})

			newText.forEach( item => {
				title.insertAdjacentHTML('beforeend', item)
			})


		}

/*		text.forEach( item => {
			for (let i = 0; i < item.length; i++) {
				const span = document.createElement('span')
				let content = `<span>${item[i]}</span>`
				if (i === 3 || i === 8 || i === 14) {
					content = `<span style="margin: 0 4px">${item[i]}</span>`
				}
				title.insertAdjacentHTML('beforeend', content)
			}
		})

		const children = title.querySelectorAll('span')
		if (children.length > 0) {
			for (let i = 0; i < children.length; i++) {
				children[i].style.transition = `all .7s ease ${i}s`
			}
		}


*/
}		