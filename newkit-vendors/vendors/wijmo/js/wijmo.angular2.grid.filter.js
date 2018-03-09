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
var wjcGridFilter = require("wijmo/wijmo.grid.filter");
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
* Contains Angular 2 components for the <b>wijmo.grid.filter</b> module.
*
* <b>wijmo.angular2.grid.filter</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFilter from 'wijmo/wijmo.angular2.grid.filter';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjFilter.WjFlexGridFilter],
*     template: `
*       &lt;wj-flex-grid [itemsSource]="data"&gt;
*           &lt;wj-flex-grid-filter [filterColumns]="['country', 'expenses']"&gt;&lt;/wj-flex-grid-filter&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.filter'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexGridFilterMeta = {
    selector: 'wj-flex-grid-filter',
    template: "",
    inputs: [
        'wjProperty',
        'showFilterIcons',
        'showSortButtons',
        'defaultFilterType',
        'filterColumns',
    ],
    outputs: [
        'initialized',
        'filterChangingNg: filterChanging',
        'filterChangedNg: filterChanged',
        'filterAppliedNg: filterApplied',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.grid.filter.FlexGridFilter control.
 *
 * The <b>wj-flex-grid-filter</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
 *
 * Use the <b>wj-flex-grid-filter</b> component to add <b>FlexGridFilter</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexGridFilter</b> component is derived from the <b>FlexGridFilter</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexGridFilter = /** @class */ (function (_super) {
    __extends(WjFlexGridFilter, _super);
    function WjFlexGridFilter(elRef, injector, parentCmp) {
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
    WjFlexGridFilter.prototype.created = function () {
    };
    WjFlexGridFilter.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexGridFilter.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexGridFilter.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexGridFilter.meta = {
        outputs: exports.wjFlexGridFilterMeta.outputs,
    };
    WjFlexGridFilter.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexGridFilterMeta.selector,
                    template: exports.wjFlexGridFilterMeta.template,
                    inputs: exports.wjFlexGridFilterMeta.inputs,
                    outputs: exports.wjFlexGridFilterMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridFilter; }) }
                    ].concat(exports.wjFlexGridFilterMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexGridFilter.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexGridFilter;
}(wjcGridFilter.FlexGridFilter));
exports.WjFlexGridFilter = WjFlexGridFilter;
var moduleExports = [
    WjFlexGridFilter
];
var WjGridFilterModule = /** @class */ (function () {
    function WjGridFilterModule() {
    }
    WjGridFilterModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjGridFilterModule.ctorParameters = function () { return []; };
    return WjGridFilterModule;
}());
exports.WjGridFilterModule = WjGridFilterModule;
//# sourceMappingURL=wijmo.angular2.grid.filter.js.map