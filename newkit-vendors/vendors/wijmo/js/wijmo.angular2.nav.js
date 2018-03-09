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
var wjcNav = require("wijmo/wijmo.nav");
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
* Contains Angular 2 components for the <b>wijmo.nav</b> module.
*
* <b>wijmo.angular2.nav</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjNav from 'wijmo/wijmo.angular2.nav';
* &nbsp;
* &#64;Component({
*     directives: [wjNav.WjTreeView],
*     template: `
*       &lt;wj-tree-view [itemsSource]="items" [displayMemberPath]="'header'" [childItemsPath]="'items'"&gt;
*       &lt;/wj-tree-view;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.nav'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjTreeViewMeta = {
    selector: 'wj-tree-view',
    template: "",
    inputs: [
        'asyncBindings',
        'wjModelProperty',
        'isDisabled',
        'childItemsPath',
        'displayMemberPath',
        'imageMemberPath',
        'isContentHtml',
        'showCheckboxes',
        'autoCollapse',
        'isAnimated',
        'isReadOnly',
        'allowDragging',
        'expandOnClick',
        'lazyLoadFunction',
        'itemsSource',
        'selectedItem',
        'selectedNode',
        'checkedItems',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'itemsSourceChangedNg: itemsSourceChanged',
        'loadingItemsNg: loadingItems',
        'loadedItemsNg: loadedItems',
        'itemClickedNg: itemClicked',
        'selectedItemChangedNg: selectedItemChanged',
        'selectedItemChangePC: selectedItemChange',
        'selectedNodeChangePC: selectedNodeChange',
        'checkedItemsChangedNg: checkedItemsChanged',
        'checkedItemsChangePC: checkedItemsChange',
        'isCollapsedChangingNg: isCollapsedChanging',
        'isCollapsedChangedNg: isCollapsedChanged',
        'isCheckedChangingNg: isCheckedChanging',
        'isCheckedChangedNg: isCheckedChanged',
        'formatItemNg: formatItem',
        'dragStartNg: dragStart',
        'dragOverNg: dragOver',
        'dropNg: drop',
        'dragEndNg: dragEnd',
        'nodeEditStartingNg: nodeEditStarting',
        'nodeEditStartedNg: nodeEditStarted',
        'nodeEditEndingNg: nodeEditEnding',
        'nodeEditEndedNg: nodeEditEnded',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.nav.TreeView control.
 *
 * Use the <b>wj-tree-view</b> component to add <b>TreeView</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjTreeView</b> component is derived from the <b>TreeView</b> control and
 * inherits all its properties, events and methods.
*/
var WjTreeView = /** @class */ (function (_super) {
    __extends(WjTreeView, _super);
    function WjTreeView(elRef, injector, parentCmp) {
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
    WjTreeView.prototype.created = function () {
    };
    WjTreeView.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjTreeView.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjTreeView.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjTreeView.prototype.addEventListener = function (target, type, fn, capture) {
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
    WjTreeView.meta = {
        outputs: exports.wjTreeViewMeta.outputs,
        changeEvents: {
            'selectedItemChanged': ['selectedItem', 'selectedNode'],
            'checkedItemsChanged': ['checkedItems']
        },
    };
    WjTreeView.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjTreeViewMeta.selector,
                    template: exports.wjTreeViewMeta.template,
                    inputs: exports.wjTreeViewMeta.inputs,
                    outputs: exports.wjTreeViewMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTreeView; }) }
                    ].concat(exports.wjTreeViewMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjTreeView.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjTreeView;
}(wjcNav.TreeView));
exports.WjTreeView = WjTreeView;
var moduleExports = [
    WjTreeView
];
var WjNavModule = /** @class */ (function () {
    function WjNavModule() {
    }
    WjNavModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjNavModule.ctorParameters = function () { return []; };
    return WjNavModule;
}());
exports.WjNavModule = WjNavModule;
//# sourceMappingURL=wijmo.angular2.nav.js.map