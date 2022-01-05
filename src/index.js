import './style.scss'

export default class AnimateLoading {
  selectors = {
    loadingBar: 'al-loading-bar',
    loadingOverlay: 'al-loading-overlay',
  }
  defaultOptions = {
    overlay: null,
    overlayShowClass: 'overlay-show',
    thickness: '3px',
    color: 'gray',
    startDuration: 1000,
    finishDuration: 300,
  }

  constructor(target, options = {}) {
    this.options = Object.assign({}, this.defaultOptions, options)
    this.target = target
    this.overlay = this.options.overlay || this.target
    this.cleanUp = this.cleanUp.bind(this)
    this.setLoadingData()
  }

  setLoadingData() {
    const {
      overlay,
      options: { startDuration, finishDuration, thickness, color }
    } = this

    overlay.style.setProperty('--al-thickness', ` ${thickness}`)
    overlay.style.setProperty('--al-color', ` ${color}`)
    overlay.style.setProperty('--al-start-duration', ` ${startDuration}ms`)
    overlay.style.setProperty('--al-finish-duration', ` ${finishDuration}ms`)
  }

  start() {
    this.target.classList.add(this.selectors.loadingBar, 'start', 'loading')
    this.overlay.classList.add(this.selectors.loadingOverlay, this.options.overlayShowClass)
  }

  finish(callback = () => { }) {
    const { target, overlay, cleanUp, options: { finishDuration } } = this

    const endWidth = window.getComputedStyle(target, ':before').width
    target.style.setProperty('--al-end-width', endWidth)

    target.classList.add('loaded')
    target.classList.remove('loading')

    window.requestAnimationFrame(() => {
      target.classList.add('finished')
      overlay.classList.remove(this.options.overlayShowClass)
    })
    setTimeout(cleanUp, finishDuration * 2)
    setTimeout(callback, finishDuration)
  }

  cleanUp() {
    this.target.classList.remove(this.selectors.loadingBar, 'start', 'loaded', 'finished')
    this.overlay.classList.remove(this.selectors.loadingOverlay)
  }
}