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
var wjcChartFinance = require("wijmo/wijmo.chart.finance");
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
* Contains Angular 2 components for the <b>wijmo.chart.finance</b> module.
*
* <b>wijmo.angular2.chart.finance</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinance from 'wijmo/wijmo.angular2.chart.finance';
* &nbsp;
* &#64;Component({
*     directives: [wjFinance.WjFinancialChart, wjFinance.WjFinancialChartSeries],
*     template: `
*       &lt;wj-financial-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-financial-chart-series [binding]="'y'"&gt;&lt;/wj-financial-chart-series&gt;
*       &lt;/wj-financial-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.finance'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFinancialChartMeta = {
    selector: 'wj-financial-chart',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'asyncBindings',
        'wjModelProperty',
        'isDisabled',
        'binding',
        'footer',
        'header',
        'selectionMode',
        'palette',
        'plotMargin',
        'footerStyle',
        'headerStyle',
        'tooltipContent',
        'itemsSource',
        'bindingX',
        'interpolateNulls',
        'legendToggle',
        'symbolSize',
        'options',
        'selection',
        'itemFormatter',
        'labelContent',
        'chartType',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'selectionChangedNg: selectionChanged',
        'selectionChangePC: selectionChange',
        'seriesVisibilityChangedNg: seriesVisibilityChanged',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.FinancialChart control.
 *
 * Use the <b>wj-financial-chart</b> component to add <b>FinancialChart</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFinancialChart</b> component is derived from the <b>FinancialChart</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-financial-chart</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
 * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacci
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciArcs
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciFans
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciTimeZones
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartAtr
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartCci
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartRsi
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartWilliamsR
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacd
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacdHistogram
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartStochastic
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartBollingerBands
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartEnvelopes
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
*/
var WjFinancialChart = /** @class */ (function (_super) {
    __extends(WjFinancialChart, _super);
    function WjFinancialChart(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
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
    WjFinancialChart.prototype.created = function () {
    };
    WjFinancialChart.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFinancialChart.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFinancialChart.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFinancialChart.prototype.addEventListener = function (target, type, fn, capture) {
        var _this = this;
        if (capture === void 0) { capture = false; }
        var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
        if (ngZone && behCl.outsideZoneEvents[type]) {
            ngZone.runOutsideAngular(function () {
                _super.prototype.addEventListener.call(_this, target, type, fn, capture);
            });
        }
        else {
            _super.prototype.addEventListener.call(this, target, type, fn, capture);
        }
    };
    Object.defineProperty(WjFinancialChart.prototype, "tooltipContent", {
        get: function () {
            return this.tooltip.content;
        },
        set: function (value) {
            this.tooltip.content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WjFinancialChart.prototype, "labelContent", {
        get: function () {
            return this.dataLabel.content;
        },
        set: function (value) {
            this.dataLabel.content = value;
        },
        enumerable: true,
        configurable: true
    });
    WjFinancialChart.meta = {
        outputs: exports.wjFinancialChartMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']
        },
    };
    WjFinancialChart.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFinancialChartMeta.selector,
                    template: exports.wjFinancialChartMeta.template,
                    inputs: exports.wjFinancialChartMeta.inputs,
                    outputs: exports.wjFinancialChartMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChart; }) }
                    ].concat(exports.wjFinancialChartMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFinancialChart.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFinancialChart;
}(wjcChartFinance.FinancialChart));
exports.WjFinancialChart = WjFinancialChart;
exports.wjFinancialChartSeriesMeta = {
    selector: 'wj-financial-chart-series',
    template: "<div><ng-content></ng-content></div>",
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
 * Angular 2 component for the @see:wijmo.chart.finance.FinancialSeries control.
 *
 * The <b>wj-financial-chart-series</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-financial-chart-series</b> component to add <b>FinancialSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFinancialChartSeries</b> component is derived from the <b>FinancialSeries</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-financial-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
*/
var WjFinancialChartSeries = /** @class */ (function (_super) {
    __extends(WjFinancialChartSeries, _super);
    function WjFinancialChartSeries(elRef, injector, parentCmp) {
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
    WjFinancialChartSeries.prototype.created = function () {
    };
    WjFinancialChartSeries.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFinancialChartSeries.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFinancialChartSeries.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFinancialChartSeries.meta = {
        outputs: exports.wjFinancialChartSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFinancialChartSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFinancialChartSeriesMeta.selector,
                    template: exports.wjFinancialChartSeriesMeta.template,
                    inputs: exports.wjFinancialChartSeriesMeta.inputs,
                    outputs: exports.wjFinancialChartSeriesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChartSeries; }) }
                    ].concat(exports.wjFinancialChartSeriesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFinancialChartSeries.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFinancialChartSeries;
}(wjcChartFinance.FinancialSeries));
exports.WjFinancialChartSeries = WjFinancialChartSeries;
var moduleExports = [
    WjFinancialChart,
    WjFinancialChartSeries
];
var WjChartFinanceModule = /** @class */ (function () {
    function WjChartFinanceModule() {
    }
    WjChartFinanceModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartFinanceModule.ctorParameters = function () { return []; };
    return WjChartFinanceModule;
}());
exports.WjChartFinanceModule = WjChartFinanceModule;
//# sourceMappingURL=wijmo.angular2.chart.finance.js.map