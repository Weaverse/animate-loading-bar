<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/comet_2604-fe0f.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Animate Loading Bar</h3>
  <p align="center">
    1kb loading bar like Shopify, Github, JSFiddle... that works!
    <br />
    <a href="https://hta218.github.io/animate-loading-bar/">View Demo</a>
  </p>
</div>


![Bundle phobia](https://i.imgur.com/zqTcrcV.png)

### Installation
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


## Available options

```javascript
const loading = new AnimateLoading(target, options)
```

- `target` [HTMLElement]: where the loading bar shows up. (Default value: `document.body`)
- `options` [Object]: Loading options
  - `options.overlay` [HTMLElement]: Set a blur overlay to your node (if neccessary)
  - `options.thickness` [String]: the loading bar thickness (Default value: `3px`)
  - `options.color` [String]: the loading bar background color (Default value: `gray`)
  - `options.startDuration` [Number]: The duration (in `ms`) from the point starting your async stuff until it gets done (Default value: `1000`)
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
