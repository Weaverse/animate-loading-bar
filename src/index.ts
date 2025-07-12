import './style.css'

export interface AnimateLoadingOptions {
	/** Set a blur overlay to your node (if necessary) */
	overlay?: HTMLElement | null
	/** The loading bar thickness (Default: '3px') */
	thickness?: string
	/** The loading bar background color (Default: 'gray') */
	color?: string
	/** The overlay background color (Default: '#ffffff') */
	overlayColor?: string
	/** The overlay opacity when shown (Default: 0.6) */
	overlayOpacity?: number
	/** The duration (in ms) from the start of your async stuff until it gets done (Default: 1000) */
	startDuration?: number
	/** The duration (in ms) left to finish loading (Default: 300) */
	finishDuration?: number
}

const DEFAULT_OPTIONS: Required<AnimateLoadingOptions> = {
	overlay: null,
	thickness: '3px',
	color: 'gray',
	overlayColor: '#ffffff',
	overlayOpacity: 0.6,
	startDuration: 1000,
	finishDuration: 300,
}

export default class AnimateLoading {
	private options: Required<AnimateLoadingOptions>
	private target: HTMLElement
	private overlay: HTMLElement | null
	private isLoading: boolean = false
	private timeoutIds: number[] = []

	/**
	 * Create an AnimateLoading instance
	 * @param target - Where the loading bar shows up (Default: document.body)
	 * @param options - Loading options
	 */
	constructor(target: HTMLElement = document.body, options: AnimateLoadingOptions = {}) {
		if (!target || !(target instanceof HTMLElement)) {
			throw new Error('AnimateLoading: target must be a valid HTMLElement')
		}
		
		this.options = Object.assign({}, DEFAULT_OPTIONS, options)
		this.target = target
		this.overlay = this.options.overlay
		this.setLoadingData()
	}

	private setLoadingData = (): void => {
		const {
			target,
			options: { startDuration, finishDuration, thickness, color, overlayColor, overlayOpacity }
		} = this

		// Validate thickness format (should be valid CSS length)
		const validThickness = this.validateCSSLength(thickness) ? thickness : '3px'
		
		// Validate color (basic validation)
		const validColor = this.validateCSSColor(color) ? color : 'gray'
		const validOverlayColor = this.validateCSSColor(overlayColor) ? overlayColor : '#ffffff'

		target.style.setProperty('--al-thickness', validThickness)
		target.style.setProperty('--al-color', validColor)
		target.style.setProperty('--al-overlay-color', validOverlayColor)
		target.style.setProperty('--al-overlay-opacity', Math.min(1, Math.max(0, overlayOpacity)).toString())
		target.style.setProperty('--al-start-duration', `${Math.max(0, startDuration)}ms`)
		target.style.setProperty('--al-finish-duration', `${Math.max(0, finishDuration)}ms`)
	}

	private validateCSSLength = (value: string): boolean => {
		return /^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/.test(value.trim())
	}

	private validateCSSColor = (value: string): boolean => {
		// Basic validation for common color formats
		const colorPatterns = [
			/^#[0-9a-fA-F]{3,8}$/, // hex colors
			/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/, // rgb
			/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/, // rgba
			/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/, // hsl
			/^[a-zA-Z]+$/ // named colors
		]
		return colorPatterns.some(pattern => pattern.test(value.trim()))
	}

	/**
	 * Start the loading animation
	 * Run this before starting your async stuff
	 */
	start = (): void => {
		if (this.isLoading) {
			console.warn('AnimateLoading: Loading is already in progress. Call finish() first.')
			return
		}

		if (!this.target) {
			console.error('AnimateLoading: target element is null or undefined')
			return
		}

		this.isLoading = true
		this.target.classList.add('al-loading-bar', 'start', 'loading')
		if (this.overlay) this.overlay.classList.add('al-loading-overlay', 'overlay-show')
	}

	/**
	 * Finish the loading animation
	 * Run this after your async stuff gets done
	 * @param callback - Optional callback to run after finishing the loading process
	 */
	finish = (callback: () => void = () => {}): void => {
		if (!this.isLoading) {
			console.warn('AnimateLoading: No loading in progress to finish')
			return
		}

		const { target, overlay, cleanUp, options: { finishDuration } } = this

		// Get the current width before making any changes
		const endWidth = window.getComputedStyle(target, '::before').width
		target.style.setProperty('--al-end-width', endWidth)

		target.classList.add('loaded')
		target.classList.remove('loading')

		window.requestAnimationFrame(() => {
			target.classList.add('finished')
			if (this.overlay && overlay) overlay.classList.remove('overlay-show')
		})

		// Track timeout IDs for cleanup
		const cleanupId = window.setTimeout(() => {
			cleanUp()
			this.isLoading = false
		}, finishDuration * 2)
		
		const callbackId = window.setTimeout(callback, finishDuration)
		
		this.timeoutIds.push(cleanupId, callbackId)
	}

	private cleanUp = (): void => {
		this.target.classList.remove('al-loading-bar', 'start', 'loaded', 'finished')
		if (this.overlay) this.overlay.classList.remove('al-loading-overlay')
		
		// Clear completed timeouts from the array
		this.timeoutIds = this.timeoutIds.filter(id => {
			try {
				clearTimeout(id)
				return false
			} catch {
				return false
			}
		})
	}

	/**
	 * Destroy the loading instance and clean up all resources
	 * Call this when you no longer need the instance
	 */
	destroy = (): void => {
		// Clear any pending timeouts
		this.timeoutIds.forEach(id => clearTimeout(id))
		this.timeoutIds = []
		
		// Clean up DOM classes
		this.cleanUp()
		
		// Reset state
		this.isLoading = false
	}

	/**
	 * Check if loading is currently in progress
	 */
	get loading(): boolean {
		return this.isLoading
	}
}
