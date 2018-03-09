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
var wjcChartAnalytics = require("wijmo/wijmo.chart.analytics");
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
///<wijmo-soft-import from="wijmo.chart.finance"/>
/**
* Contains Angular 2 components for the <b>wijmo.chart.analytics</b> module.
*
* <b>wijmo.angular2.chart.analytics</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjAnalitics from 'wijmo/wijmo.angular2.chart.analytics';</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.analytics'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexChartTrendLineMeta = {
    selector: 'wj-flex-chart-trend-line',
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
        'sampleCount',
        'order',
        'fitType',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.TrendLine control.
 *
 * The <b>wj-flex-chart-trend-line</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-trend-line</b> component to add <b>TrendLine</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartTrendLine</b> component is derived from the <b>TrendLine</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartTrendLine = /** @class */ (function (_super) {
    __extends(WjFlexChartTrendLine, _super);
    function WjFlexChartTrendLine(elRef, injector, parentCmp) {
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
    WjFlexChartTrendLine.prototype.created = function () {
    };
    WjFlexChartTrendLine.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartTrendLine.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartTrendLine.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartTrendLine.meta = {
        outputs: exports.wjFlexChartTrendLineMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartTrendLine.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartTrendLineMeta.selector,
                    template: exports.wjFlexChartTrendLineMeta.template,
                    inputs: exports.wjFlexChartTrendLineMeta.inputs,
                    outputs: exports.wjFlexChartTrendLineMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartTrendLine; }) }
                    ].concat(exports.wjFlexChartTrendLineMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartTrendLine.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartTrendLine;
}(wjcChartAnalytics.TrendLine));
exports.WjFlexChartTrendLine = WjFlexChartTrendLine;
exports.wjFlexChartMovingAverageMeta = {
    selector: 'wj-flex-chart-moving-average',
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
        'sampleCount',
        'period',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.MovingAverage control.
 *
 * The <b>wj-flex-chart-moving-average</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-moving-average</b> component to add <b>MovingAverage</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartMovingAverage</b> component is derived from the <b>MovingAverage</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartMovingAverage = /** @class */ (function (_super) {
    __extends(WjFlexChartMovingAverage, _super);
    function WjFlexChartMovingAverage(elRef, injector, parentCmp) {
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
    WjFlexChartMovingAverage.prototype.created = function () {
    };
    WjFlexChartMovingAverage.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartMovingAverage.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartMovingAverage.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartMovingAverage.meta = {
        outputs: exports.wjFlexChartMovingAverageMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartMovingAverage.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartMovingAverageMeta.selector,
                    template: exports.wjFlexChartMovingAverageMeta.template,
                    inputs: exports.wjFlexChartMovingAverageMeta.inputs,
                    outputs: exports.wjFlexChartMovingAverageMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMovingAverage; }) }
                    ].concat(exports.wjFlexChartMovingAverageMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartMovingAverage.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartMovingAverage;
}(wjcChartAnalytics.MovingAverage));
exports.WjFlexChartMovingAverage = WjFlexChartMovingAverage;
exports.wjFlexChartYFunctionSeriesMeta = {
    selector: 'wj-flex-chart-y-function-series',
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
        'sampleCount',
        'min',
        'max',
        'func',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.YFunctionSeries control.
 *
 * The <b>wj-flex-chart-y-function-series</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-y-function-series</b> component to add <b>YFunctionSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartYFunctionSeries</b> component is derived from the <b>YFunctionSeries</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartYFunctionSeries = /** @class */ (function (_super) {
    __extends(WjFlexChartYFunctionSeries, _super);
    function WjFlexChartYFunctionSeries(elRef, injector, parentCmp) {
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
    WjFlexChartYFunctionSeries.prototype.created = function () {
    };
    WjFlexChartYFunctionSeries.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartYFunctionSeries.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartYFunctionSeries.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartYFunctionSeries.meta = {
        outputs: exports.wjFlexChartYFunctionSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartYFunctionSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartYFunctionSeriesMeta.selector,
                    template: exports.wjFlexChartYFunctionSeriesMeta.template,
                    inputs: exports.wjFlexChartYFunctionSeriesMeta.inputs,
                    outputs: exports.wjFlexChartYFunctionSeriesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartYFunctionSeries; }) }
                    ].concat(exports.wjFlexChartYFunctionSeriesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartYFunctionSeries.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartYFunctionSeries;
}(wjcChartAnalytics.YFunctionSeries));
exports.WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries;
exports.wjFlexChartParametricFunctionSeriesMeta = {
    selector: 'wj-flex-chart-parametric-function-series',
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
        'sampleCount',
        'min',
        'max',
        'func',
        'xFunc',
        'yFunc',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.ParametricFunctionSeries control.
 *
 * The <b>wj-flex-chart-parametric-function-series</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-parametric-function-series</b> component to add <b>ParametricFunctionSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartParametricFunctionSeries</b> component is derived from the <b>ParametricFunctionSeries</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartParametricFunctionSeries = /** @class */ (function (_super) {
    __extends(WjFlexChartParametricFunctionSeries, _super);
    function WjFlexChartParametricFunctionSeries(elRef, injector, parentCmp) {
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
    WjFlexChartParametricFunctionSeries.prototype.created = function () {
    };
    WjFlexChartParametricFunctionSeries.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartParametricFunctionSeries.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartParametricFunctionSeries.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartParametricFunctionSeries.meta = {
        outputs: exports.wjFlexChartParametricFunctionSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartParametricFunctionSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartParametricFunctionSeriesMeta.selector,
                    template: exports.wjFlexChartParametricFunctionSeriesMeta.template,
                    inputs: exports.wjFlexChartParametricFunctionSeriesMeta.inputs,
                    outputs: exports.wjFlexChartParametricFunctionSeriesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartParametricFunctionSeries; }) }
                    ].concat(exports.wjFlexChartParametricFunctionSeriesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartParametricFunctionSeries.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartParametricFunctionSeries;
}(wjcChartAnalytics.ParametricFunctionSeries));
exports.WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries;
exports.wjFlexChartWaterfallMeta = {
    selector: 'wj-flex-chart-waterfall',
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
        'relativeData',
        'start',
        'startLabel',
        'showTotal',
        'totalLabel',
        'showIntermediateTotal',
        'intermediateTotalPositions',
        'intermediateTotalLabels',
        'connectorLines',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.Waterfall control.
 *
 * The <b>wj-flex-chart-waterfall</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-waterfall</b> component to add <b>Waterfall</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartWaterfall</b> component is derived from the <b>Waterfall</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartWaterfall = /** @class */ (function (_super) {
    __extends(WjFlexChartWaterfall, _super);
    function WjFlexChartWaterfall(elRef, injector, parentCmp) {
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
    WjFlexChartWaterfall.prototype.created = function () {
    };
    WjFlexChartWaterfall.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartWaterfall.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartWaterfall.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartWaterfall.meta = {
        outputs: exports.wjFlexChartWaterfallMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartWaterfall.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartWaterfallMeta.selector,
                    template: exports.wjFlexChartWaterfallMeta.template,
                    inputs: exports.wjFlexChartWaterfallMeta.inputs,
                    outputs: exports.wjFlexChartWaterfallMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWaterfall; }) }
                    ].concat(exports.wjFlexChartWaterfallMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartWaterfall.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartWaterfall;
}(wjcChartAnalytics.Waterfall));
exports.WjFlexChartWaterfall = WjFlexChartWaterfall;
exports.wjFlexChartBoxWhiskerMeta = {
    selector: 'wj-flex-chart-box-whisker',
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
        'quartileCalculation',
        'groupWidth',
        'gapWidth',
        'showMeanLine',
        'meanLineStyle',
        'showMeanMarker',
        'meanMarkerStyle',
        'showInnerPoints',
        'showOutliers',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.BoxWhisker control.
 *
 * The <b>wj-flex-chart-box-whisker</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-box-whisker</b> component to add <b>BoxWhisker</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartBoxWhisker</b> component is derived from the <b>BoxWhisker</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartBoxWhisker = /** @class */ (function (_super) {
    __extends(WjFlexChartBoxWhisker, _super);
    function WjFlexChartBoxWhisker(elRef, injector, parentCmp) {
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
    WjFlexChartBoxWhisker.prototype.created = function () {
    };
    WjFlexChartBoxWhisker.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartBoxWhisker.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartBoxWhisker.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartBoxWhisker.meta = {
        outputs: exports.wjFlexChartBoxWhiskerMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartBoxWhisker.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartBoxWhiskerMeta.selector,
                    template: exports.wjFlexChartBoxWhiskerMeta.template,
                    inputs: exports.wjFlexChartBoxWhiskerMeta.inputs,
                    outputs: exports.wjFlexChartBoxWhiskerMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBoxWhisker; }) }
                    ].concat(exports.wjFlexChartBoxWhiskerMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartBoxWhisker.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartBoxWhisker;
}(wjcChartAnalytics.BoxWhisker));
exports.WjFlexChartBoxWhisker = WjFlexChartBoxWhisker;
exports.wjFlexChartErrorBarMeta = {
    selector: 'wj-flex-chart-error-bar',
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
        'chartType',
        'errorBarStyle',
        'value',
        'errorAmount',
        'endStyle',
        'direction',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.ErrorBar control.
 *
 * The <b>wj-flex-chart-error-bar</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-error-bar</b> component to add <b>ErrorBar</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartErrorBar</b> component is derived from the <b>ErrorBar</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartErrorBar = /** @class */ (function (_super) {
    __extends(WjFlexChartErrorBar, _super);
    function WjFlexChartErrorBar(elRef, injector, parentCmp) {
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
    WjFlexChartErrorBar.prototype.created = function () {
    };
    WjFlexChartErrorBar.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartErrorBar.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartErrorBar.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartErrorBar.meta = {
        outputs: exports.wjFlexChartErrorBarMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartErrorBar.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartErrorBarMeta.selector,
                    template: exports.wjFlexChartErrorBarMeta.template,
                    inputs: exports.wjFlexChartErrorBarMeta.inputs,
                    outputs: exports.wjFlexChartErrorBarMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartErrorBar; }) }
                    ].concat(exports.wjFlexChartErrorBarMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartErrorBar.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartErrorBar;
}(wjcChartAnalytics.ErrorBar));
exports.WjFlexChartErrorBar = WjFlexChartErrorBar;
var moduleExports = [
    WjFlexChartTrendLine,
    WjFlexChartMovingAverage,
    WjFlexChartYFunctionSeries,
    WjFlexChartParametricFunctionSeries,
    WjFlexChartWaterfall,
    WjFlexChartBoxWhisker,
    WjFlexChartErrorBar
];
var WjChartAnalyticsModule = /** @class */ (function () {
    function WjChartAnalyticsModule() {
    }
    WjChartAnalyticsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartAnalyticsModule.ctorParameters = function () { return []; };
    return WjChartAnalyticsModule;
}());
exports.WjChartAnalyticsModule = WjChartAnalyticsModule;
//# sourceMappingURL=wijmo.angular2.chart.analytics.js.map