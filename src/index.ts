import './style.scss'

export interface AnimateLoadingOptions {
	/** Set a blur overlay to your node (if necessary) */
	overlay?: HTMLElement | null
	/** The loading bar thickness (Default: '3px') */
	thickness?: string
	/** The loading bar background color (Default: 'gray') */
	color?: string
	/** The duration (in ms) from the start of your async stuff until it gets done (Default: 1000) */
	startDuration?: number
	/** The duration (in ms) left to finish loading (Default: 300) */
	finishDuration?: number
}

const DEFAULT_OPTIONS: Required<AnimateLoadingOptions> = {
	overlay: null,
	thickness: '3px',
	color: 'gray',
	startDuration: 1000,
	finishDuration: 300,
}

export default class AnimateLoading {
	private options: Required<AnimateLoadingOptions>
	private target: HTMLElement
	private overlay: HTMLElement | null

	/**
	 * Create an AnimateLoading instance
	 * @param target - Where the loading bar shows up (Default: document.body)
	 * @param options - Loading options
	 */
	constructor(target: HTMLElement = document.body, options: AnimateLoadingOptions = {}) {
		this.options = Object.assign({}, DEFAULT_OPTIONS, options)
		this.target = target
		this.overlay = this.options.overlay
		this.setLoadingData()
	}

	private setLoadingData = (): void => {
		const {
			target,
			options: { startDuration, finishDuration, thickness, color }
		} = this

		target.style.setProperty('--al-thickness', ` ${thickness}`)
		target.style.setProperty('--al-color', ` ${color}`)
		target.style.setProperty('--al-start-duration', ` ${startDuration}ms`)
		target.style.setProperty('--al-finish-duration', ` ${finishDuration}ms`)
	}

	/**
	 * Start the loading animation
	 * Run this before starting your async stuff
	 */
	start = (): void => {
		this.target.classList.add('al-loading-bar', 'start', 'loading')
		if (this.overlay) this.overlay.classList.add('al-loading-overlay', 'overlay-show')
	}

	/**
	 * Finish the loading animation
	 * Run this after your async stuff gets done
	 * @param callback - Optional callback to run after finishing the loading process
	 */
	finish = (callback: () => void = () => {}): void => {
		const { target, overlay, cleanUp, options: { finishDuration } } = this

		const endWidth = window.getComputedStyle(target, ':before').width
		target.style.setProperty('--al-end-width', endWidth)

		target.classList.add('loaded')
		target.classList.remove('loading')

		window.requestAnimationFrame(() => {
			target.classList.add('finished')
			if (this.overlay && overlay) overlay.classList.remove('overlay-show')
		})
		setTimeout(cleanUp, finishDuration * 2)
		setTimeout(callback, finishDuration)
	}

	private cleanUp = (): void => {
		this.target.classList.remove('al-loading-bar', 'start', 'loaded', 'finished')
		if (this.overlay) this.overlay.classList.remove('al-loading-overlay')
	}
}
