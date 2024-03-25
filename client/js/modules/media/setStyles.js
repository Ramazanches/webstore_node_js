export class SetProp {

	constructor(arr, type) {
		this.prop = arr[0]
		this.Xxl = arr[1]
		this.Xl = arr[2]
		this.Lg = arr[3]
		this.Md = arr[4]
		this.Sm = arr[5]
		this.Xs = arr[6]
		this._xxl = arr[7]
		this._xl = arr[8]
		this._lg = arr[9]
		this._md = arr[10]
		this._sm = arr[11]
		this._xs = arr[12]
		this.type = type			
		this.html = document.documentElement
		this.width = window.innerWidth
	}

	resizeXxl = () => this.setValue(this.Xxl, this.Xl, this._xl, this._xxl)

	resizeXl = () => this.setValue(this.Xl, this.Lg, this._lg, this._xl)

	resizeLg = () => this.setValue(this.Lg, this.Md, this._md, this._lg)

	resizeMd = () => this.setValue(this.Md, this.Sm, this._sm, this._md)

	resizeSm = () => this.setValue(this.Sm, this.Xs, this._xs, this._sm)

	setValue = (from, to, min, max) => {
		typeof to === 'object' ?
		this.computed(to[0], to[1], min, max - 1) :
		this.computed(from, to, min, max)			
	}

	computed = (from, to, min, max) => {
		try {
			let em = this.type === 'em',
					rem = this.type === 'rem',
					$from = min, 
					$to = max, 
					start = from, 
					end = to,
					css			

			if (em || rem) {
				start = from / 16
				end = to / 16
			}
			
			if (to > from) {
				$from = max
				$to = min
			}

			css = `calc( ${end}${this.type} + (${start} - ${end}) * (100vw - ${$from}px) / (${$to} - ${$from}) )`

			if (this.width <= max && this.width >= min) {
				this.html.style.setProperty(this.prop, css)
			}			

		} catch (e) {
			console.warn(e)
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

	setValues = (prop) => {
		try {
			const screenArr = [this.xxl, this.xl, this.lg, this.md, this.sm, this.xs]
			if (!prop[6]) prop[6] = prop[5]			
			const arr = prop.concat(screenArr)
			new SetProp(arr, this.type).allResizes()					
		} catch (e) { 
			console.log(e) 
		}
	}

	run = () => {
		try {
			if (Array.isArray(this.props) && !this.props.includes(undefined)) {
				this.props.forEach( prop => {
					if (Array.isArray(prop) && typeof(prop[0]) === 'string') {
						this.setValues(prop)	
					}
				})
			}			
		} catch (e) { 
			console.log(e) 
		}
	}

}