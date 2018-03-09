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
var wjcChartAnimation = require("wijmo/wijmo.chart.animation");
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
///<wijmo-soft-import from="wijmo.chart.radar"/>
/**
* Contains Angular 2 components for the <b>wijmo.chart.animation</b> module.
*
* <b>wijmo.angular2.chart.animation</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjAnimation from 'wijmo/wijmo.angular2.chart.animation';
* import * as wjChart from 'wijmo/wijmo.angular2.chart';
* &nbsp;
* &#64;Component({
*     directives: [wjChart.WjFlexChart, wjAnimation.WjFlexChartAnimation, wjChart.WjFlexChartSeries],
*     template: `
*       &lt;wj-flex-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-chart-animation [animationMode]="'Point'"&gt;&lt;/wj-flex-chart-animation&gt;
*           &lt;wj-flex-chart-series [binding]="'y'"&gt;&lt;/wj-flex-chart-series&gt;
*       &lt;/wj-flex-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.animation'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexChartAnimationMeta = {
    selector: 'wj-flex-chart-animation',
    template: "",
    inputs: [
        'wjProperty',
        'animationMode',
        'easing',
        'duration',
        'axisAnimation',
    ],
    outputs: [
        'initialized',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.animation.ChartAnimation control.
 *
 * The <b>wj-flex-chart-animation</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
 *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar.
 *
 * Use the <b>wj-flex-chart-animation</b> component to add <b>ChartAnimation</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartAnimation</b> component is derived from the <b>ChartAnimation</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartAnimation = /** @class */ (function (_super) {
    __extends(WjFlexChartAnimation, _super);
    function WjFlexChartAnimation(elRef, injector, parentCmp) {
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
    WjFlexChartAnimation.prototype.created = function () {
    };
    WjFlexChartAnimation.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartAnimation.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartAnimation.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartAnimation.meta = {
        outputs: exports.wjFlexChartAnimationMeta.outputs,
    };
    WjFlexChartAnimation.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartAnimationMeta.selector,
                    template: exports.wjFlexChartAnimationMeta.template,
                    inputs: exports.wjFlexChartAnimationMeta.inputs,
                    outputs: exports.wjFlexChartAnimationMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnimation; }) }
                    ].concat(exports.wjFlexChartAnimationMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartAnimation.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartAnimation;
}(wjcChartAnimation.ChartAnimation));
exports.WjFlexChartAnimation = WjFlexChartAnimation;
var moduleExports = [
    WjFlexChartAnimation
];
var WjChartAnimationModule = /** @class */ (function () {
    function WjChartAnimationModule() {
    }
    WjChartAnimationModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartAnimationModule.ctorParameters = function () { return []; };
    return WjChartAnimationModule;
}());
exports.WjChartAnimationModule = WjChartAnimationModule;
//# sourceMappingURL=wijmo.angular2.chart.animation.js.map