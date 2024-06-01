/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/base-figure.factory.ts":
/*!**********************************************!*\
  !*** ./src/factories/base-figure.factory.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BaseFigureFactory = exports.onCreateElement = void 0;\nconst propertie_1 = __webpack_require__(/*! ../models/propertie */ \"./src/models/propertie.ts\");\nlet elementsCreated = 0;\nconst onCreateElement = () => {\n    return elementsCreated++;\n};\nexports.onCreateElement = onCreateElement;\nclass BaseFigureFactory {\n    static getBaseProperties() {\n        return [\n            new propertie_1.PercentageProperty(\"opacity\", 1),\n            new propertie_1.NumberProperty(\"rotate\", 0),\n            new propertie_1.EnumProperty(\"transform-origin\", \"center\", [\"center\", \"top\", \"bottom\", \"left\", \"right\"], \"rotate-point\"),\n            new propertie_1.NumberProperty(\"z-index\", (0, exports.onCreateElement)(), \"z-index\"),\n        ].reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr.name]: Object.assign({}, curr) })), {});\n    }\n}\nexports.BaseFigureFactory = BaseFigureFactory;\nBaseFigureFactory.svgNS = \"http://www.w3.org/2000/svg\";\n\n\n//# sourceURL=webpack://cg_fmi/./src/factories/base-figure.factory.ts?");

/***/ }),

/***/ "./src/factories/circle.factory.ts":
/*!*****************************************!*\
  !*** ./src/factories/circle.factory.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CircleFactory = void 0;\nconst circle_1 = __webpack_require__(/*! ../models/circle */ \"./src/models/circle.ts\");\nconst propertie_1 = __webpack_require__(/*! ../models/propertie */ \"./src/models/propertie.ts\");\nconst base_figure_factory_1 = __webpack_require__(/*! ./base-figure.factory */ \"./src/factories/base-figure.factory.ts\");\nclass CircleFactory {\n    createFigure() {\n        const element = document.createElementNS(base_figure_factory_1.BaseFigureFactory.svgNS, \"circle\");\n        const circle = new circle_1.Circle(element);\n        circle.properties = this.getProperties();\n        circle.refreshProperties();\n        return circle;\n    }\n    getProperties() {\n        const currentProps = [\n            new propertie_1.NumberProperty(\"cx\", 50, \"x\"),\n            new propertie_1.NumberProperty(\"cy\", 50, \"y\"),\n            new propertie_1.NumberProperty(\"r\", 10, \"radius\"),\n            new propertie_1.ColorProperty(\"fill\", \"red\"),\n        ].reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr.name]: Object.assign({}, curr) })), {});\n        return Object.assign(Object.assign({}, base_figure_factory_1.BaseFigureFactory.getBaseProperties()), currentProps);\n    }\n}\nexports.CircleFactory = CircleFactory;\n\n\n//# sourceURL=webpack://cg_fmi/./src/factories/circle.factory.ts?");

/***/ }),

/***/ "./src/factories/line.factory.ts":
/*!***************************************!*\
  !*** ./src/factories/line.factory.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.LineFactory = void 0;\nconst line_1 = __webpack_require__(/*! ../models/line */ \"./src/models/line.ts\");\nconst propertie_1 = __webpack_require__(/*! ../models/propertie */ \"./src/models/propertie.ts\");\nconst base_figure_factory_1 = __webpack_require__(/*! ./base-figure.factory */ \"./src/factories/base-figure.factory.ts\");\nclass LineFactory extends base_figure_factory_1.BaseFigureFactory {\n    constructor() {\n        super();\n    }\n    createFigure() {\n        const element = document.createElementNS(base_figure_factory_1.BaseFigureFactory.svgNS, \"line\");\n        const line = new line_1.Line(element);\n        line.properties = this.getProperties();\n        line.refreshProperties();\n        return line;\n    }\n    getProperties() {\n        const currentProps = [\n            new propertie_1.NumberProperty(\"x1\", 50),\n            new propertie_1.NumberProperty(\"y1\", 50),\n            new propertie_1.NumberProperty(\"x2\", 100),\n            new propertie_1.NumberProperty(\"y2\", 100),\n            new propertie_1.ColorProperty(\"stroke\", \"black\"),\n            new propertie_1.NumberProperty(\"z-index\", (0, base_figure_factory_1.onCreateElement)(), \"z-index\"),\n        ].reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr.name]: Object.assign({}, curr) })), {});\n        return Object.assign(Object.assign({}, base_figure_factory_1.BaseFigureFactory.getBaseProperties()), currentProps);\n    }\n}\nexports.LineFactory = LineFactory;\n\n\n//# sourceURL=webpack://cg_fmi/./src/factories/line.factory.ts?");

