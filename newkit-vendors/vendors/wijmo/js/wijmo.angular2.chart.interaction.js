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
var wjcChartInteraction = require("wijmo/wijmo.chart.interaction");
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
* Contains Angular 2 components for the <b>wijmo.chart.interaction</b> module.
*
* <b>wijmo.angular2.chart.interaction</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjInteraction from 'wijmo/wijmo.angular2.chart.interaction';
* import * as wjChart from 'wijmo/wijmo.angular2.chart';
* &nbsp;
* &#64;Component({
*     directives: [wjChart.WjFlexChart, wjInteraction.WjFlexChartRangeSelector, wjChart.WjFlexChartSeries],
*     template: `
*       &lt;wj-flex-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-chart-range-selector&gt;&lt;/wj-flex-chart-range-selector&gt;
*           &lt;wj-flex-chart-series [binding]="'y'"&gt;&lt;/wj-flex-chart-series&gt;
*       &lt;/wj-flex-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.interaction'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexChartRangeSelectorMeta = {
    selector: 'wj-flex-chart-range-selector',
    template: "",
    inputs: [
        'wjProperty',
        'isVisible',
        'min',
        'max',
        'orientation',
        'seamless',
        'minScale',
        'maxScale',
    ],
    outputs: [
        'initialized',
        'rangeChangedNg: rangeChanged',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.interaction.RangeSelector control.
 *
 * The <b>wj-flex-chart-range-selector</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-range-selector</b> component to add <b>RangeSelector</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartRangeSelector</b> component is derived from the <b>RangeSelector</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartRangeSelector = /** @class */ (function (_super) {
    __extends(WjFlexChartRangeSelector, _super);
    function WjFlexChartRangeSelector(elRef, injector, parentCmp) {
        var _this = _super.call(this, parentCmp) || this;
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
    WjFlexChartRangeSelector.prototype.created = function () {
    };
    WjFlexChartRangeSelector.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartRangeSelector.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartRangeSelector.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartRangeSelector.meta = {
        outputs: exports.wjFlexChartRangeSelectorMeta.outputs,
    };
    WjFlexChartRangeSelector.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartRangeSelectorMeta.selector,
                    template: exports.wjFlexChartRangeSelectorMeta.template,
                    inputs: exports.wjFlexChartRangeSelectorMeta.inputs,
                    outputs: exports.wjFlexChartRangeSelectorMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRangeSelector; }) }
                    ].concat(exports.wjFlexChartRangeSelectorMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartRangeSelector.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartRangeSelector;
}(wjcChartInteraction.RangeSelector));
exports.WjFlexChartRangeSelector = WjFlexChartRangeSelector;
exports.wjFlexChartGesturesMeta = {
    selector: 'wj-flex-chart-gestures',
    template: "",
    inputs: [
        'wjProperty',
        'mouseAction',
        'interactiveAxes',
        'enable',
        'scaleX',
        'scaleY',
        'posX',
        'posY',
    ],
    outputs: [
        'initialized',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.interaction.ChartGestures control.
 *
 * The <b>wj-flex-chart-gestures</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-gestures</b> component to add <b>ChartGestures</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartGestures</b> component is derived from the <b>ChartGestures</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartGestures = /** @class */ (function (_super) {
    __extends(WjFlexChartGestures, _super);
    function WjFlexChartGestures(elRef, injector, parentCmp) {
        var _this = _super.call(this, parentCmp) || this;
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
    WjFlexChartGestures.prototype.created = function () {
    };
    WjFlexChartGestures.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartGestures.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartGestures.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartGestures.meta = {
        outputs: exports.wjFlexChartGesturesMeta.outputs,
    };
    WjFlexChartGestures.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartGesturesMeta.selector,
                    template: exports.wjFlexChartGesturesMeta.template,
                    inputs: exports.wjFlexChartGesturesMeta.inputs,
                    outputs: exports.wjFlexChartGesturesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartGestures; }) }
                    ].concat(exports.wjFlexChartGesturesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartGestures.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartGestures;
}(wjcChartInteraction.ChartGestures));
exports.WjFlexChartGestures = WjFlexChartGestures;
var moduleExports = [
    WjFlexChartRangeSelector,
    WjFlexChartGestures
];
var WjChartInteractionModule = /** @class */ (function () {
    function WjChartInteractionModule() {
    }
    WjChartInteractionModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartInteractionModule.ctorParameters = function () { return []; };
    return WjChartInteractionModule;
}());
exports.WjChartInteractionModule = WjChartInteractionModule;
//# sourceMappingURL=wijmo.angular2.chart.interaction.js.map