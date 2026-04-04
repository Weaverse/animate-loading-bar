<div align="center">
<h3 align="center">@weaverse/animate-loading</h3>
  <p align="center">
    Lightweight TypeScript loading bar like Shopify, Github, JSFiddle... that works!
  </p>
</div>

<div align="center">
  

[![CodeSandbox Demo](https://img.shields.io/badge/CodeSandbox-Demo-blue?style=flat&logo=codesandbox)](https://codesandbox.io/p/sandbox/h5945y)
[![bundle size](https://deno.bundlejs.com/badge?q=@weaverse/animate-loading@latest)](https://deno.bundlejs.com/badge?q=@weaverse/animate-loading@latest)
[![npm version](https://img.shields.io/npm/v/@weaverse/animate-loading.svg?style=flat)](https://www.npmjs.com/package/@weaverse/animate-loading)
[![npm downloads](https://img.shields.io/npm/dm/@weaverse/animate-loading.svg?style=flat)](https://www.npmjs.com/package/@weaverse/animate-loading)

</div>


## ✨ Features

- 🚀 **Lightweight**: ~3kB gzipped bundle size
- 📦 **Zero Dependencies**: Pure TypeScript
- 🎨 **Customizable**: Colors, thickness, timing, overlay options
- 🔒 **Type Safe**: Full TypeScript support with exported types
- 🎯 **Modern**: Uses CSS custom properties and modern APIs


## Installation

```sh
npm install @weaverse/animate-loading
```

## Usage

```ts
import AnimateLoading from '@weaverse/animate-loading'
import '@weaverse/animate-loading/style.css'

// Create an instance
const loading = new AnimateLoading()

// Start loading
loading.start()

// Execute your async stuff
await fetch('YOUR_API')

// Finish loading
loading.finish()
```

### With options

```ts
import AnimateLoading, { type AnimateLoadingOptions } from '@weaverse/animate-loading'
import '@weaverse/animate-loading/style.css'

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

```ts
const loading = new AnimateLoading(target, options)
```

- `target` [HTMLElement]: where the loading bar shows up. (Default value: `document.body`)
- `options` [Object]: Loading options
  - `options.overlay` [HTMLElement]: Set a blur overlay to your node (if necessary)
  - `options.thickness` [String]: the loading bar thickness (Default value: `3px`)
  - `options.color` [String]: the loading bar background color (Default value: `gray`)
  - `options.overlayColor` [String]: the overlay background color (Default value: `#ffffff`)
  - `options.overlayOpacity` [Number]: the overlay opacity when shown (Default value: `0.6`)
  - `options.startDuration` [Number]: The duration (in `ms`) from the start of your async stuff until it gets done (Default value: `1000`)
  - `options.finishDuration` [Number]: The duration (in `ms`) left to finish loading (Default value: `300`)

## Methods

1. **Start loading**
  ```ts
  loading.start()
  ```
  Run this before starting your async stuff

2. **Finish loading**
  ```ts
  loading.finish(callback = () => {})
  ```
  Run this after your async stuff gets done.

  Optional `callback` can be pass to run after finishing the loading process.

3. **Check loading state**
  ```ts
  if (loading.loading) {
    console.log('Loading in progress...')
  }
  ```

4. **Destroy instance**
  ```ts
  loading.destroy()
  ```
  Call this when you no longer need the instance. Cleans up all timeouts and DOM classes.

## Advanced Usage

```ts
const loading = new AnimateLoading(document.body, {
  thickness: '4px',
  color: '#3498db',
  overlayColor: '#000000',
  overlayOpacity: 0.8,
  startDuration: 1500,
  finishDuration: 500
})

// Safe usage with state checking
if (!loading.loading) {
  loading.start()
  
  try {
    await someAsyncOperation()
    loading.finish(() => console.log('Success!'))
  } catch (error) {
    loading.finish(() => console.error('Failed!'))
  }
}

// Clean up when done
loading.destroy()
```

## Credit

Copyright (c) 2022-present by [Weaverse](https://weaverse.io)