/***/ }),

/***/ "./src/factories/rectangle.factory.ts":
/*!********************************************!*\
  !*** ./src/factories/rectangle.factory.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RectangleFactory = void 0;\nconst propertie_1 = __webpack_require__(/*! ../models/propertie */ \"./src/models/propertie.ts\");\nconst rectangle_1 = __webpack_require__(/*! ../models/rectangle */ \"./src/models/rectangle.ts\");\nconst base_figure_factory_1 = __webpack_require__(/*! ./base-figure.factory */ \"./src/factories/base-figure.factory.ts\");\nclass RectangleFactory extends base_figure_factory_1.BaseFigureFactory {\n    createFigure() {\n        const element = document.createElementNS(base_figure_factory_1.BaseFigureFactory.svgNS, \"rect\");\n        const rectangle = new rectangle_1.Rectangle(element);\n        rectangle.properties = this.getProperties();\n        rectangle.refreshProperties();\n        return rectangle;\n    }\n    getProperties() {\n        const currentProps = [\n            new propertie_1.NumberProperty(\"x\", 50),\n            new propertie_1.NumberProperty(\"y\", 50),\n            new propertie_1.NumberProperty(\"width\", 100),\n            new propertie_1.NumberProperty(\"height\", 100),\n        ].reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr.name]: Object.assign({}, curr) })), {});\n        return Object.assign(Object.assign({}, base_figure_factory_1.BaseFigureFactory.getBaseProperties()), currentProps);\n    }\n}\nexports.RectangleFactory = RectangleFactory;\n\n\n//# sourceURL=webpack://cg_fmi/./src/factories/rectangle.factory.ts?");

/***/ }),

/***/ "./src/figures-container.ts":
/*!**********************************!*\
  !*** ./src/figures-container.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.figuresContainer = void 0;\nconst svgRoot = document.querySelector(\"#svg-root\");\nexports.figuresContainer = {\n    figures: [],\n    refreshOrder: () => {\n        exports.figuresContainer.figures.sort((fig, fig2) => +fig.properties[\"z-index\"].value - +fig2.properties[\"z-index\"].value);\n        while (svgRoot === null || svgRoot === void 0 ? void 0 : svgRoot.firstChild) {\n            svgRoot.firstChild.remove();\n        }\n        exports.figuresContainer.figures.forEach((fig) => {\n            svgRoot.appendChild(fig.svgElement);\n        });\n    },\n    add: (figure) => {\n        exports.figuresContainer.figures.push(figure);\n        svgRoot.appendChild(figure.svgElement);\n    },\n};\n\n\n//# sourceURL=webpack://cg_fmi/./src/figures-container.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst circle_factory_1 = __webpack_require__(/*! ./factories/circle.factory */ \"./src/factories/circle.factory.ts\");\nconst line_factory_1 = __webpack_require__(/*! ./factories/line.factory */ \"./src/factories/line.factory.ts\");\nconst rectangle_factory_1 = __webpack_require__(/*! ./factories/rectangle.factory */ \"./src/factories/rectangle.factory.ts\");\nconst figures_container_1 = __webpack_require__(/*! ./figures-container */ \"./src/figures-container.ts\");\nconst create_prop_pane_1 = __webpack_require__(/*! ./ui/create-prop-pane */ \"./src/ui/create-prop-pane.ts\");\nconst figureFactories = [\n    new circle_factory_1.CircleFactory(),\n    new rectangle_factory_1.RectangleFactory(),\n    new line_factory_1.LineFactory(),\n];\nconst figuresChooser = document.querySelector(\"#figures-chooser\");\nconst template = document.querySelector(\"#input-template\");\nconst propertiesTab = document.querySelector(\"#properties-tab\");\nconst bootstrap = () => {\n    figureFactories.forEach((figure) => {\n        const button = document.createElement(\"button\");\n        button.textContent = figure.constructor.name;\n        button.addEventListener(\"click\", () => {\n            const newFigure = figure.createFigure();\n            newFigure.svgElement.addEventListener(\"click\", () => (0, create_prop_pane_1.createPropPane)(newFigure));\n            figures_container_1.figuresContainer.add(newFigure);\n        });\n        figuresChooser === null || figuresChooser === void 0 ? void 0 : figuresChooser.appendChild(button);\n    });\n};\nbootstrap();\n\n\n//# sourceURL=webpack://cg_fmi/./src/index.ts?");

