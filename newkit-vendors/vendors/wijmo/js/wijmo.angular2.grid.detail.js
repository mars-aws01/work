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
var wjcGridDetail = require("wijmo/wijmo.grid.detail");
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
* Contains Angular 2 components for the <b>wijmo.grid.detail</b> module.
*
* <b>wijmo.angular2.grid.detail</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjDetail from 'wijmo/wijmo.angular2.grid.detail';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjDetail.WjFlexGridDetail],
*     template: `
*       &lt;wj-flex-grid [itemsSource]="data"&gt;
*           &lt;template wjFlexGridDetail&gt;
*               Detail row content here...
*           &lt;/template&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.detail'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexGridDetailMeta = {
    selector: '[wjFlexGridDetail]',
    inputs: [
        'wjFlexGridDetail',
        'maxHeight',
        'detailVisibilityMode',
        'rowHasDetail',
        'isAnimated',
    ],
    outputs: [
        'initialized',
    ],
    exportAs: 'wjFlexGridDetail',
    providers: []
};
/**
    * Angular 2 directive for @see:FlexGrid @see:DetailRow templates.
    *
    * The <b>wj-flex-grid-detail</b> directive must be specified on a <b>&lt;template&gt;</b>
    * template element contained in a <b>wj-flex-grid</b> component.
    *
    * The <b>wj-flex-grid-detail</b> directive is derived from the @see:FlexGridDetailProvider
    * class that maintains detail rows visibility, with detail rows content defined as
    * an arbitrary HTML fragment within the directive tag. The fragment may contain
    * Angular 2 bindings, components and directives.
    * The <b>row</b> and
    * <b>item</b> template variables can be used in Angular 2 bindings that refer to
    * the detail row's parent @see:Row and <b>Row.dataItem</b> objects.
    *
    */
var WjFlexGridDetail = /** @class */ (function (_super) {
    __extends(WjFlexGridDetail, _super);
    function WjFlexGridDetail(elRef, injector, parentCmp, viewContainerRef, templateRef, domRenderer) {
        var _this = _super.call(this, parentCmp) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this._viewContainerRef = viewContainerRef;
        _this._templateRef = templateRef;
        _this._domRenderer = domRenderer;
        _this._init();
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
    WjFlexGridDetail.prototype.created = function () {
    };
    WjFlexGridDetail.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexGridDetail.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexGridDetail.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexGridDetail.prototype._init = function () {
        var _this = this;
        // show detail when asked to
        this.createDetailCell = function (row, col) {
            var templ = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(_this.grid.hostElement, _this._viewContainerRef, _this._templateRef, _this._domRenderer), viewRef = templ.viewRef, templRoot = templ.rootElement;
            //viewRef.setLocal('row', row);
            //viewRef.setLocal('col', col);
            //viewRef.setLocal('item', row.dataItem);
            viewRef.context.row = row;
            viewRef.context.col = col;
            viewRef.context.item = row.dataItem;
            templRoot.parentElement.removeChild(templRoot);
            templRoot[WjFlexGridDetail._viewRefProp] = viewRef;
            return templRoot;
        };
        // dispose detail scope when asked to
        this.disposeDetailCell = function (row) {
            var viewRef;
            if (row.detail && (viewRef = row.detail[WjFlexGridDetail._viewRefProp])) {
                row.detail[WjFlexGridDetail._viewRefProp] = null;
                var idx = _this._viewContainerRef.indexOf(viewRef);
                if (idx > -1) {
                    _this._viewContainerRef.remove(idx);
                }
            }
        };
    };
    WjFlexGridDetail._viewRefProp = '__wj_viewRef';
    WjFlexGridDetail.meta = {
        outputs: exports.wjFlexGridDetailMeta.outputs,
    };
    WjFlexGridDetail.decorators = [
        { type: core_2.Directive, args: [{
                    selector: exports.wjFlexGridDetailMeta.selector,
                    inputs: exports.wjFlexGridDetailMeta.inputs,
                    outputs: exports.wjFlexGridDetailMeta.outputs,
                    exportAs: exports.wjFlexGridDetailMeta.exportAs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridDetail; }) }
                    ].concat(exports.wjFlexGridDetailMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexGridDetail.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
        { type: core_2.ViewContainerRef, decorators: [{ type: core_3.Inject, args: [core_2.ViewContainerRef,] },] },
        { type: core_2.TemplateRef, decorators: [{ type: core_3.Inject, args: [core_2.TemplateRef,] },] },
        { type: core_2.Renderer, decorators: [{ type: core_3.Inject, args: [core_2.Renderer,] },] },
    ]; };
    return WjFlexGridDetail;
}(wjcGridDetail.FlexGridDetailProvider));
exports.WjFlexGridDetail = WjFlexGridDetail;
var moduleExports = [
    WjFlexGridDetail
];
var WjGridDetailModule = /** @class */ (function () {
    function WjGridDetailModule() {
    }
    WjGridDetailModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjGridDetailModule.ctorParameters = function () { return []; };
    return WjGridDetailModule;
}());
exports.WjGridDetailModule = WjGridDetailModule;
//# sourceMappingURL=wijmo.angular2.grid.detail.js.map