import {setClass, addClasses} from '../modules/utils/addClass.js'
import formToggler from './formToggler.js'
import edit from './edit.js'
import post from './post.js'
import reload from './reload.js'

const addButtonsToTable = () => {
	const tbodies = document.querySelectorAll('tbody'),
				wrap = document.querySelectorAll('#wrapper'),
				arr = [
					{
						id: 'edit',
						inner: `<svg height="20px" fill="#2f356c" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>`,
						title: 'Редактировать'
					},		
					{
						id: 'delete',
						inner: `<svg height="20px" fill="#2f356c" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`,
						title: 'Удалить'
					}
				];

				arr.forEach( obj => {
					if (tbodies && tbodies.length > 0) {
						tbodies.forEach( tbody => {
							for (let i = 1; i < tbody.children.length; i++) {
								const td = document.createElement('td')
								const btn = document.createElement('button')
								if (obj.id) {
									btn.id = obj.id
									if (wrap.length < 2) btn.id = "_" + obj.id
								}
								if (obj.text) btn.textContent = obj.text
								if (obj.inner) btn.innerHTML = obj.inner
								if (obj.title) btn.title = obj.title
								td.append(btn)
								tbody.children[i].append(td)
							}
						})
					}
				})

}

const setParams = (url, obj) => {
	const params = Object.entries(obj)
	if (params.length > 0) {
		params.forEach( param => {
			url.searchParams.set(param[0], param[1])
		})	
	}		
} 

const addButtons = (selector) => {
	const icon = '<svg height="1em" fill="#fff" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>'
	let wrap = document.querySelectorAll(selector),
			btn,
			id

		if (wrap.length > 0) {
			wrap.length < 2 ? id = '_add' : id = 'add'
			for (let i = 0; i < wrap.length; i++) {
				btn = document.createElement('button')
				btn.className = 'open_admin'
				btn.id = id
				btn.innerHTML = icon
				btn.title = 'Добавить'
				btn.dataset.visible = 'false'
				btn.dataset.num = i + 1
				wrap[i].append(btn)				
			}
		}	
}

const main = (e) => {
	let postID = "#post"
	const wrap = document.querySelectorAll('#wrapper'),
				arrId = ['edit', '_edit', 'delete', '_delete'],
				id = e.target.id
	
	if (wrap.length < 2) postID = "#_post"

	arrId.forEach( _id => { 
		if (id === _id) edit(e) 
	})

	reload(e, postID, post, '#form')
}

export const adminLoad = () => {

	const arr = [
		{
			selector: ['#delete', '#_delete'],
			cls: ['btn', 'btn-sm', 'w-100']
		},
		{
			selector: ['#edit', '#_edit'],
			cls: ['btn', 'btn-sm', 'w-100']
		},
		{
			selector: 'td',
			cls: ['h-100', 'text-center']
		},
	]

	new Promise( resolve => { 
		resolve() 
	})
	.then( () => addClasses('input', 'form-control') )
	.then( () => addButtonsToTable() )
	.then( () => addButtons('#wrapper') )
	.then( () => arr.forEach( obj => addClasses(obj.selector, obj.cls)))
}



export const adminClick = (e) => {
	formToggler(e)
	main(e)
}