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
var wjcChart = require("wijmo/wijmo.chart");
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
///<wijmo-soft-import from="wijmo.chart.analytics"/>
///<wijmo-soft-import from="wijmo.chart.animation"/>
///<wijmo-soft-import from="wijmo.chart.annotation"/>
///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
///<wijmo-soft-import from="wijmo.chart.interaction"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>
/**
* Contains Angular 2 components for the <b>wijmo.chart</b> module.
*
* <b>wijmo.angular2.chart</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjChart from 'wijmo/wijmo.angular2.chart';
* &nbsp;
* &#64;Component({
*     directives: [wjChart.WjFlexChart, wjChart.WjFlexChartSeries],
*     template: `
*       &lt;wj-flex-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-chart-series [binding]="'y'"&gt;&lt;/wj-flex-chart-series&gt;
*       &lt;/wj-flex-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexChartMeta = {
    selector: 'wj-flex-chart',
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
        'rotated',
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
 * Angular 2 component for the @see:wijmo.chart.FlexChart control.
 *
 * Use the <b>wj-flex-chart</b> component to add <b>FlexChart</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChart</b> component is derived from the <b>FlexChart</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-chart</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartErrorBar
 * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartDataLabel
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
*/
var WjFlexChart = /** @class */ (function (_super) {
    __extends(WjFlexChart, _super);
    function WjFlexChart(elRef, injector, parentCmp) {
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
    WjFlexChart.prototype.created = function () {
    };
    WjFlexChart.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChart.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChart.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChart.prototype.addEventListener = function (target, type, fn, capture) {
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
    Object.defineProperty(WjFlexChart.prototype, "tooltipContent", {
        get: function () {
            return this.tooltip.content;
        },
        set: function (value) {
            this.tooltip.content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WjFlexChart.prototype, "labelContent", {
        get: function () {
            return this.dataLabel.content;
        },
        set: function (value) {
            this.dataLabel.content = value;
        },
        enumerable: true,
        configurable: true
    });
    WjFlexChart.meta = {
        outputs: exports.wjFlexChartMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']
        },
    };
    WjFlexChart.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartMeta.selector,
                    template: exports.wjFlexChartMeta.template,
                    inputs: exports.wjFlexChartMeta.inputs,
                    outputs: exports.wjFlexChartMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChart; }) }
                    ].concat(exports.wjFlexChartMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChart.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChart;
}(wjcChart.FlexChart));
exports.WjFlexChart = WjFlexChart;
exports.wjFlexPieMeta = {
    selector: 'wj-flex-pie',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
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
        'bindingName',
        'innerRadius',
        'isAnimated',
        'offset',
        'reversed',
        'startAngle',
        'selectedItemPosition',
        'selectedItemOffset',
        'itemFormatter',
        'labelContent',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'selectionChangedNg: selectionChanged',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.FlexPie control.
 *
 * Use the <b>wj-flex-pie</b> component to add <b>FlexPie</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexPie</b> component is derived from the <b>FlexPie</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-pie</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexPieDataLabel.
*/
var WjFlexPie = /** @class */ (function (_super) {
    __extends(WjFlexPie, _super);
    function WjFlexPie(elRef, injector, parentCmp) {
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
    WjFlexPie.prototype.created = function () {
    };
    WjFlexPie.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexPie.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexPie.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexPie.prototype.addEventListener = function (target, type, fn, capture) {
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
    Object.defineProperty(WjFlexPie.prototype, "tooltipContent", {
        get: function () {
            return this.tooltip.content;
        },
        set: function (value) {
            this.tooltip.content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WjFlexPie.prototype, "labelContent", {
        get: function () {
            return this.dataLabel.content;
        },
        set: function (value) {
            this.dataLabel.content = value;
        },
        enumerable: true,
        configurable: true
    });
    WjFlexPie.meta = {
        outputs: exports.wjFlexPieMeta.outputs,
    };
    WjFlexPie.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexPieMeta.selector,
                    template: exports.wjFlexPieMeta.template,
                    inputs: exports.wjFlexPieMeta.inputs,
                    outputs: exports.wjFlexPieMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPie; }) }
                    ].concat(exports.wjFlexPieMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexPie.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexPie;
}(wjcChart.FlexPie));
exports.WjFlexPie = WjFlexPie;
exports.wjFlexChartAxisMeta = {
    selector: 'wj-flex-chart-axis',
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
 * Angular 2 component for the @see:wijmo.chart.Axis control.
 *
 * The <b>wj-flex-chart-axis</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries.
 *
 * Use the <b>wj-flex-chart-axis</b> component to add <b>Axis</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartAxis</b> component is derived from the <b>Axis</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartAxis = /** @class */ (function (_super) {
    __extends(WjFlexChartAxis, _super);
    function WjFlexChartAxis(elRef, injector, parentCmp) {
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
    WjFlexChartAxis.prototype.created = function () {
    };
    WjFlexChartAxis.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartAxis.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartAxis.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartAxis.meta = {
        outputs: exports.wjFlexChartAxisMeta.outputs,
    };
    WjFlexChartAxis.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartAxisMeta.selector,
                    template: exports.wjFlexChartAxisMeta.template,
                    inputs: exports.wjFlexChartAxisMeta.inputs,
                    outputs: exports.wjFlexChartAxisMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAxis; }) }
                    ].concat(exports.wjFlexChartAxisMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartAxis.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartAxis;
}(wjcChart.Axis));
exports.WjFlexChartAxis = WjFlexChartAxis;
exports.wjFlexChartLegendMeta = {
    selector: 'wj-flex-chart-legend',
    template: "",
    inputs: [
        'wjProperty',
        'position',
        'title',
        'titleAlign',
    ],
    outputs: [
        'initialized',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.Legend control.
 *
 * The <b>wj-flex-chart-legend</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
 *  or @see:wijmo/wijmo.angular2.chart.hierarchical.WjSunburst.
 *
 * Use the <b>wj-flex-chart-legend</b> component to add <b>Legend</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartLegend</b> component is derived from the <b>Legend</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartLegend = /** @class */ (function (_super) {
    __extends(WjFlexChartLegend, _super);
    function WjFlexChartLegend(elRef, injector, parentCmp) {
        var _this = _super.call(this, parentCmp) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'legend'.
         */
        _this.wjProperty = 'legend';
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
    WjFlexChartLegend.prototype.created = function () {
    };
    WjFlexChartLegend.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartLegend.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartLegend.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartLegend.meta = {
        outputs: exports.wjFlexChartLegendMeta.outputs,
    };
    WjFlexChartLegend.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartLegendMeta.selector,
                    template: exports.wjFlexChartLegendMeta.template,
                    inputs: exports.wjFlexChartLegendMeta.inputs,
                    outputs: exports.wjFlexChartLegendMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLegend; }) }
                    ].concat(exports.wjFlexChartLegendMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartLegend.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartLegend;
}(wjcChart.Legend));
exports.WjFlexChartLegend = WjFlexChartLegend;
exports.wjFlexChartDataLabelMeta = {
    selector: 'wj-flex-chart-data-label',
    template: "",
    inputs: [
        'wjProperty',
        'content',
        'border',
        'offset',
        'connectingLine',
        'position',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.DataLabel control.
 *
 * The <b>wj-flex-chart-data-label</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-data-label</b> component to add <b>DataLabel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartDataLabel</b> component is derived from the <b>DataLabel</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartDataLabel = /** @class */ (function (_super) {
    __extends(WjFlexChartDataLabel, _super);
    function WjFlexChartDataLabel(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'dataLabel'.
         */
        _this.wjProperty = 'dataLabel';
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
    WjFlexChartDataLabel.prototype.created = function () {
    };
    WjFlexChartDataLabel.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartDataLabel.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartDataLabel.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartDataLabel.meta = {
        outputs: exports.wjFlexChartDataLabelMeta.outputs,
    };
    WjFlexChartDataLabel.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartDataLabelMeta.selector,
                    template: exports.wjFlexChartDataLabelMeta.template,
                    inputs: exports.wjFlexChartDataLabelMeta.inputs,
                    outputs: exports.wjFlexChartDataLabelMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataLabel; }) }
                    ].concat(exports.wjFlexChartDataLabelMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartDataLabel.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartDataLabel;
}(wjcChart.DataLabel));
exports.WjFlexChartDataLabel = WjFlexChartDataLabel;
exports.wjFlexPieDataLabelMeta = {
    selector: 'wj-flex-pie-data-label',
    template: "",
    inputs: [
        'wjProperty',
        'content',
        'border',
        'offset',
        'connectingLine',
        'position',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.PieDataLabel control.
 *
 * The <b>wj-flex-pie-data-label</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexPie component.
 *
 * Use the <b>wj-flex-pie-data-label</b> component to add <b>PieDataLabel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexPieDataLabel</b> component is derived from the <b>PieDataLabel</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexPieDataLabel = /** @class */ (function (_super) {
    __extends(WjFlexPieDataLabel, _super);
    function WjFlexPieDataLabel(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'dataLabel'.
         */
        _this.wjProperty = 'dataLabel';
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
    WjFlexPieDataLabel.prototype.created = function () {
    };
    WjFlexPieDataLabel.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexPieDataLabel.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexPieDataLabel.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexPieDataLabel.meta = {
        outputs: exports.wjFlexPieDataLabelMeta.outputs,
    };
    WjFlexPieDataLabel.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexPieDataLabelMeta.selector,
                    template: exports.wjFlexPieDataLabelMeta.template,
                    inputs: exports.wjFlexPieDataLabelMeta.inputs,
                    outputs: exports.wjFlexPieDataLabelMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPieDataLabel; }) }
                    ].concat(exports.wjFlexPieDataLabelMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexPieDataLabel.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexPieDataLabel;
}(wjcChart.PieDataLabel));
exports.WjFlexPieDataLabel = WjFlexPieDataLabel;
exports.wjFlexChartSeriesMeta = {
    selector: 'wj-flex-chart-series',
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
 * Angular 2 component for the @see:wijmo.chart.Series control.
 *
 * The <b>wj-flex-chart-series</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-series</b> component to add <b>Series</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartSeries</b> component is derived from the <b>Series</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
*/
var WjFlexChartSeries = /** @class */ (function (_super) {
    __extends(WjFlexChartSeries, _super);
    function WjFlexChartSeries(elRef, injector, parentCmp) {
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
    WjFlexChartSeries.prototype.created = function () {
    };
    WjFlexChartSeries.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartSeries.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartSeries.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartSeries.meta = {
        outputs: exports.wjFlexChartSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartSeriesMeta.selector,
                    template: exports.wjFlexChartSeriesMeta.template,
                    inputs: exports.wjFlexChartSeriesMeta.inputs,
                    outputs: exports.wjFlexChartSeriesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartSeries; }) }
                    ].concat(exports.wjFlexChartSeriesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartSeries.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartSeries;
}(wjcChart.Series));
exports.WjFlexChartSeries = WjFlexChartSeries;
exports.wjFlexChartLineMarkerMeta = {
    selector: 'wj-flex-line-marker',
    template: "",
    inputs: [
        'wjProperty',
        'isVisible',
        'seriesIndex',
        'horizontalPosition',
        'content',
        'verticalPosition',
        'alignment',
        'lines',
        'interaction',
        'dragLines',
        'dragThreshold',
        'dragContent',
    ],
    outputs: [
        'initialized',
        'positionChangedNg: positionChanged',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.LineMarker control.
 *
 * The <b>wj-flex-line-marker</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-line-marker</b> component to add <b>LineMarker</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartLineMarker</b> component is derived from the <b>LineMarker</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartLineMarker = /** @class */ (function (_super) {
    __extends(WjFlexChartLineMarker, _super);
    function WjFlexChartLineMarker(elRef, injector, parentCmp) {
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
    WjFlexChartLineMarker.prototype.created = function () {
    };
    WjFlexChartLineMarker.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartLineMarker.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartLineMarker.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartLineMarker.meta = {
        outputs: exports.wjFlexChartLineMarkerMeta.outputs,
    };
    WjFlexChartLineMarker.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartLineMarkerMeta.selector,
                    template: exports.wjFlexChartLineMarkerMeta.template,
                    inputs: exports.wjFlexChartLineMarkerMeta.inputs,
                    outputs: exports.wjFlexChartLineMarkerMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLineMarker; }) }
                    ].concat(exports.wjFlexChartLineMarkerMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartLineMarker.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartLineMarker;
}(wjcChart.LineMarker));
exports.WjFlexChartLineMarker = WjFlexChartLineMarker;
exports.wjFlexChartDataPointMeta = {
    selector: 'wj-flex-chart-data-point',
    template: "",
    inputs: [
        'wjProperty',
        'x',
        'y',
    ],
    outputs: [
        'initialized',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.DataPoint control.
 *
 * The <b>wj-flex-chart-data-point</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationText
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationEllipse
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationRectangle
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLine
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationPolygon
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationCircle
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationSquare
 *  or @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationImage.
 *
 * Use the <b>wj-flex-chart-data-point</b> component to add <b>DataPoint</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartDataPoint</b> component is derived from the <b>DataPoint</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartDataPoint = /** @class */ (function (_super) {
    __extends(WjFlexChartDataPoint, _super);
    function WjFlexChartDataPoint(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is ''.
         */
        _this.wjProperty = '';
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
    WjFlexChartDataPoint.prototype.created = function () {
    };
    WjFlexChartDataPoint.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartDataPoint.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartDataPoint.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartDataPoint.meta = {
        outputs: exports.wjFlexChartDataPointMeta.outputs,
    };
    WjFlexChartDataPoint.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartDataPointMeta.selector,
                    template: exports.wjFlexChartDataPointMeta.template,
                    inputs: exports.wjFlexChartDataPointMeta.inputs,
                    outputs: exports.wjFlexChartDataPointMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataPoint; }) }
                    ].concat(exports.wjFlexChartDataPointMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartDataPoint.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartDataPoint;
}(wjcChart.DataPoint));
exports.WjFlexChartDataPoint = WjFlexChartDataPoint;
exports.wjFlexChartPlotAreaMeta = {
    selector: 'wj-flex-chart-plot-area',
    template: "",
    inputs: [
        'wjProperty',
        'column',
        'height',
        'name',
        'row',
        'style',
        'width',
    ],
    outputs: [
        'initialized',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.PlotArea control.
 *
 * The <b>wj-flex-chart-plot-area</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-plot-area</b> component to add <b>PlotArea</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexChartPlotArea</b> component is derived from the <b>PlotArea</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartPlotArea = /** @class */ (function (_super) {
    __extends(WjFlexChartPlotArea, _super);
    function WjFlexChartPlotArea(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'plotAreas'.
         */
        _this.wjProperty = 'plotAreas';
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
    WjFlexChartPlotArea.prototype.created = function () {
    };
    WjFlexChartPlotArea.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartPlotArea.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartPlotArea.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexChartPlotArea.meta = {
        outputs: exports.wjFlexChartPlotAreaMeta.outputs,
    };
    WjFlexChartPlotArea.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexChartPlotAreaMeta.selector,
                    template: exports.wjFlexChartPlotAreaMeta.template,
                    inputs: exports.wjFlexChartPlotAreaMeta.inputs,
                    outputs: exports.wjFlexChartPlotAreaMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartPlotArea; }) }
                    ].concat(exports.wjFlexChartPlotAreaMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexChartPlotArea.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexChartPlotArea;
}(wjcChart.PlotArea));
exports.WjFlexChartPlotArea = WjFlexChartPlotArea;
var moduleExports = [
    WjFlexChart,
    WjFlexPie,
    WjFlexChartAxis,
    WjFlexChartLegend,
    WjFlexChartDataLabel,
    WjFlexPieDataLabel,
    WjFlexChartSeries,
    WjFlexChartLineMarker,
    WjFlexChartDataPoint,
    WjFlexChartPlotArea
];
var WjChartModule = /** @class */ (function () {
    function WjChartModule() {
    }
    WjChartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartModule.ctorParameters = function () { return []; };
    return WjChartModule;
}());
exports.WjChartModule = WjChartModule;
//# sourceMappingURL=wijmo.angular2.chart.js.map