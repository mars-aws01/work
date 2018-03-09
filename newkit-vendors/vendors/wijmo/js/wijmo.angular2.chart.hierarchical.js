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
var wjcChartHierarchical = require("wijmo/wijmo.chart.hierarchical");
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
* Contains Angular 2 components for the <b>wijmo.chart.hierarchical</b> module.
*
* <b>wijmo.angular2.chart.hierarchical</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjHierarchical from 'wijmo/wijmo.angular2.chart.hierarchical';
* &nbsp;
* &#64;Component({
*     directives: [wjHierarchical.WjSunburst],
*     template: `
*       &lt;wj-sunburst [itemsSource]="data" [binding]="'y'" [bindingX]="'x'"&gt;
*       &lt;/wj-sunburst&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.hierarchical'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjSunburstMeta = {
    selector: 'wj-sunburst',
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
        'childItemsPath',
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
 * Angular 2 component for the @see:wijmo.chart.hierarchical.Sunburst control.
 *
 * Use the <b>wj-sunburst</b> component to add <b>Sunburst</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjSunburst</b> component is derived from the <b>Sunburst</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-sunburst</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend child component.
*/
var WjSunburst = /** @class */ (function (_super) {
    __extends(WjSunburst, _super);
    function WjSunburst(elRef, injector, parentCmp) {
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
    WjSunburst.prototype.created = function () {
    };
    WjSunburst.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjSunburst.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjSunburst.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjSunburst.prototype.addEventListener = function (target, type, fn, capture) {
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
    Object.defineProperty(WjSunburst.prototype, "tooltipContent", {
        get: function () {
            return this.tooltip.content;
        },
        set: function (value) {
            this.tooltip.content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WjSunburst.prototype, "labelContent", {
        get: function () {
            return this.dataLabel.content;
        },
        set: function (value) {
            this.dataLabel.content = value;
        },
        enumerable: true,
        configurable: true
    });
    WjSunburst.meta = {
        outputs: exports.wjSunburstMeta.outputs,
    };
    WjSunburst.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjSunburstMeta.selector,
                    template: exports.wjSunburstMeta.template,
                    inputs: exports.wjSunburstMeta.inputs,
                    outputs: exports.wjSunburstMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjSunburst; }) }
                    ].concat(exports.wjSunburstMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjSunburst.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjSunburst;
}(wjcChartHierarchical.Sunburst));
exports.WjSunburst = WjSunburst;
exports.wjTreeMapMeta = {
    selector: 'wj-tree-map',
    template: "",
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
        'maxDepth',
        'type',
        'labelContent',
        'childItemsPath',
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
 * Angular 2 component for the @see:wijmo.chart.hierarchical.TreeMap control.
 *
 * Use the <b>wj-tree-map</b> component to add <b>TreeMap</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjTreeMap</b> component is derived from the <b>TreeMap</b> control and
 * inherits all its properties, events and methods.
*/
var WjTreeMap = /** @class */ (function (_super) {
    __extends(WjTreeMap, _super);
    function WjTreeMap(elRef, injector, parentCmp) {
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
    WjTreeMap.prototype.created = function () {
    };
    WjTreeMap.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjTreeMap.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjTreeMap.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjTreeMap.prototype.addEventListener = function (target, type, fn, capture) {
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
    Object.defineProperty(WjTreeMap.prototype, "tooltipContent", {
        get: function () {
            return this.tooltip.content;
        },
        set: function (value) {
            this.tooltip.content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WjTreeMap.prototype, "labelContent", {
        get: function () {
            return this.dataLabel.content;
        },
        set: function (value) {
            this.dataLabel.content = value;
        },
        enumerable: true,
        configurable: true
    });
    WjTreeMap.meta = {
        outputs: exports.wjTreeMapMeta.outputs,
    };
    WjTreeMap.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjTreeMapMeta.selector,
                    template: exports.wjTreeMapMeta.template,
                    inputs: exports.wjTreeMapMeta.inputs,
                    outputs: exports.wjTreeMapMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTreeMap; }) }
                    ].concat(exports.wjTreeMapMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjTreeMap.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjTreeMap;
}(wjcChartHierarchical.TreeMap));
exports.WjTreeMap = WjTreeMap;
var moduleExports = [
    WjSunburst,
    WjTreeMap
];
var WjChartHierarchicalModule = /** @class */ (function () {
    function WjChartHierarchicalModule() {
    }
    WjChartHierarchicalModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartHierarchicalModule.ctorParameters = function () { return []; };
    return WjChartHierarchicalModule;
}());
exports.WjChartHierarchicalModule = WjChartHierarchicalModule;
//# sourceMappingURL=wijmo.angular2.chart.hierarchical.js.map