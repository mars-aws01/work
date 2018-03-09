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
var wjcChartRadar = require("wijmo/wijmo.chart.radar");
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
* Contains Angular 2 components for the <b>wijmo.chart.radar</b> module.
*
* <b>wijmo.angular2.chart.radar</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjRadar from 'wijmo/wijmo.angular2.chart.radar';
* &nbsp;
* &#64;Component({
*     directives: [wjRadar.WjFlexRadar, wjRadar.WjFlexRadarSeries],
*     template: `
*       &lt;wj-flex-radar [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-radar-series [binding]="'y'"&gt;&lt;/wj-flex-radar-series&gt;
*       &lt;/wj-flex-radar&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.radar'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexRadarMeta = {
    selector: 'wj-flex-radar',
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
        'startAngle',
        'totalAngle',
        'reversed',
        'stacking',
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
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadar control.
 *
 * Use the <b>wj-flex-radar</b> component to add <b>FlexRadar</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexRadar</b> component is derived from the <b>FlexRadar</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-radar</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend.
*/
var WjFlexRadar = /** @class */ (function (_super) {
    __extends(WjFlexRadar, _super);
    function WjFlexRadar(elRef, injector, parentCmp) {
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
    WjFlexRadar.prototype.created = function () {
    };
    WjFlexRadar.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexRadar.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexRadar.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexRadar.prototype.addEventListener = function (target, type, fn, capture) {
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
    Object.defineProperty(WjFlexRadar.prototype, "tooltipContent", {
        get: function () {
            return this.tooltip.content;
        },
        set: function (value) {
            this.tooltip.content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WjFlexRadar.prototype, "labelContent", {
        get: function () {
            return this.dataLabel.content;
        },
        set: function (value) {
            this.dataLabel.content = value;
        },
        enumerable: true,
        configurable: true
    });
    WjFlexRadar.meta = {
        outputs: exports.wjFlexRadarMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']
        },
    };
    WjFlexRadar.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexRadarMeta.selector,
                    template: exports.wjFlexRadarMeta.template,
                    inputs: exports.wjFlexRadarMeta.inputs,
                    outputs: exports.wjFlexRadarMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadar; }) }
                    ].concat(exports.wjFlexRadarMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexRadar.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexRadar;
}(wjcChartRadar.FlexRadar));
exports.WjFlexRadar = WjFlexRadar;
exports.wjFlexRadarAxisMeta = {
    selector: 'wj-flex-radar-axis',
    template: "",
    inputs: [
        'wjProperty',
        'axisLine',
        'format',
        'labels',
        'majorGrid',
        'majorTickMarks',
        'majorUnit',
        'max',
        'min',
        'position',
        'reversed',
        'title',
        'labelAngle',
        'minorGrid',
        'minorTickMarks',
        'minorUnit',
        'origin',
        'logBase',
        'plotArea',
        'labelAlign',
        'name',
        'overlappingLabels',
        'labelPadding',
        'itemFormatter',
        'itemsSource',
        'binding',
    ],
    outputs: [
        'initialized',
        'rangeChangedNg: rangeChanged',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarAxis control.
 *
 * The <b>wj-flex-radar-axis</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
 *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries.
 *
 * Use the <b>wj-flex-radar-axis</b> component to add <b>FlexRadarAxis</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexRadarAxis</b> component is derived from the <b>FlexRadarAxis</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexRadarAxis = /** @class */ (function (_super) {
    __extends(WjFlexRadarAxis, _super);
    function WjFlexRadarAxis(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'axes'.
         */
        _this.wjProperty = 'axes';
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
    WjFlexRadarAxis.prototype.created = function () {
    };
    WjFlexRadarAxis.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexRadarAxis.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexRadarAxis.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexRadarAxis.meta = {
        outputs: exports.wjFlexRadarAxisMeta.outputs,
    };
    WjFlexRadarAxis.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexRadarAxisMeta.selector,
                    template: exports.wjFlexRadarAxisMeta.template,
                    inputs: exports.wjFlexRadarAxisMeta.inputs,
                    outputs: exports.wjFlexRadarAxisMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadarAxis; }) }
                    ].concat(exports.wjFlexRadarAxisMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexRadarAxis.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexRadarAxis;
}(wjcChartRadar.FlexRadarAxis));
exports.WjFlexRadarAxis = WjFlexRadarAxis;
exports.wjFlexRadarSeriesMeta = {
    selector: 'wj-flex-radar-series',
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
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarSeries control.
 *
 * The <b>wj-flex-radar-series</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar component.
 *
 * Use the <b>wj-flex-radar-series</b> component to add <b>FlexRadarSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexRadarSeries</b> component is derived from the <b>FlexRadarSeries</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-radar-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis child component.
*/
var WjFlexRadarSeries = /** @class */ (function (_super) {
    __extends(WjFlexRadarSeries, _super);
    function WjFlexRadarSeries(elRef, injector, parentCmp) {
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
    WjFlexRadarSeries.prototype.created = function () {
    };
    WjFlexRadarSeries.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexRadarSeries.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexRadarSeries.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexRadarSeries.meta = {
        outputs: exports.wjFlexRadarSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexRadarSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexRadarSeriesMeta.selector,
                    template: exports.wjFlexRadarSeriesMeta.template,
                    inputs: exports.wjFlexRadarSeriesMeta.inputs,
                    outputs: exports.wjFlexRadarSeriesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadarSeries; }) }
                    ].concat(exports.wjFlexRadarSeriesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexRadarSeries.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexRadarSeries;
}(wjcChartRadar.FlexRadarSeries));
exports.WjFlexRadarSeries = WjFlexRadarSeries;
var moduleExports = [
    WjFlexRadar,
    WjFlexRadarAxis,
    WjFlexRadarSeries
];
var WjChartRadarModule = /** @class */ (function () {
    function WjChartRadarModule() {
    }
    WjChartRadarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartRadarModule.ctorParameters = function () { return []; };
    return WjChartRadarModule;
}());
exports.WjChartRadarModule = WjChartRadarModule;
//# sourceMappingURL=wijmo.angular2.chart.radar.js.map