import setMediaProps from './modules/mediaQueries/setMediaProps.js'

if (document.readyState === 'interactive') {
	window.addEventListener('DOMContentLoaded', setMediaProps)
}