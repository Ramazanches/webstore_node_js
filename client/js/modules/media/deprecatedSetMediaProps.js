import {dataMedia} from '../../store/dataMedia.js'

export class SetProp {

	constructor(arr, type) {
			this.prop = arr[0]
			this.Xxl = arr[1]
			this.Xl = arr[2]
			this.Lg = arr[3]
			this.Md = arr[4]
			this.Sm = arr[5]
			this.Xs = arr[6]
			this.v_xxl = arr[7]
			this.v_xl = arr[8]
			this.v_lg = arr[9]
			this.v_md = arr[10]
			this.v_sm = arr[11]
			this.v_xs = arr[12]
			this.html = document.documentElement
			this.width = window.innerWidth
			this.type = type
	}

	resizeXxl = () => this.checkValue(this.Xxl, this.Xl, this.v_xl, this.v_xxl)
	resizeXl = () => this.checkValue(this.Xl, this.Lg, this.v_lg, this.v_xl)
	resizeLg = () => this.checkValue(this.Lg, this.Md, this.v_md, this.v_lg)
	resizeMd = () => this.checkValue(this.Md, this.Sm, this.v_sm, this.v_md)
	resizeSm = () => this.checkValue(this.Sm, this.Xs, this.v_xs, this.v_sm)

	checkValue = (from, to, min, max) => {
		typeof to === 'object' ?
		this.computed(to[0], to[1], min, max - 1) :
		this.computed(from, to, min, max)			
	}

	computed = (from, to, min, max) => {

		let css

		if (to > from) {
			(this.type === 'em' || this.type === 'rem') ?
			css = `calc( ${to / 16}${this.type} + (${from / 16} - ${to / 16}) * (100vw - ${max}px) / (${min} - ${max}) )` :
			css = `calc( ${to}px + (${from} - ${to}) * (100vw - ${max}px) / (${min} - ${max}) )`		
		} else {
			(this.type === 'em' || this.type === 'rem') ?
			css = `calc( ${to / 16}${this.type} + (${from / 16} - ${to / 16}) * (100vw - ${min}px) / (${max} - ${min}) )` :
			css = `calc( ${to}px + (${from} - ${to}) * (100vw - ${min}px) / (${max} - ${min}) )`			
		}

		if (this.width < max && this.width > min) {
			this.html.style.setProperty(this.prop, css)
		}			
	}

	allResizes = () => {
		this.resizeXxl()
		this.resizeXl()
		this.resizeLg()
		this.resizeMd()
		this.resizeSm()
	}

}

export class SetStyles {

	constructor (data, type) {
		this.xxl = data.xxl
		this.xl = data.xl
		this.lg = data.lg
		this.md = data.md
		this.sm = data.sm
		this.xs = data.xs		
		this.props = data.props
		this.type = type || data.type[0]
	}

	init = () => {
		if (Array.isArray(this.props) &&
		 		!this.props.includes(undefined) &&
		  	Object.values(this.props).length === this.props.length) {

				this.props.forEach( v => {
					try {
						this.setValues(v)
					}
					catch (e) {
						console.warn('Error ' + e.message) 					
					}
				})
		}
	}

	setValues = (v) => {

			const arr = v.concat([this.xxl, this.xl, this.lg, this.md, this.sm, this.xs])

			if (Array.isArray(v) && 
					!v.includes(undefined) && 
					Object.values(v).length === v.length && 
					typeof(v[0]) === 'string') {

				try {
					this.checkEmptyValues(v[6], v[5])
					this.checkEmptyValues(v[1], v[2])

					new SetProp(arr, this.type).allResizes()					
				}
				catch (e) {
					throw new Error(e)
				}

			}	
			else {
				throw new Error('error')
			}				
	}

	checkEmptyValues = (curr, sibling) => {
		if (curr === '' || curr === 'undefined') curr = sibling
	}

}

export default function setMediaProps () {
	if (dataMedia) {
		dataMedia.forEach( data => new SetStyles(data).init())			
	}
}


