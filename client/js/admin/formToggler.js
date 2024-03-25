import removeAll from '../modules/helpers/removeAll.js'

function formToggler (e) {

	let 
		form = document.createElement('form'),
		wrap = document.createElement('div'),
		t = e.target,
		prev = t.previousElementSibling,
		_table = t.parentElement.querySelector('table'),
		wrapper = document.querySelectorAll('#wrapper'),
		buttons = document.querySelectorAll('#add'),

		createForm = () => {
			form  = document.createElement('form')
			form.className = '_none flex-colum'
			form.id = 'form'	
			document.body.prepend(form)			
		},

		createInputs = () => {

			let head

			if (_table) {
				head = _table.querySelectorAll('th')
			}

			if (head.length > 0) {
				head.forEach( th => {
					console.log(th)
					if (th.hasAttribute('data-name')) {
				  	const inputGroup = document.createElement('div'),
				  				label = document.createElement('label'),
				  				input = document.createElement('input'),
				  				dataName = th.dataset.name
				  	
				  	inputGroup.className = 'input-group'
				  	label.className = 'form-control fw-bold'
				  	input.className = 'form-control'
				  	label.innerHTML = th.textContent

				  	if (dataName) {
				  		label.for = dataName
				  		input.name = dataName
				  		input.id = dataName
				  		input.setAttribute('autocomplete', 'on')
				  	}

				  	inputGroup.append(label)
				  	inputGroup.append(input)

				  	if (wrap && inputGroup) wrap.append(inputGroup)
						if (form) form.append(wrap)						
					}
				})						
			}
		},

		createFormButton = () => {
			try {
				const btn = document.createElement('button')
				const _type = prev.parentElement.dataset.table
				let dataTable = prev.dataset.table
				if (prev && wrapper) {
					if (wrapper.length < 2) {
						dataTable = _type
						btn.id = '_post'
					} else {
						btn.id = 'post'
					}
				}

				btn.className = 'btn btn-outline-primary mt-4'
				btn.textContent = 'Создать'
				btn.dataset.table = dataTable

				if (form) form.append(btn)		
			} 
			catch (e) { console.warn('Error' + e.message)  }
		},

		btnsVisibleOff = (buttons) => {
			if (buttons.length > 0) {
				buttons.forEach( btn => {
					if (btn.dataset.visible === 'true') {
						btn.dataset.visible = 'false'									
					}
				})
			}	
		},

		visibleToggler = () => {
			if (t.dataset.visible) {
				if (t.dataset.visible === 'false') {
					btnsVisibleOff(buttons)								
					t.dataset.visible = 'true'
				}
				else {
					t.dataset.visible = 'false'
				} 
			}
		},

		openForm = () => {
			if (form.classList.contains('_none')) {
				form.classList.remove('_none')			
			}
		},

		dbClickButton = () => {
			if (
				t.dataset.visible && 
				t.dataset.visible === 'false'
			) {
				form.classList.add('_none')
			}						
		},

		clickButton = () => {
				if (t.closest('#add') || t.closest('#_add')) {
					new Promise(resolve => {
						removeAll('#form')
						resolve()
					})
					.then( () => createForm() )
					.then( () => visibleToggler() )
					.then( () => createInputs() )
					.then( () => createFormButton() )
					.then( () => openForm() )
					.then( () => dbClickButton() )
				}
				if (t.id !== 'add' && !t.closest('#form')) {
					removeAll('#form')
					btnsVisibleOff(buttons)
				}
		}

	clickButton()
}


export default formToggler