/***/ }),

/***/ "./src/models/circle.ts":
/*!******************************!*\
  !*** ./src/models/circle.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Circle = void 0;\nconst figure_1 = __importDefault(__webpack_require__(/*! ./figure */ \"./src/models/figure.ts\"));\nclass Circle extends figure_1.default {\n    constructor(svgEl) {\n        super(svgEl);\n    }\n}\nexports.Circle = Circle;\n\n\n//# sourceURL=webpack://cg_fmi/./src/models/circle.ts?");

/***/ }),

/***/ "./src/models/figure.ts":
/*!******************************!*\
  !*** ./src/models/figure.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Figure {\n    refreshProperties() {\n        Object.keys(this.properties).forEach((key) => {\n            const el = this.properties[key];\n            this.svgElement.setAttributeNS(null, el.name, el.value);\n        });\n        const rotate = this.properties[\"rotate\"];\n        const rotateOrigin = this.properties[\"transform-origin\"];\n        if (!rotate && !rotateOrigin)\n            return;\n        this.svgElement.style.transformOrigin = rotateOrigin;\n        this.svgElement.setAttributeNS(null, \"transform\", `rotate(${rotate.value})`);\n    }\n    constructor(svgElement) {\n        this.svgElement = svgElement;\n        this.properties = {};\n    }\n}\nexports[\"default\"] = Figure;\n\n\n//# sourceURL=webpack://cg_fmi/./src/models/figure.ts?");

/***/ }),

/***/ "./src/models/line.ts":
/*!****************************!*\
  !*** ./src/models/line.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Line = void 0;\nconst figure_1 = __importDefault(__webpack_require__(/*! ./figure */ \"./src/models/figure.ts\"));\nclass Line extends figure_1.default {\n    constructor(svgEl) {\n        super(svgEl);\n    }\n}\nexports.Line = Line;\n\n\n//# sourceURL=webpack://cg_fmi/./src/models/line.ts?");

/***/ }),

/***/ "./src/models/propertie.ts":
/*!*********************************!*\
  !*** ./src/models/propertie.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EnumProperty = exports.PercentageProperty = exports.ColorProperty = exports.StringProperty = exports.NumberProperty = exports.Property = exports.ValueType = void 0;\nvar ValueType;\n(function (ValueType) {\n    ValueType[ValueType[\"Number\"] = 0] = \"Number\";\n    ValueType[ValueType[\"String\"] = 1] = \"String\";\n    ValueType[ValueType[\"Color\"] = 2] = \"Color\";\n    ValueType[ValueType[\"Percent\"] = 3] = \"Percent\";\n    ValueType[ValueType[\"Enums\"] = 4] = \"Enums\";\n})(ValueType || (exports.ValueType = ValueType = {}));\nclass Property {\n    constructor(name, valueType) {\n        this.value = \"\";\n        this.name = name;\n        this.valueType = valueType;\n        this.alias = name;\n    }\n}\nexports.Property = Property;\nclass NumberProperty extends Property {\n    constructor(name, value, alias = name) {\n        super(name, ValueType.Number);\n        this.value = \"\" + value;\n        this.alias = alias;\n    }\n    validate(value) {\n        return typeof value === \"number\";\n    }\n}\nexports.NumberProperty = NumberProperty;\nclass StringProperty extends Property {\n    constructor(name, value, alias = name) {\n        super(name, ValueType.String);\n        this.value = value;\n        this.alias = alias;\n    }\n    validate(value) {\n        return typeof value === \"string\";\n    }\n}\nexports.StringProperty = StringProperty;\nclass ColorProperty extends Property {\n    constructor(name, value, alias = name) {\n        super(name, ValueType.Color);\n        this.value = value;\n        this.alias = alias;\n    }\n    validate(value) {\n        return /^#[0-9A-F]{6}$/i.test(value);\n    }\n}\nexports.ColorProperty = ColorProperty;\nclass PercentageProperty extends Property {\n    constructor(name, value, alias = name) {\n        super(name, ValueType.Percent);\n        this.value = value.toString();\n        this.alias = alias;\n    }\n    validate(value) {\n        return +value >= 0 && +value <= 1;\n    }\n}\nexports.PercentageProperty = PercentageProperty;\nclass EnumProperty extends Property {\n    constructor(name, value, allowedValues, alias = name) {\n        super(name, ValueType.Enums);\n        this.value = value;\n        this.allowedValues = allowedValues;\n        this.alias = alias;\n    }\n    validate(value) {\n        return this.allowedValues.includes(value);\n    }\n}\nexports.EnumProperty = EnumProperty;\n\n\n//# sourceURL=webpack://cg_fmi/./src/models/propertie.ts?");

/***/ }),

