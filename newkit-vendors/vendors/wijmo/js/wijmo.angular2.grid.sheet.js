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
var wjcGridSheet = require("wijmo/wijmo.grid.sheet");
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
* Contains Angular 2 components for the <b>wijmo.grid.sheet</b> module.
*
* <b>wijmo.angular2.grid.sheet</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjSheet from 'wijmo/wijmo.angular2.grid.sheet';
* &nbsp;
* &#64;Component({
*     directives: [wjSheet.WjFlexSheet],
*     template: `&lt;wj-flex-sheet&gt;&lt;/wj-flex-sheet&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.sheet'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexSheetMeta = {
    selector: 'wj-flex-sheet',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'asyncBindings',
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
        'isTabHolderVisible',
        'selectedSheetIndex',
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
        'selectedSheetChangedNg: selectedSheetChanged',
        'selectedSheetIndexChangePC: selectedSheetIndexChange',
        'draggingRowColumnNg: draggingRowColumn',
        'droppingRowColumnNg: droppingRowColumn',
        'loadedNg: loaded',
        'unknownFunctionNg: unknownFunction',
        'sheetClearedNg: sheetCleared',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.grid.sheet.FlexSheet control.
 *
 * Use the <b>wj-flex-sheet</b> component to add <b>FlexSheet</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexSheet</b> component is derived from the <b>FlexSheet</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-sheet</b> component may contain a @see:wijmo/wijmo.angular2.grid.sheet.WjSheet child component.
*/
var WjFlexSheet = /** @class */ (function (_super) {
    __extends(WjFlexSheet, _super);
    function WjFlexSheet(elRef, injector, parentCmp) {
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
    WjFlexSheet.prototype.created = function () {
    };
    WjFlexSheet.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexSheet.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexSheet.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexSheet.prototype.addEventListener = function (target, type, fn, capture) {
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
    WjFlexSheet.meta = {
        outputs: exports.wjFlexSheetMeta.outputs,
        changeEvents: {
            'selectedSheetChanged': ['selectedSheetIndex']
        },
    };
    WjFlexSheet.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexSheetMeta.selector,
                    template: exports.wjFlexSheetMeta.template,
                    inputs: exports.wjFlexSheetMeta.inputs,
                    outputs: exports.wjFlexSheetMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexSheet; }) }
                    ].concat(exports.wjFlexSheetMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexSheet.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexSheet;
}(wjcGridSheet.FlexSheet));
exports.WjFlexSheet = WjFlexSheet;
exports.wjSheetMeta = {
    selector: 'wj-sheet',
    template: "",
    inputs: [
        'wjProperty',
        'name',
        'itemsSource',
        'visible',
        'rowCount',
        'columnCount',
    ],
    outputs: [
        'initialized',
        'nameChangedNg: nameChanged',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.grid.sheet.Sheet control.
 *
 * The <b>wj-sheet</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.grid.sheet.WjFlexSheet component.
 *
 * Use the <b>wj-sheet</b> component to add <b>Sheet</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjSheet</b> component is derived from the <b>Sheet</b> control and
 * inherits all its properties, events and methods.
*/
var WjSheet = /** @class */ (function (_super) {
    __extends(WjSheet, _super);
    function WjSheet(elRef, injector, parentCmp) {
        var _this = _super.call(this, parentCmp) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this._flexSheet = parentCmp;
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
    WjSheet.prototype.created = function () {
    };
    WjSheet.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
        //TBD: it should add itself to FlexSheet
        if (this.itemsSource) {
            return this._flexSheet.addBoundSheet(this.name, this.itemsSource);
        }
        else {
            return this._flexSheet.addUnboundSheet(this.name, this.boundRowCount != null ? +this.boundRowCount : null, this.boundColumnCount != null ? +this.boundColumnCount : null);
        }
    };
    WjSheet.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjSheet.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjSheet.prototype.ngOnChanges = function (changes) {
        var chg;
        if ((chg = changes['rowCount']) && chg.isFirstChange) {
            this.boundRowCount = chg.currentValue;
        }
        if ((chg = changes['columnCount']) && chg.isFirstChange) {
            this.boundColumnCount = chg.currentValue;
        }
    };
    WjSheet.meta = {
        outputs: exports.wjSheetMeta.outputs,
    };
    WjSheet.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjSheetMeta.selector,
                    template: exports.wjSheetMeta.template,
                    inputs: exports.wjSheetMeta.inputs,
                    outputs: exports.wjSheetMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjSheet; }) }
                    ].concat(exports.wjSheetMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjSheet.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjSheet;
}(wjcGridSheet.Sheet));
exports.WjSheet = WjSheet;
var moduleExports = [
    WjFlexSheet,
    WjSheet
];
var WjGridSheetModule = /** @class */ (function () {
    function WjGridSheetModule() {
    }
    WjGridSheetModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjGridSheetModule.ctorParameters = function () { return []; };
    return WjGridSheetModule;
}());
exports.WjGridSheetModule = WjGridSheetModule;
//# sourceMappingURL=wijmo.angular2.grid.sheet.js.map