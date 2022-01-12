import './style.scss'

const _defaultOptions = {
	overlay: null,
	thickness: '3px',
	color: 'gray',
	startDuration: 1000,
	finishDuration: 300,
}
export default class AnimateLoading {
	constructor(target = document.body, options = {}) {
		this.options = Object.assign({}, _defaultOptions, options)
		this.target = target
		this.overlay = this.options.overlay
		this.setLoadingData()
	}

	setLoadingData = () => {
		const {
			target,
			options: { startDuration, finishDuration, thickness, color }
		} = this

		target.style.setProperty('--al-thickness', ` ${thickness}`)
		target.style.setProperty('--al-color', ` ${color}`)
		target.style.setProperty('--al-start-duration', ` ${startDuration}ms`)
		target.style.setProperty('--al-finish-duration', ` ${finishDuration}ms`)
	}

	start = () => {
		this.target.classList.add('al-loading-bar', 'start', 'loading')
		if (this.overlay) this.overlay.classList.add('al-loading-overlay', 'overlay-show')
	}

	finish = (callback = () => { }) => {
		const { target, overlay, cleanUp, options: { finishDuration } } = this

		const endWidth = window.getComputedStyle(target, ':before').width
		target.style.setProperty('--al-end-width', endWidth)

		target.classList.add('loaded')
		target.classList.remove('loading')

		window.requestAnimationFrame(() => {
			target.classList.add('finished')
			if (this.overlay) overlay.classList.remove('overlay-show')
		})
		setTimeout(cleanUp, finishDuration * 2)
		setTimeout(callback, finishDuration)
	}

	cleanUp = () => {
		this.target.classList.remove('al-loading-bar', 'start', 'loaded', 'finished')
		if (this.overlay) this.overlay.classList.remove('al-loading-overlay')
	}
}
