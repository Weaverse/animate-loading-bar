interface AnimateLoadingOptions {
    /** Set a blur overlay to your node (if necessary) */
    overlay?: HTMLElement | null;
    /** The loading bar thickness (Default: '3px') */
    thickness?: string;
    /** The loading bar background color (Default: 'gray') */
    color?: string;
    /** The overlay background color (Default: '#ffffff') */
    overlayColor?: string;
    /** The overlay opacity when shown (Default: 0.6) */
    overlayOpacity?: number;
    /** The duration (in ms) from the start of your async stuff until it gets done (Default: 1000) */
    startDuration?: number;
    /** The duration (in ms) left to finish loading (Default: 300) */
    finishDuration?: number;
}
declare class AnimateLoading {
    private options;
    private target;
    private overlay;
    private isLoading;
    private timeoutIds;
    /**
     * Create an AnimateLoading instance
     * @param target - Where the loading bar shows up (Default: document.body)
     * @param options - Loading options
     */
    constructor(target?: HTMLElement, options?: AnimateLoadingOptions);
    private setLoadingData;
    private validateCSSLength;
    private validateCSSColor;
    /**
     * Start the loading animation
     * Run this before starting your async stuff
     */
    start: () => void;
    /**
     * Finish the loading animation
     * Run this after your async stuff gets done
     * @param callback - Optional callback to run after finishing the loading process
     */
    finish: (callback?: () => void) => void;
    private cleanUp;
    /**
     * Destroy the loading instance and clean up all resources
     * Call this when you no longer need the instance
     */
    destroy: () => void;
    /**
     * Check if loading is currently in progress
     */
    get loading(): boolean;
}

export { type AnimateLoadingOptions, AnimateLoading as default };
