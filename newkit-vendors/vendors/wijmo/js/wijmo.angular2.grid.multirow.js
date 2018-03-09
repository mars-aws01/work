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
var wjcGridMultirow = require("wijmo/wijmo.grid.multirow");
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
* Contains Angular 2 components for the <b>wijmo.grid.multirow</b> module.
*
* <b>wijmo.angular2.grid.multirow</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjMultiRow from 'wijmo/wijmo.angular2.grid.multirow';
* &nbsp;
* &#64;Component({
*     directives: [wjMultiRow.WjMultiRow],
*     template: `&lt;wj-multi-row&gt;&lt;/wj-multi-row&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.multirow'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjMultiRowMeta = {
    selector: 'wj-multi-row',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'newRowAtTop',
        'allowAddNew',
        'allowDelete',
        'allowDragging',
        'allowMerging',
        'allowResizing',
        'allowSorting',
        'autoSizeMode',
        'autoGenerateColumns',
        'childItemsPath',
        'groupHeaderFormat',
        'headersVisibility',
        'showSelectedHeaders',
        'showMarquee',
        'itemFormatter',
        'isReadOnly',
        'imeEnabled',
        'mergeManager',
        'selectionMode',
        'showGroups',
        'showSort',
        'showDropDown',
        'showAlternatingRows',
        'showErrors',
        'validateEdits',
        'treeIndent',
        'itemsSource',
        'autoClipboard',
        'frozenRows',
        'frozenColumns',
        'deferResizing',
        'sortRowIndex',
        'stickyHeaders',
        'preserveSelectedState',
        'preserveOutlineState',
        'keyActionTab',
        'keyActionEnter',
        'rowHeaderPath',
        'virtualizationThreshold',
        'layoutDefinition',
        'centerHeadersVertically',
        'collapsedHeaders',
        'showHeaderCollapseButton',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'beginningEditNg: beginningEdit',
        'cellEditEndedNg: cellEditEnded',
        'cellEditEndingNg: cellEditEnding',
        'prepareCellForEditNg: prepareCellForEdit',
        'formatItemNg: formatItem',
        'resizingColumnNg: resizingColumn',
        'resizedColumnNg: resizedColumn',
        'autoSizingColumnNg: autoSizingColumn',
        'autoSizedColumnNg: autoSizedColumn',
        'draggingColumnNg: draggingColumn',
        'draggingColumnOverNg: draggingColumnOver',
        'draggedColumnNg: draggedColumn',
        'sortingColumnNg: sortingColumn',
        'sortedColumnNg: sortedColumn',
        'resizingRowNg: resizingRow',
        'resizedRowNg: resizedRow',
        'autoSizingRowNg: autoSizingRow',
        'autoSizedRowNg: autoSizedRow',
        'draggingRowNg: draggingRow',
        'draggingRowOverNg: draggingRowOver',
        'draggedRowNg: draggedRow',
        'deletingRowNg: deletingRow',
        'deletedRowNg: deletedRow',
        'loadingRowsNg: loadingRows',
        'loadedRowsNg: loadedRows',
        'rowEditStartingNg: rowEditStarting',
        'rowEditStartedNg: rowEditStarted',
        'rowEditEndingNg: rowEditEnding',
        'rowEditEndedNg: rowEditEnded',
        'rowAddedNg: rowAdded',
        'groupCollapsedChangedNg: groupCollapsedChanged',
        'groupCollapsedChangingNg: groupCollapsedChanging',
        'itemsSourceChangedNg: itemsSourceChanged',
        'selectionChangingNg: selectionChanging',
        'selectionChangedNg: selectionChanged',
        'scrollPositionChangedNg: scrollPositionChanged',
        'updatingViewNg: updatingView',
        'updatedViewNg: updatedView',
        'updatingLayoutNg: updatingLayout',
        'updatedLayoutNg: updatedLayout',
        'pastingNg: pasting',
        'pastedNg: pasted',
        'pastingCellNg: pastingCell',
        'pastedCellNg: pastedCell',
        'copyingNg: copying',
        'copiedNg: copied',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.grid.multirow.MultiRow control.
 *
 * Use the <b>wj-multi-row</b> component to add <b>MultiRow</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjMultiRow</b> component is derived from the <b>MultiRow</b> control and
 * inherits all its properties, events and methods.
*/
var WjMultiRow = /** @class */ (function (_super) {
    __extends(WjMultiRow, _super);
    function WjMultiRow(elRef, injector, parentCmp) {
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
    WjMultiRow.prototype.created = function () {
    };
    WjMultiRow.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjMultiRow.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjMultiRow.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjMultiRow.prototype.addEventListener = function (target, type, fn, capture) {
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
    WjMultiRow.meta = {
        outputs: exports.wjMultiRowMeta.outputs,
    };
    WjMultiRow.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjMultiRowMeta.selector,
                    template: exports.wjMultiRowMeta.template,
                    inputs: exports.wjMultiRowMeta.inputs,
                    outputs: exports.wjMultiRowMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiRow; }) }
                    ].concat(exports.wjMultiRowMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjMultiRow.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjMultiRow;
}(wjcGridMultirow.MultiRow));
exports.WjMultiRow = WjMultiRow;
var moduleExports = [
    WjMultiRow
];
var WjGridMultirowModule = /** @class */ (function () {
    function WjGridMultirowModule() {
    }
    WjGridMultirowModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjGridMultirowModule.ctorParameters = function () { return []; };
    return WjGridMultirowModule;
}());
exports.WjGridMultirowModule = WjGridMultirowModule;
//# sourceMappingURL=wijmo.angular2.grid.multirow.js.map