/***/ "./src/models/rectangle.ts":
/*!*********************************!*\
  !*** ./src/models/rectangle.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Rectangle = void 0;\nconst figure_1 = __importDefault(__webpack_require__(/*! ./figure */ \"./src/models/figure.ts\"));\nclass Rectangle extends figure_1.default {\n    constructor(svgEl) {\n        super(svgEl);\n    }\n}\nexports.Rectangle = Rectangle;\n\n\n//# sourceURL=webpack://cg_fmi/./src/models/rectangle.ts?");

/***/ }),

/***/ "./src/ui/create-prop-pane.ts":
/*!************************************!*\
  !*** ./src/ui/create-prop-pane.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createPropPane = void 0;\nconst figures_container_1 = __webpack_require__(/*! ../figures-container */ \"./src/figures-container.ts\");\nconst propertie_1 = __webpack_require__(/*! ../models/propertie */ \"./src/models/propertie.ts\");\nconst propertiesTab = document.querySelector(\"#properties-tab\");\nconst createPropPane = (figure) => {\n    while (propertiesTab === null || propertiesTab === void 0 ? void 0 : propertiesTab.firstChild) {\n        propertiesTab.firstChild.remove();\n    }\n    Object.keys(figure.properties).forEach((key) => {\n        const property = figure.properties[key];\n        const wrapper = document.createElement(\"div\");\n        wrapper.classList.add(\"form-group\");\n        const label = document.createElement(\"label\");\n        label.textContent = property.alias;\n        label.htmlFor = property.name;\n        wrapper.appendChild(label);\n        propertiesTab.appendChild(wrapper);\n        let inputElement = document.createElement(\"input\");\n        if (property.valueType === propertie_1.ValueType.Enums) {\n            inputElement = document.createElement(\"select\");\n            property.allowedValues.forEach((value) => {\n                const option = document.createElement(\"option\");\n                option.value = value;\n                option.text = value;\n                inputElement.appendChild(option);\n            });\n            inputElement.value = property.value;\n        }\n        else {\n            const inputType = {\n                [propertie_1.ValueType.Number]: \"number\",\n                [propertie_1.ValueType.String]: \"text\",\n                [propertie_1.ValueType.Color]: \"color\",\n                [propertie_1.ValueType.Percent]: \"number\",\n                [propertie_1.ValueType.Enums]: \"\",\n            };\n            inputElement.type = inputType[property.valueType];\n            inputElement.value = property.value;\n        }\n        wrapper.appendChild(inputElement);\n        inputElement.addEventListener(\"input\", () => {\n            figure.properties[property.name].value = inputElement.value;\n            if (property.name === \"z-index\") {\n                figures_container_1.figuresContainer.refreshOrder();\n            }\n            figure.refreshProperties();\n        });\n        propertiesTab.appendChild(wrapper);\n    });\n};\nexports.createPropPane = createPropPane;\n\n\n//# sourceURL=webpack://cg_fmi/./src/ui/create-prop-pane.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;