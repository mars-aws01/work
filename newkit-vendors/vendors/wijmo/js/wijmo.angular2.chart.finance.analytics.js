"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wjcChartFinanceAnalytics = require("wijmo/wijmo.chart.finance.analytics");
/*
    *
    * Wijmo Library 5.20173.405
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
/**
* Contains Angular 2 components for the <b>wijmo.chart.finance.analytics</b> module.
*
* <b>wijmo.angular2.chart.finance.analytics</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinanceAnalitics from 'wijmo/wijmo.angular2.chart.finance.analytics';</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.finance.analytics'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexChartFibonacciMeta = {
    selector: 'wj-flex-chart-fibonacci',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'high',
        'low',
        'labelPosition',
        'levels',
        'minX',
        'maxX',
        'uptrend',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.Fibonacci control.
 *
 * The <b>wj-flex-chart-fibonacci</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-fibonacci</b> component to add <b>Fibonacci</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartFibonacci</b> component is derived from the <b>Fibonacci</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartFibonacci = /** @class */ (function (_super) {
    __extends(WjFlexChartFibonacci, _super);
    function WjFlexChartFibonacci(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartFibonacci.prototype.created = function () {
    };
    WjFlexChartFibonacci.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartFibonacci.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartFibonacci.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartFibonacci.meta = {
        outputs: exports.wjFlexChartFibonacciMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartFibonacci.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartFibonacciMeta.selector,
                    template: exports.wjFlexChartFibonacciMeta.template,
                    inputs: exports.wjFlexChartFibonacciMeta.inputs,
                    outputs: exports.wjFlexChartFibonacciMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacci; }) }
                    ].concat(exports.wjFlexChartFibonacciMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartFibonacci.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartFibonacci;
}(wjcChartFinanceAnalytics.Fibonacci));
exports.WjFlexChartFibonacci = WjFlexChartFibonacci;
exports.wjFlexChartFibonacciArcsMeta = {
    selector: 'wj-flex-chart-fibonacci-arcs',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'start',
        'end',
        'labelPosition',
        'levels',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciArcs control.
 *
 * The <b>wj-flex-chart-fibonacci-arcs</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-fibonacci-arcs</b> component to add <b>FibonacciArcs</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartFibonacciArcs</b> component is derived from the <b>FibonacciArcs</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartFibonacciArcs = /** @class */ (function (_super) {
    __extends(WjFlexChartFibonacciArcs, _super);
    function WjFlexChartFibonacciArcs(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartFibonacciArcs.prototype.created = function () {
    };
    WjFlexChartFibonacciArcs.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartFibonacciArcs.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartFibonacciArcs.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartFibonacciArcs.meta = {
        outputs: exports.wjFlexChartFibonacciArcsMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartFibonacciArcs.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartFibonacciArcsMeta.selector,
                    template: exports.wjFlexChartFibonacciArcsMeta.template,
                    inputs: exports.wjFlexChartFibonacciArcsMeta.inputs,
                    outputs: exports.wjFlexChartFibonacciArcsMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciArcs; }) }
                    ].concat(exports.wjFlexChartFibonacciArcsMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartFibonacciArcs.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartFibonacciArcs;
}(wjcChartFinanceAnalytics.FibonacciArcs));
exports.WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs;
exports.wjFlexChartFibonacciFansMeta = {
    selector: 'wj-flex-chart-fibonacci-fans',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'start',
        'end',
        'labelPosition',
        'levels',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciFans control.
 *
 * The <b>wj-flex-chart-fibonacci-fans</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-fibonacci-fans</b> component to add <b>FibonacciFans</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartFibonacciFans</b> component is derived from the <b>FibonacciFans</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartFibonacciFans = /** @class */ (function (_super) {
    __extends(WjFlexChartFibonacciFans, _super);
    function WjFlexChartFibonacciFans(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartFibonacciFans.prototype.created = function () {
    };
    WjFlexChartFibonacciFans.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartFibonacciFans.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartFibonacciFans.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartFibonacciFans.meta = {
        outputs: exports.wjFlexChartFibonacciFansMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartFibonacciFans.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartFibonacciFansMeta.selector,
                    template: exports.wjFlexChartFibonacciFansMeta.template,
                    inputs: exports.wjFlexChartFibonacciFansMeta.inputs,
                    outputs: exports.wjFlexChartFibonacciFansMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciFans; }) }
                    ].concat(exports.wjFlexChartFibonacciFansMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartFibonacciFans.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartFibonacciFans;
}(wjcChartFinanceAnalytics.FibonacciFans));
exports.WjFlexChartFibonacciFans = WjFlexChartFibonacciFans;
exports.wjFlexChartFibonacciTimeZonesMeta = {
    selector: 'wj-flex-chart-fibonacci-time-zones',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'startX',
        'endX',
        'labelPosition',
        'levels',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciTimeZones control.
 *
 * The <b>wj-flex-chart-fibonacci-time-zones</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-fibonacci-time-zones</b> component to add <b>FibonacciTimeZones</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartFibonacciTimeZones</b> component is derived from the <b>FibonacciTimeZones</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartFibonacciTimeZones = /** @class */ (function (_super) {
    __extends(WjFlexChartFibonacciTimeZones, _super);
    function WjFlexChartFibonacciTimeZones(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartFibonacciTimeZones.prototype.created = function () {
    };
    WjFlexChartFibonacciTimeZones.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartFibonacciTimeZones.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartFibonacciTimeZones.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartFibonacciTimeZones.meta = {
        outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartFibonacciTimeZones.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartFibonacciTimeZonesMeta.selector,
                    template: exports.wjFlexChartFibonacciTimeZonesMeta.template,
                    inputs: exports.wjFlexChartFibonacciTimeZonesMeta.inputs,
                    outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciTimeZones; }) }
                    ].concat(exports.wjFlexChartFibonacciTimeZonesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartFibonacciTimeZones.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartFibonacciTimeZones;
}(wjcChartFinanceAnalytics.FibonacciTimeZones));
exports.WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones;
exports.wjFlexChartAtrMeta = {
    selector: 'wj-flex-chart-atr',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'period',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.ATR control.
 *
 * The <b>wj-flex-chart-atr</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-atr</b> component to add <b>ATR</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartAtr</b> component is derived from the <b>ATR</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartAtr = /** @class */ (function (_super) {
    __extends(WjFlexChartAtr, _super);
    function WjFlexChartAtr(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartAtr.prototype.created = function () {
    };
    WjFlexChartAtr.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartAtr.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartAtr.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartAtr.meta = {
        outputs: exports.wjFlexChartAtrMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartAtr.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartAtrMeta.selector,
                    template: exports.wjFlexChartAtrMeta.template,
                    inputs: exports.wjFlexChartAtrMeta.inputs,
                    outputs: exports.wjFlexChartAtrMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAtr; }) }
                    ].concat(exports.wjFlexChartAtrMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartAtr.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartAtr;
}(wjcChartFinanceAnalytics.ATR));
exports.WjFlexChartAtr = WjFlexChartAtr;
exports.wjFlexChartCciMeta = {
    selector: 'wj-flex-chart-cci',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'period',
        'constant',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.CCI control.
 *
 * The <b>wj-flex-chart-cci</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-cci</b> component to add <b>CCI</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartCci</b> component is derived from the <b>CCI</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartCci = /** @class */ (function (_super) {
    __extends(WjFlexChartCci, _super);
    function WjFlexChartCci(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartCci.prototype.created = function () {
    };
    WjFlexChartCci.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartCci.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartCci.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartCci.meta = {
        outputs: exports.wjFlexChartCciMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartCci.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartCciMeta.selector,
                    template: exports.wjFlexChartCciMeta.template,
                    inputs: exports.wjFlexChartCciMeta.inputs,
                    outputs: exports.wjFlexChartCciMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartCci; }) }
                    ].concat(exports.wjFlexChartCciMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartCci.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartCci;
}(wjcChartFinanceAnalytics.CCI));
exports.WjFlexChartCci = WjFlexChartCci;
exports.wjFlexChartRsiMeta = {
    selector: 'wj-flex-chart-rsi',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'period',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.RSI control.
 *
 * The <b>wj-flex-chart-rsi</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-rsi</b> component to add <b>RSI</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartRsi</b> component is derived from the <b>RSI</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartRsi = /** @class */ (function (_super) {
    __extends(WjFlexChartRsi, _super);
    function WjFlexChartRsi(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartRsi.prototype.created = function () {
    };
    WjFlexChartRsi.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartRsi.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartRsi.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartRsi.meta = {
        outputs: exports.wjFlexChartRsiMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartRsi.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartRsiMeta.selector,
                    template: exports.wjFlexChartRsiMeta.template,
                    inputs: exports.wjFlexChartRsiMeta.inputs,
                    outputs: exports.wjFlexChartRsiMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRsi; }) }
                    ].concat(exports.wjFlexChartRsiMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartRsi.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartRsi;
}(wjcChartFinanceAnalytics.RSI));
exports.WjFlexChartRsi = WjFlexChartRsi;
exports.wjFlexChartWilliamsRMeta = {
    selector: 'wj-flex-chart-williams-r',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'period',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.WilliamsR control.
 *
 * The <b>wj-flex-chart-williams-r</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-williams-r</b> component to add <b>WilliamsR</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartWilliamsR</b> component is derived from the <b>WilliamsR</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartWilliamsR = /** @class */ (function (_super) {
    __extends(WjFlexChartWilliamsR, _super);
    function WjFlexChartWilliamsR(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartWilliamsR.prototype.created = function () {
    };
    WjFlexChartWilliamsR.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartWilliamsR.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartWilliamsR.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartWilliamsR.meta = {
        outputs: exports.wjFlexChartWilliamsRMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartWilliamsR.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartWilliamsRMeta.selector,
                    template: exports.wjFlexChartWilliamsRMeta.template,
                    inputs: exports.wjFlexChartWilliamsRMeta.inputs,
                    outputs: exports.wjFlexChartWilliamsRMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWilliamsR; }) }
                    ].concat(exports.wjFlexChartWilliamsRMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartWilliamsR.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartWilliamsR;
}(wjcChartFinanceAnalytics.WilliamsR));
exports.WjFlexChartWilliamsR = WjFlexChartWilliamsR;
exports.wjFlexChartMacdMeta = {
    selector: 'wj-flex-chart-macd',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'fastPeriod',
        'slowPeriod',
        'smoothingPeriod',
        'styles',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.Macd control.
 *
 * The <b>wj-flex-chart-macd</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-macd</b> component to add <b>Macd</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartMacd</b> component is derived from the <b>Macd</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartMacd = /** @class */ (function (_super) {
    __extends(WjFlexChartMacd, _super);
    function WjFlexChartMacd(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartMacd.prototype.created = function () {
    };
    WjFlexChartMacd.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartMacd.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartMacd.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartMacd.meta = {
        outputs: exports.wjFlexChartMacdMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartMacd.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartMacdMeta.selector,
                    template: exports.wjFlexChartMacdMeta.template,
                    inputs: exports.wjFlexChartMacdMeta.inputs,
                    outputs: exports.wjFlexChartMacdMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacd; }) }
                    ].concat(exports.wjFlexChartMacdMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartMacd.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartMacd;
}(wjcChartFinanceAnalytics.Macd));
exports.WjFlexChartMacd = WjFlexChartMacd;
exports.wjFlexChartMacdHistogramMeta = {
    selector: 'wj-flex-chart-macd-histogram',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'fastPeriod',
        'slowPeriod',
        'smoothingPeriod',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.MacdHistogram control.
 *
 * The <b>wj-flex-chart-macd-histogram</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-macd-histogram</b> component to add <b>MacdHistogram</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartMacdHistogram</b> component is derived from the <b>MacdHistogram</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartMacdHistogram = /** @class */ (function (_super) {
    __extends(WjFlexChartMacdHistogram, _super);
    function WjFlexChartMacdHistogram(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartMacdHistogram.prototype.created = function () {
    };
    WjFlexChartMacdHistogram.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartMacdHistogram.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartMacdHistogram.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartMacdHistogram.meta = {
        outputs: exports.wjFlexChartMacdHistogramMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartMacdHistogram.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartMacdHistogramMeta.selector,
                    template: exports.wjFlexChartMacdHistogramMeta.template,
                    inputs: exports.wjFlexChartMacdHistogramMeta.inputs,
                    outputs: exports.wjFlexChartMacdHistogramMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacdHistogram; }) }
                    ].concat(exports.wjFlexChartMacdHistogramMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartMacdHistogram.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartMacdHistogram;
}(wjcChartFinanceAnalytics.MacdHistogram));
exports.WjFlexChartMacdHistogram = WjFlexChartMacdHistogram;
exports.wjFlexChartStochasticMeta = {
    selector: 'wj-flex-chart-stochastic',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'dPeriod',
        'kPeriod',
        'smoothingPeriod',
        'styles',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.Stochastic control.
 *
 * The <b>wj-flex-chart-stochastic</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-stochastic</b> component to add <b>Stochastic</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartStochastic</b> component is derived from the <b>Stochastic</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartStochastic = /** @class */ (function (_super) {
    __extends(WjFlexChartStochastic, _super);
    function WjFlexChartStochastic(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartStochastic.prototype.created = function () {
    };
    WjFlexChartStochastic.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartStochastic.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartStochastic.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartStochastic.meta = {
        outputs: exports.wjFlexChartStochasticMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartStochastic.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartStochasticMeta.selector,
                    template: exports.wjFlexChartStochasticMeta.template,
                    inputs: exports.wjFlexChartStochasticMeta.inputs,
                    outputs: exports.wjFlexChartStochasticMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartStochastic; }) }
                    ].concat(exports.wjFlexChartStochasticMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartStochastic.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartStochastic;
}(wjcChartFinanceAnalytics.Stochastic));
exports.WjFlexChartStochastic = WjFlexChartStochastic;
exports.wjFlexChartBollingerBandsMeta = {
    selector: 'wj-flex-chart-bollinger-bands',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'period',
        'multiplier',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.BollingerBands control.
 *
 * The <b>wj-flex-chart-bollinger-bands</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-bollinger-bands</b> component to add <b>BollingerBands</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartBollingerBands</b> component is derived from the <b>BollingerBands</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartBollingerBands = /** @class */ (function (_super) {
    __extends(WjFlexChartBollingerBands, _super);
    function WjFlexChartBollingerBands(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartBollingerBands.prototype.created = function () {
    };
    WjFlexChartBollingerBands.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartBollingerBands.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartBollingerBands.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartBollingerBands.meta = {
        outputs: exports.wjFlexChartBollingerBandsMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartBollingerBands.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartBollingerBandsMeta.selector,
                    template: exports.wjFlexChartBollingerBandsMeta.template,
                    inputs: exports.wjFlexChartBollingerBandsMeta.inputs,
                    outputs: exports.wjFlexChartBollingerBandsMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBollingerBands; }) }
                    ].concat(exports.wjFlexChartBollingerBandsMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartBollingerBands.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartBollingerBands;
}(wjcChartFinanceAnalytics.BollingerBands));
exports.WjFlexChartBollingerBands = WjFlexChartBollingerBands;
exports.wjFlexChartEnvelopesMeta = {
    selector: 'wj-flex-chart-envelopes',
    template: "",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'period',
        'size',
        'type',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.Envelopes control.
 *
 * The <b>wj-flex-chart-envelopes</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-envelopes</b> component to add <b>Envelopes</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartEnvelopes</b> component is derived from the <b>Envelopes</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartEnvelopes = /** @class */ (function (_super) {
    __extends(WjFlexChartEnvelopes, _super);
    function WjFlexChartEnvelopes(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjFlexChartEnvelopes.prototype.created = function () {
    };
    WjFlexChartEnvelopes.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartEnvelopes.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartEnvelopes.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartEnvelopes.meta = {
        outputs: exports.wjFlexChartEnvelopesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartEnvelopes.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartEnvelopesMeta.selector,
                    template: exports.wjFlexChartEnvelopesMeta.template,
                    inputs: exports.wjFlexChartEnvelopesMeta.inputs,
                    outputs: exports.wjFlexChartEnvelopesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartEnvelopes; }) }
                    ].concat(exports.wjFlexChartEnvelopesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartEnvelopes.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartEnvelopes;
}(wjcChartFinanceAnalytics.Envelopes));
exports.WjFlexChartEnvelopes = WjFlexChartEnvelopes;
var moduleExports = [
    WjFlexChartFibonacci,
    WjFlexChartFibonacciArcs,
    WjFlexChartFibonacciFans,
    WjFlexChartFibonacciTimeZones,
    WjFlexChartAtr,
    WjFlexChartCci,
    WjFlexChartRsi,
    WjFlexChartWilliamsR,
    WjFlexChartMacd,
    WjFlexChartMacdHistogram,
    WjFlexChartStochastic,
    WjFlexChartBollingerBands,
    WjFlexChartEnvelopes
];
var WjChartFinanceAnalyticsModule = /** @class */ (function () {
    function WjChartFinanceAnalyticsModule() {
    }
    WjChartFinanceAnalyticsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartFinanceAnalyticsModule.ctorParameters = function () { return []; };
    return WjChartFinanceAnalyticsModule;
}());
exports.WjChartFinanceAnalyticsModule = WjChartFinanceAnalyticsModule;
//# sourceMappingURL=wijmo.angular2.chart.finance.analytics.js.map