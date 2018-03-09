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
var wjcOlap = require("wijmo/wijmo.olap");
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
* Contains Angular 2 components for the <b>wijmo.olap</b> module.
*
* <b>wijmo.angular2.olap</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjOlap from 'wijmo/wijmo.angular2.olap';
* &nbsp;
* &#64;Component({
*     directives: [wjOlap.WjPivotGrid],
*     template: '&lt;wj-pivot-grid [itemsSource]="data"&gt;&lt;/wj-pivot-grid&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.olap'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjPivotGridMeta = {
    selector: 'wj-pivot-grid',
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
        'quickAutoSize',
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
        'cloneFrozenCells',
        'deferResizing',
        'sortRowIndex',
        'stickyHeaders',
        'preserveSelectedState',
        'preserveOutlineState',
        'keyActionTab',
        'keyActionEnter',
        'rowHeaderPath',
        'virtualizationThreshold',
        'showDetailOnDoubleClick',
        'customContextMenu',
        'collapsibleSubtotals',
        'centerHeadersVertically',
        'showColumnFieldHeaders',
        'showRowFieldHeaders',
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
 * Angular 2 component for the @see:wijmo.olap.PivotGrid control.
 *
 * Use the <b>wj-pivot-grid</b> component to add <b>PivotGrid</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjPivotGrid</b> component is derived from the <b>PivotGrid</b> control and
 * inherits all its properties, events and methods.
*/
var WjPivotGrid = /** @class */ (function (_super) {
    __extends(WjPivotGrid, _super);
    function WjPivotGrid(elRef, injector, parentCmp) {
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
    WjPivotGrid.prototype.created = function () {
    };
    WjPivotGrid.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPivotGrid.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPivotGrid.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjPivotGrid.prototype.addEventListener = function (target, type, fn, capture) {
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
    WjPivotGrid.meta = {
        outputs: exports.wjPivotGridMeta.outputs,
    };
    WjPivotGrid.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjPivotGridMeta.selector,
                    template: exports.wjPivotGridMeta.template,
                    inputs: exports.wjPivotGridMeta.inputs,
                    outputs: exports.wjPivotGridMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotGrid; }) }
                    ].concat(exports.wjPivotGridMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjPivotGrid.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjPivotGrid;
}(wjcOlap.PivotGrid));
exports.WjPivotGrid = WjPivotGrid;
exports.wjPivotChartMeta = {
    selector: 'wj-pivot-chart',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'chartType',
        'showHierarchicalAxes',
        'showTotals',
        'showTitle',
        'showLegend',
        'legendPosition',
        'stacking',
        'maxSeries',
        'maxPoints',
        'itemsSource',
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
 * Angular 2 component for the @see:wijmo.olap.PivotChart control.
 *
 * Use the <b>wj-pivot-chart</b> component to add <b>PivotChart</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjPivotChart</b> component is derived from the <b>PivotChart</b> control and
 * inherits all its properties, events and methods.
*/
var WjPivotChart = /** @class */ (function (_super) {
    __extends(WjPivotChart, _super);
    function WjPivotChart(elRef, injector, parentCmp) {
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
    WjPivotChart.prototype.created = function () {
    };
    WjPivotChart.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPivotChart.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPivotChart.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjPivotChart.prototype.addEventListener = function (target, type, fn, capture) {
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
    WjPivotChart.meta = {
        outputs: exports.wjPivotChartMeta.outputs,
    };
    WjPivotChart.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjPivotChartMeta.selector,
                    template: exports.wjPivotChartMeta.template,
                    inputs: exports.wjPivotChartMeta.inputs,
                    outputs: exports.wjPivotChartMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotChart; }) }
                    ].concat(exports.wjPivotChartMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjPivotChart.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjPivotChart;
}(wjcOlap.PivotChart));
exports.WjPivotChart = WjPivotChart;
exports.wjPivotPanelMeta = {
    selector: 'wj-pivot-panel',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'autoGenerateFields',
        'viewDefinition',
        'engine',
        'itemsSource',
        'showFieldIcons',
        'restrictDragging',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'itemsSourceChangedNg: itemsSourceChanged',
        'viewDefinitionChangedNg: viewDefinitionChanged',
        'updatingViewNg: updatingView',
        'updatedViewNg: updatedView',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.olap.PivotPanel control.
 *
 * Use the <b>wj-pivot-panel</b> component to add <b>PivotPanel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjPivotPanel</b> component is derived from the <b>PivotPanel</b> control and
 * inherits all its properties, events and methods.
*/
var WjPivotPanel = /** @class */ (function (_super) {
    __extends(WjPivotPanel, _super);
    function WjPivotPanel(elRef, injector, parentCmp) {
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
    WjPivotPanel.prototype.created = function () {
    };
    WjPivotPanel.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPivotPanel.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPivotPanel.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjPivotPanel.prototype.addEventListener = function (target, type, fn, capture) {
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
    WjPivotPanel.meta = {
        outputs: exports.wjPivotPanelMeta.outputs,
    };
    WjPivotPanel.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjPivotPanelMeta.selector,
                    template: exports.wjPivotPanelMeta.template,
                    inputs: exports.wjPivotPanelMeta.inputs,
                    outputs: exports.wjPivotPanelMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotPanel; }) }
                    ].concat(exports.wjPivotPanelMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjPivotPanel.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjPivotPanel;
}(wjcOlap.PivotPanel));
exports.WjPivotPanel = WjPivotPanel;
var moduleExports = [
    WjPivotGrid,
    WjPivotChart,
    WjPivotPanel
];
var WjOlapModule = /** @class */ (function () {
    function WjOlapModule() {
    }
    WjOlapModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjOlapModule.ctorParameters = function () { return []; };
    return WjOlapModule;
}());
exports.WjOlapModule = WjOlapModule;
//# sourceMappingURL=wijmo.angular2.olap.js.map