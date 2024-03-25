import setMediaProps from './modules/media/setMediaProps.js'

if (document.readyState === 'interactive') {
	window.addEventListener('DOMContentLoaded', setMediaProps)
}