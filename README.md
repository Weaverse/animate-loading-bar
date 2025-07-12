<div align="center">
<h3 align="center">Animate Loading Bar</h3>
  <p align="center">
    1kb loading bar like Shopify, Github, JSFiddle... that works!
    <br />
    <a href="https://codesandbox.io/p/sandbox/h5945y">View Demo</a>
  </p>
</div>


![Bundle phobia](https://i.imgur.com/zqTcrcV.png)

## Installation
1. Via npm
	```sh
	npm install animate-loading
	```
	Or yarn
	```sh
	yarn add animate-loading
	```
2. Import to your project
	```js
	import 'animate-loading/dist/main.css'
	import AnimateLoading from 'animate-loading'
	```

	**TypeScript:**
	```ts
	import AnimateLoading, { AnimateLoadingOptions } from 'animate-loading'
	import 'animate-loading/dist/main.css'
	```
3. Usage
	```js
	// Create an instance in your project
	const loading = new AnimateLoading()

	// Start loading
	loading.start()

	// Execute your async stuff
	await fetch('YOUR_API')

	// Finish loading
	loading.finish()
	```

	**TypeScript with full type safety:**
	```ts
	import AnimateLoading, { AnimateLoadingOptions } from 'animate-loading'
	
	const options: AnimateLoadingOptions = {
		thickness: '4px',
		color: '#3498db',
		startDuration: 1200,
		finishDuration: 400
	}
	
	const loading = new AnimateLoading(document.body, options)
	
	loading.start()
	await fetch('YOUR_API')
	loading.finish(() => console.log('Done!'))
	```


## Available options

```javascript
const loading = new AnimateLoading(target, options)
```

- `target` [HTMLElement]: where the loading bar shows up. (Default value: `document.body`)
- `options` [Object]: Loading options
  - `options.overlay` [HTMLElement]: Set a blur overlay to your node (if necessary)
  - `options.thickness` [String]: the loading bar thickness (Default value: `3px`)
  - `options.color` [String]: the loading bar background color (Default value: `gray`)
  - `options.startDuration` [Number]: The duration (in `ms`) from the start of your async stuff until it gets done (Default value: `1000`)
  - `options.finishDuration` [Number]: The duration (in `ms`) left to finish loading (Default value: `300`)

## Methods

1. Start loading
	```javascript
	loading.start()
	```
	Run this before starting your async stuff

2. Finish loading
	```javascript
	loading.finish(callback = () => {})
	```
	Run this after your async stuff gets done.

	Optional `callback` can be pass to run after finishing the loading process.

## Credit

Copyright (c) 2022 Leo Huynh @ [https://leohuynh.dev](https://leohuynh.dev)
