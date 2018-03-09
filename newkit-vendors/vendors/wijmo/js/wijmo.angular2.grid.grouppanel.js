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
var wjcGridGrouppanel = require("wijmo/wijmo.grid.grouppanel");
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
* Contains Angular 2 components for the <b>wijmo.grid.grouppanel</b> module.
*
* <b>wijmo.angular2.grid.grouppanel</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjPanel from 'wijmo/wijmo.angular2.grid.grouppanel';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjPanel.WjGroupPanel],
*     template: `
*       &lt;wj-group-panel
*           [grid]="flex"
*           [placeholder]="'Drag columns here to create groups.'"&gt;
*       &lt;/wj-group-panel&gt;
*       &lt;wj-flex-grid #flex [itemsSource]="data"&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.grouppanel'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjGroupPanelMeta = {
    selector: 'wj-group-panel',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'hideGroupedColumns',
        'maxGroups',
        'placeholder',
        'grid',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.grid.grouppanel.GroupPanel control.
 *
 * Use the <b>wj-group-panel</b> component to add <b>GroupPanel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjGroupPanel</b> component is derived from the <b>GroupPanel</b> control and
 * inherits all its properties, events and methods.
*/
var WjGroupPanel = /** @class */ (function (_super) {
    __extends(WjGroupPanel, _super);
    function WjGroupPanel(elRef, injector, parentCmp) {
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
    WjGroupPanel.prototype.created = function () {
    };
    WjGroupPanel.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjGroupPanel.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjGroupPanel.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjGroupPanel.prototype.addEventListener = function (target, type, fn, capture) {
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
    WjGroupPanel.meta = {
        outputs: exports.wjGroupPanelMeta.outputs,
    };
    WjGroupPanel.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjGroupPanelMeta.selector,
                    template: exports.wjGroupPanelMeta.template,
                    inputs: exports.wjGroupPanelMeta.inputs,
                    outputs: exports.wjGroupPanelMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjGroupPanel; }) }
                    ].concat(exports.wjGroupPanelMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjGroupPanel.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjGroupPanel;
}(wjcGridGrouppanel.GroupPanel));
exports.WjGroupPanel = WjGroupPanel;
var moduleExports = [
    WjGroupPanel
];
var WjGridGrouppanelModule = /** @class */ (function () {
    function WjGridGrouppanelModule() {
    }
    WjGridGrouppanelModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjGridGrouppanelModule.ctorParameters = function () { return []; };
    return WjGridGrouppanelModule;
}());
exports.WjGridGrouppanelModule = WjGridGrouppanelModule;
//# sourceMappingURL=wijmo.angular2.grid.grouppanel.js.map