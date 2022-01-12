/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["animate-loading"] = factory();
	else
		root["animate-loading"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AnimateLoading)\n/* harmony export */ });\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar _defaultOptions = {\n  overlay: null,\n  thickness: '3px',\n  color: 'gray',\n  startDuration: 1000,\n  finishDuration: 300\n};\n\nvar AnimateLoading = /*#__PURE__*/_createClass(function AnimateLoading() {\n  var _this = this;\n\n  var _target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;\n\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  _classCallCheck(this, AnimateLoading);\n\n  _defineProperty(this, \"setLoadingData\", function () {\n    var target = _this.target,\n        _this$options = _this.options,\n        startDuration = _this$options.startDuration,\n        finishDuration = _this$options.finishDuration,\n        thickness = _this$options.thickness,\n        color = _this$options.color;\n    target.style.setProperty('--al-thickness', \" \".concat(thickness));\n    target.style.setProperty('--al-color', \" \".concat(color));\n    target.style.setProperty('--al-start-duration', \" \".concat(startDuration, \"ms\"));\n    target.style.setProperty('--al-finish-duration', \" \".concat(finishDuration, \"ms\"));\n  });\n\n  _defineProperty(this, \"start\", function () {\n    _this.target.classList.add('al-loading-bar', 'start', 'loading');\n\n    if (_this.overlay) _this.overlay.classList.add('al-loading-overlay', 'overlay-show');\n  });\n\n  _defineProperty(this, \"finish\", function () {\n    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};\n    var target = _this.target,\n        overlay = _this.overlay,\n        cleanUp = _this.cleanUp,\n        finishDuration = _this.options.finishDuration;\n    var endWidth = window.getComputedStyle(target, ':before').width;\n    target.style.setProperty('--al-end-width', endWidth);\n    target.classList.add('loaded');\n    target.classList.remove('loading');\n    window.requestAnimationFrame(function () {\n      target.classList.add('finished');\n      if (_this.overlay) overlay.classList.remove('overlay-show');\n    });\n    setTimeout(cleanUp, finishDuration * 2);\n    setTimeout(callback, finishDuration);\n  });\n\n  _defineProperty(this, \"cleanUp\", function () {\n    _this.target.classList.remove('al-loading-bar', 'start', 'loaded', 'finished');\n\n    if (_this.overlay) _this.overlay.classList.remove('al-loading-overlay');\n  });\n\n  this.options = Object.assign({}, _defaultOptions, options);\n  this.target = _target;\n  this.overlay = this.options.overlay;\n  this.setLoadingData();\n});\n\n\n\n//# sourceURL=webpack://animate-loading/./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://animate-loading/./src/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});