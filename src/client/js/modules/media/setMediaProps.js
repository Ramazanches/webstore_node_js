import { dataMedia } from '../../store/dataMedia.js'
import { SetStyles } from './setStyles.js'

function setMediaProps () {
	try {
		dataMedia.forEach(data => {
			new SetStyles(data).run()
		})			
	} catch (e) {
		console.warn(e)
	}
}

export default setMediaProps