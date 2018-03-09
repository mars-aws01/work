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
var wjcGrid = require("wijmo/wijmo.grid");
var wjcCore = require("wijmo/wijmo");
function tryGetModuleWijmoGridDetail() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['detail'];
}
function tryGetModuleWijmoInput() {
    var m1;
    return (m1 = window['wijmo']) && m1['input'];
}
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
///<wijmo-soft-import from="wijmo.input"/>
///<wijmo-soft-import from="wijmo.grid.detail"/>
/**
* Contains Angular 2 components for the <b>wijmo.grid</b> module.
*
* <b>wijmo.angular2.grid</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>&lt;p&gt;Here is a data bound FlexGrid control with four columns:&lt;/p&gt;
* &lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Country'"
*     [binding]="'country'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Sales'"
*     [binding]="'sales'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Expenses'"
*     [binding]="'expenses'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Downloads'"
*     [binding]="'downloads'"&gt;
*   &lt;/wj-flex-grid-column&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexGridMeta = {
    selector: 'wj-flex-grid',
    template: "<div><ng-content></ng-content></div>",
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
 * Angular 2 component for the @see:wijmo.grid.FlexGrid control.
 *
 * Use the <b>wj-flex-grid</b> component to add <b>FlexGrid</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
 *
 * <pre>&lt;p&gt;Here is a data bound FlexGrid control with four columns:&lt;/p&gt;
 * &lt;wj-flex-grid [itemsSource]="data"&gt;
 *   &lt;wj-flex-grid-column
 *     [header]="'Country'"
 *     [binding]="'country'"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column
 *     [header]="'Sales'"
 *     [binding]="'sales'"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column
 *     [header]="'Expenses'"
 *     [binding]="'expenses'"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column
 *     [header]="'Downloads'"
 *     [binding]="'downloads'"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 * &lt;/wj-flex-grid&gt;</pre>
 *

 * The <b>WjFlexGrid</b> component is derived from the <b>FlexGrid</b> control and
 * inherits all its properties, events and methods.
 * The following properties are not available for binding in templates:
 * <b>scrollPosition</b>, <b>selection</b> and <b>columnLayout</b> properties.
 *
 * The <b>wj-flex-grid</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.grid.detail.WjFlexGridDetail
 * , @see:wijmo/wijmo.angular2.grid.filter.WjFlexGridFilter
 * , @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn
 *  and @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate.
*/
var WjFlexGrid = /** @class */ (function (_super) {
    __extends(WjFlexGrid, _super);
    function WjFlexGrid(elRef, injector, parentCmp, cdRef) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        new DirectiveCellFactory(_this, cdRef);
        //TBD: patch: default row height, remove after the issue will be fixed in grid
        _this.deferUpdate(function () {
            if (_this.rows.defaultSize < 10) {
                var e = _this.hostElement, csh = getComputedStyle(e), csb = getComputedStyle(document.body), defRowHei = parseInt(csh.fontSize && wjcCore.contains(document.body, e) ? csh.fontSize : csb.fontSize) * 2;
                _this.rows.defaultSize = defRowHei;
                _this.columns.defaultSize = defRowHei * 4;
                _this.columnHeaders.rows.defaultSize = defRowHei;
                _this.rowHeaders.columns.defaultSize = Math.round(defRowHei * 1.25);
            }
        });
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
    WjFlexGrid.prototype.created = function () {
    };
    WjFlexGrid.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexGrid.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexGrid.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexGrid.prototype.addEventListener = function (target, type, fn, capture) {
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
    WjFlexGrid.meta = {
        outputs: exports.wjFlexGridMeta.outputs,
    };
    WjFlexGrid.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexGridMeta.selector,
                    template: exports.wjFlexGridMeta.template,
                    inputs: exports.wjFlexGridMeta.inputs,
                    outputs: exports.wjFlexGridMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGrid; }) }
                    ].concat(exports.wjFlexGridMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexGrid.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
        { type: core_3.ChangeDetectorRef, decorators: [{ type: core_3.Inject, args: [core_3.ChangeDetectorRef,] },] },
    ]; };
    return WjFlexGrid;
}(wjcGrid.FlexGrid));
exports.WjFlexGrid = WjFlexGrid;
exports.wjFlexGridColumnMeta = {
    selector: 'wj-flex-grid-column',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'asyncBindings',
        'wjProperty',
        'name',
        'dataMap',
        'dataType',
        'binding',
        'sortMemberPath',
        'format',
        'header',
        'width',
        'maxLength',
        'minWidth',
        'maxWidth',
        'align',
        'allowDragging',
        'allowSorting',
        'allowResizing',
        'allowMerging',
        'aggregate',
        'isReadOnly',
        'cssClass',
        'isContentHtml',
        'isSelected',
        'visible',
        'wordWrap',
        'mask',
        'inputType',
        'isRequired',
        'showDropDown',
        'dropDownCssClass',
        'quickAutoSize',
    ],
    outputs: [
        'initialized',
        'isSelectedChangePC: isSelectedChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.grid.Column control.
 *
 * The <b>wj-flex-grid-column</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
 *
 * Use the <b>wj-flex-grid-column</b> component to add <b>Column</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjFlexGridColumn</b> component is derived from the <b>Column</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-grid-column</b> component may contain a @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate child directive.
*/
var WjFlexGridColumn = /** @class */ (function (_super) {
    __extends(WjFlexGridColumn, _super);
    function WjFlexGridColumn(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'columns'.
         */
        _this.wjProperty = 'columns';
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        var gridCmp = behavior.parentBehavior.directive;
        if (gridCmp.autoGenerateColumns) {
            gridCmp.autoGenerateColumns = false;
            gridCmp.columns.clear();
        }
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
    WjFlexGridColumn.prototype.created = function () {
    };
    WjFlexGridColumn.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexGridColumn.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexGridColumn.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjFlexGridColumn.meta = {
        outputs: exports.wjFlexGridColumnMeta.outputs,
        changeEvents: {
            'grid.selectionChanged': ['isSelected']
        },
    };
    WjFlexGridColumn.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFlexGridColumnMeta.selector,
                    template: exports.wjFlexGridColumnMeta.template,
                    inputs: exports.wjFlexGridColumnMeta.inputs,
                    outputs: exports.wjFlexGridColumnMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridColumn; }) }
                    ].concat(exports.wjFlexGridColumnMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFlexGridColumn.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjFlexGridColumn;
}(wjcGrid.Column));
exports.WjFlexGridColumn = WjFlexGridColumn;
/**
* Angular 2 directive for the @see:FlexGrid cell templates.
*
* The <b>wjFlexGridCellTemplate</b> directive defines a template for a certain
* cell type in @see:FlexGrid. The template should be defined on a <b>&lt;template&gt;</b> element
* and must contain a <b>cellType</b> attribute that
* specifies the @see:wijmo/wijmo.angular2.grid.CellTemplateType. Depending on the template's cell type,
* the <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive must be a child
* of either @see:wijmo/wijmo.angular2.grid.WjFlexGrid
* or @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn directives.
*
* Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
* components, and cells that are not column-specific (like row header or top left cells)
* must be contained in the <b>wj-flex-grid</b> component.
*
* The <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive
* may contain an arbitrary HTML fragment with Angular 2 interpolation expressions and
* other components and directives.
*
* Bindings in HTML fragment can use the <b>cell</b> local template variable containing the cell context object,
* with <b>col</b>, <b>row</b>, and <b>item</b> properties that refer to the @see:Column,
* @see:Row, and <b>Row.dataItem</b> objects pertaining to the cell.
*
* For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b>
* property containing an unformatted cell value is provided. For example, here is a
* @see:FlexGrid control with templates for row header cells and, regular
* and column header cells of the Country column:
*
* <pre>import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjGrid.WjFlexGridColumn, wjGrid.WjFlexGridCellTemplate],
*     template: `
* &lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
*     {&#8203;{cell.row.index}}
*   &lt;/template&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     ...
*   &lt;/template&gt;
* &nbsp;
*   &lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*     &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
*       &lt;img src="resources/globe.png" /&gt;
*         {&#8203;{cell.col.header}}
*     &lt;/template&gt;
*     &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
*       &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
*       {&#8203;{cell.item.country}}
*     &lt;/template&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;&lt;/wj-flex-grid-column&gt;
* &lt;/wj-flex-grid&gt;
* `,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
* For more detailed information on specific cell type templates, refer to the
* documentation for @see:wijmo/wijmo.angular2.grid.CellTemplateType enumeration.
*
* The <b>wjFlexGridCellTemplate</b> directive supports the following attributes:
*
* <dl class="dl-horizontal">
*   <dt>cellType</dt>
*   <dd>
*     The <b>CellTemplateType</b> value defining the type of cell to which the template is applied.
*   </dd>
*   <dt>cellOverflow</dt>
*   <dd>
*     Defines the <b>style.overflow</b> property value for cells.
*   </dd>
* </dl>
*
* The <b>cellType</b> attribute takes any of the following enumerated values:
*
* <b>Cell</b>
*
* Defines a regular (data) cell template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* For example, this cell template shows flags in the cells of Country column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
*     &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
*     {&#8203;{cell.item.country}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* If <b>Group</b> template is not provided for a hierarchical @see:FlexGrid (that is, one with the <b>childItemsPath</b> property
* specified), non-header cells in group rows of
* this @see:Column also use this template.
*
* <b>CellEdit</b>
*
* Defines a template for a cell in edit mode. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* This cell type has an additional <b>cell.value</b> property available for binding. It contains the
* original cell value before editing, and the updated value after editing.

* For example, here is a template that uses the Wijmo @see:InputNumber control as an editor
* for the "Sales" column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'CellEdit'"&gt;
*     &lt;wj-input-number [(value)]="cell.value" [step]="1"&gt;&lt;/wj-input-number&gt;
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>ColumnHeader</b>
*
* Defines a template for a column header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* For example, this template adds an image to the header of the "Country" column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
*     &lt;img src="resources/globe.png" /&gt;
*       {&#8203;{cell.col.header}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>RowHeader</b>
*
* Defines a template for a row header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows row indices in the row headers:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
*     {&#8203;{cell.row.index + 1}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* Note that this template is applied to a row header cell, even if it is in a row that is
* in edit mode. In order to provide an edit-mode version of a row header cell with alternate
* content, define the <b>RowHeaderEdit</b> template.
*
* <b>RowHeaderEdit</b>
*
* Defines a template for a row header cell in edit mode. Must be a child of the
* @see:wijmo/wijmo.angular2.grid.WjFlexGrid component. For example, this template shows dots in the header
* of rows being edited:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     ...
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
* applies:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     {&#8203;{&amp;#x270e;}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>TopLeft</b>
*
* Defines a template for the top left cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows a down/right glyph in the top-left cell of the grid:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'TopLeft'"&gt;
*     &lt;span class="wj-glyph-down-right"&gt;&lt;/span&gt;
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>GroupHeader</b>
*
* Defines a template for a group header cell in a @see:GroupRow, Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
*
* The <b>cell.row</b> property contains an instance of the <b>GroupRow</b> class. If the grouping comes
* from @see:CollectionView, the <b>cell.item</b> property references the @see:CollectionViewGroup object.
*
* For example, this template uses a checkbox element as an expand/collapse toggle:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'GroupHeader'" let-cell="cell"&gt;
*     &lt;input type="checkbox" [(ngModel)]="cell.row.isCollapsed"/&gt;
*     {&#8203;{cell.item.name}} ({&#8203;{cell.item.items.length}} items)
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>Group</b>
*
* Defines a template for a regular cell (not a group header) in a @see:GroupRow. Must be a child of the
* @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b> property available for
* binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
* aggregate value.
*
* For example, this template shows aggregate's value and kind for group row cells in the "Sales"
* column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'Group'" let-cell="cell"&gt;
*     Average: {&#8203;{cell.value | number:'1.0-0'}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>ColumnFooter</b>
*
* Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
* @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b>
* property available for binding that contains a cell value.
*
* For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
* column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnFooter'" let-cell="cell"&gt;
*     Average: {&#8203;{cell.value | number:'1.0-0'}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>BottomLeft</b>
*
* Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
* Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows a sigma glyph in the bottom-left cell of the grid:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'BottomLeft'"&gt;
*     &amp;#931;
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>NewCellTemplate</b>
*
* Defines a cell in a new row template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* Note that the <b>cell.item</b> property is undefined for this type of a cell.
* For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
*
* <pre>&lt;wj-flex-grid-column [header]="'Date'" [binding]="'date'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'NewCellTemplate'"&gt;
*     Enter a date here
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*/
var WjFlexGridCellTemplate = /** @class */ (function () {
    function WjFlexGridCellTemplate(viewContainerRef, templateRef, elRef, parentCmp, domRenderer, injector, cdRef) {
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
        this.elRef = elRef;
        this.domRenderer = domRenderer;
        this.cdRef = cdRef;
        /**
        * Gets or sets a value indicating whether the cell template will increase grid's default row height
        * to accomodate cells content. Defaults to true.
        */
        this.autoSizeRows = true;
        /**
        * For cell edit templates, indicates whether cell editing forcibly starts in full edit mode,
        * regardless of how the editing was initiated. In full edit mode pressing cursor keys don't finish editing.
        * Defaults to true.
        */
        this.forceFullEdit = true;
        if (parentCmp instanceof WjFlexGrid) {
            this.grid = parentCmp;
        }
        else if (parentCmp instanceof WjFlexGridColumn) {
            this.column = parentCmp;
            this.grid = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getBehavior(parentCmp).parentBehavior.directive;
        }
    }
    // returns the name of the property on control instance that stores info for the specified cell template type.
    WjFlexGridCellTemplate._getTemplContextProp = function (templateType) {
        return '$__cellTempl' + CellTemplateType[templateType];
    };
    WjFlexGridCellTemplate.prototype.ngOnInit = function () {
        this.ownerControl = this.column && this.column.grid === this.grid ? this.column : this.grid;
        this._attachToControl();
    };
    WjFlexGridCellTemplate.prototype.ngOnDestroy = function () {
        if (this.cellTypeStr) {
            this.viewContainerRef.clear();
            this.ownerControl[WjFlexGridCellTemplate._getTemplContextProp(this.cellType)] = null;
            this.grid.invalidate();
        }
    };
    WjFlexGridCellTemplate.prototype._instantiateTemplate = function (parent, dataContext) {
        return wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef, this.domRenderer, false, dataContext);
    };
    WjFlexGridCellTemplate.prototype._attachToControl = function () {
        if (!this.cellTypeStr) {
            return;
        }
        var cellType = this.cellType = wjcCore.asEnum(this.cellTypeStr, CellTemplateType), ownerControl = this.ownerControl;
        ownerControl[WjFlexGridCellTemplate._getTemplContextProp(cellType)] = this;
        // TBD: remove flag on dispose if possible
        if (ownerControl instanceof wjcGrid.Column && (cellType === CellTemplateType.Cell ||
            cellType === CellTemplateType.ColumnHeader || cellType === CellTemplateType.ColumnFooter)) {
            ownerControl._setFlag(wjcGrid.RowColFlags.HasTemplate, true);
        }
        this.grid.invalidate();
    };
    WjFlexGridCellTemplate.decorators = [
        { type: core_2.Directive, args: [{
                    selector: '[wjFlexGridCellTemplate]',
                    inputs: ['wjFlexGridCellTemplate', 'cellTypeStr: cellType', 'cellOverflow', 'valuePaths',
                        'autoSizeRows', 'forceFullEdit'],
                    exportAs: 'wjFlexGridCellTemplate',
                    providers: [{ provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridCellTemplate; }) }]
                },] },
    ];
    /** @nocollapse */
    WjFlexGridCellTemplate.ctorParameters = function () { return [
        { type: core_2.ViewContainerRef, decorators: [{ type: core_3.Inject, args: [core_2.ViewContainerRef,] },] },
        { type: core_2.TemplateRef, decorators: [{ type: core_3.Inject, args: [core_2.TemplateRef,] }, { type: core_2.Optional },] },
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
        { type: core_2.Renderer, decorators: [{ type: core_3.Inject, args: [core_2.Renderer,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: core_3.ChangeDetectorRef, decorators: [{ type: core_3.Inject, args: [core_3.ChangeDetectorRef,] },] },
    ]; };
    return WjFlexGridCellTemplate;
}());
exports.WjFlexGridCellTemplate = WjFlexGridCellTemplate;
/**
* Defines the type of cell on which a template is to be applied. This value is specified in the <b>cellType</b> attribute
* of the @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate directive.
*/
var CellTemplateType;
(function (CellTemplateType) {
    /** Defines a regular (data) cell. */
    CellTemplateType[CellTemplateType["Cell"] = 0] = "Cell";
    /** Defines a cell in edit mode. */
    CellTemplateType[CellTemplateType["CellEdit"] = 1] = "CellEdit";
    /** Defines a column header cell. */
    CellTemplateType[CellTemplateType["ColumnHeader"] = 2] = "ColumnHeader";
    /** Defines a row header cell. */
    CellTemplateType[CellTemplateType["RowHeader"] = 3] = "RowHeader";
    /** Defines a row header cell in edit mode. */
    CellTemplateType[CellTemplateType["RowHeaderEdit"] = 4] = "RowHeaderEdit";
    /** Defines a top left cell. */
    CellTemplateType[CellTemplateType["TopLeft"] = 5] = "TopLeft";
    /** Defines a group header cell in a group row. */
    CellTemplateType[CellTemplateType["GroupHeader"] = 6] = "GroupHeader";
    /** Defines a regular cell in a group row. */
    CellTemplateType[CellTemplateType["Group"] = 7] = "Group";
    /** Defines a cell in a new row template. */
    CellTemplateType[CellTemplateType["NewCellTemplate"] = 8] = "NewCellTemplate";
    /** Defines a column footer cell. */
    CellTemplateType[CellTemplateType["ColumnFooter"] = 9] = "ColumnFooter";
    /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
    CellTemplateType[CellTemplateType["BottomLeft"] = 10] = "BottomLeft";
})(CellTemplateType = exports.CellTemplateType || (exports.CellTemplateType = {}));
var DirectiveCellFactory = /** @class */ (function (_super) {
    __extends(DirectiveCellFactory, _super);
    function DirectiveCellFactory(grid, gridCdRef) {
        var _this = _super.call(this) || this;
        _this._needsCdCheck = false;
        _this._lastApplyTimeStamp = 0;
        _this._noApplyLag = false;
        _this._startingEditing = false;
        _this._cellStampCounter = 0;
        _this._composing = false;
        _this.grid = grid;
        _this._gridCdRef = gridCdRef;
        // init _templateTypes
        if (!DirectiveCellFactory._templateTypes) {
            DirectiveCellFactory._templateTypes = [];
            for (var templateType in CellTemplateType) {
                if (isNaN(templateType)) {
                    DirectiveCellFactory._templateTypes.push(templateType);
                }
            }
        }
        var self = _this;
        _this._baseCf = grid.cellFactory;
        grid.cellFactory = _this;
        // initialize input event dispatcher
        _this._evtInput = document.createEvent('HTMLEvents');
        _this._evtInput.initEvent('input', true, false);
        // initialize blur event dispatcher
        _this._evtBlur = document.createEvent('HTMLEvents');
        _this._evtBlur.initEvent('blur', false, false);
        // no $apply() lag while editing
        grid.prepareCellForEdit.addHandler(function (s, e) {
            self._noApplyLag = true;
        });
        grid.cellEditEnded.addHandler(function (s, e) {
            // If column has no cell edit template, clear _editChar buffer.
            if (e.range.col < 0 || e.range.col < grid.columns.length &&
                !grid.columns[e.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)]) {
                self._editChar = null;
            }
            setTimeout(function () {
                self._noApplyLag = false;
            }, 300);
        });
        grid.beginningEdit.addHandler(function (s, e) {
            self._startingEditing = true;
        });
        grid.hostElement.addEventListener('keydown', function (e) {
            self._startingEditing = false;
        }, true);
        grid.hostElement.addEventListener('keypress', function (e) {
            var char = e.charCode > 32 ? String.fromCharCode(e.charCode) : null;
            // check also that it has been happened not in a nested grid
            if (char && wjcCore.closest(e.target, '.wj-flexgrid') === grid.hostElement) {
                // Grid's _KeyboardHandler may receive 'keypress' before or after this handler (observed at least in IE,
                // not clear why this happens). So both grid.activeEditor and _startingEditing (the latter is initialized in
                // beginningEdit and cleared in 'keydown') participate in detecting whether this char has initialized a cell
                // editing.
                if (!grid.activeEditor || self._startingEditing) {
                    self._editChar = char;
                }
                else if (self._editChar) {
                    self._editChar += char;
                }
            }
        }, true);
        grid.hostElement.addEventListener('compositionstart', function (e) {
            self._composing = true;
        }, true);
        grid.hostElement.addEventListener('compositionend', function (e) {
            self._composing = false;
        }, true);
        // If host component uses OnPush change detection, we need to markForCheck; otherwise,
        // cell template bindings will not be updated.
        grid.updatedView.addHandler(function () {
            if (_this._needsCdCheck) {
                _this._needsCdCheck = false;
                _this._gridCdRef.markForCheck();
            }
        }, _this);
        return _this;
    }
    DirectiveCellFactory.prototype.updateCell = function (panel, rowIndex, colIndex, cell, rng) {
        var _this = this;
        this._cellStampCounter = (this._cellStampCounter + 1) % 10000000;
        var cellStamp = cell[DirectiveCellFactory._cellStampProp] = this._cellStampCounter;
        // restore overflow for any cell
        if (cell.style.overflow) {
            cell.style.overflow = '';
        }
        var self = this, grid = panel.grid, editRange = grid.editRange, templateType, row = panel.rows[rowIndex], dataItem = row.dataItem, isGridCtx = false, needCellValue = false, isEdit = false, isCvGroup = false;
        // determine template type
        switch (panel.cellType) {
            case wjcGrid.CellType.Cell:
                if (editRange && editRange.row === rowIndex && editRange.col === colIndex) {
                    templateType = CellTemplateType.CellEdit;
                    needCellValue = isEdit = true;
                }
                else if (row instanceof wjcGrid.GroupRow) {
                    isCvGroup = dataItem instanceof wjcCore.CollectionViewGroup;
                    var isHierNonGroup = !(isCvGroup || row.hasChildren);
                    if (colIndex == panel.columns.firstVisibleIndex) {
                        templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.GroupHeader;
                    }
                    else {
                        templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.Group;
                        needCellValue = true;
                    }
                }
                else if (row instanceof wjcGrid._NewRowTemplate) {
                    templateType = CellTemplateType.NewCellTemplate;
                }
                else if (!((tryGetModuleWijmoGridDetail()) && (tryGetModuleWijmoGridDetail()).DetailRow &&
                    (row instanceof (tryGetModuleWijmoGridDetail()).DetailRow))) {
                    templateType = CellTemplateType.Cell;
                }
                break;
            case wjcGrid.CellType.ColumnHeader:
                templateType = CellTemplateType.ColumnHeader;
                break;
            case wjcGrid.CellType.RowHeader:
                templateType = grid.collectionView &&
                    grid.collectionView.currentEditItem === dataItem
                    ? CellTemplateType.RowHeaderEdit
                    : CellTemplateType.RowHeader;
                isGridCtx = true;
                break;
            case wjcGrid.CellType.TopLeft:
                templateType = CellTemplateType.TopLeft;
                isGridCtx = true;
                break;
            case wjcGrid.CellType.ColumnFooter:
                templateType = CellTemplateType.ColumnFooter;
                needCellValue = true;
                break;
            case wjcGrid.CellType.BottomLeft:
                templateType = CellTemplateType.BottomLeft;
                isGridCtx = true;
                break;
        }
        var isUpdated = false;
        if (templateType != null) {
            var col = (isCvGroup && templateType == CellTemplateType.GroupHeader ?
                grid.columns.getColumn(dataItem.groupDescription['propertyName']) :
                (colIndex >= 0 && colIndex < panel.columns.length ? panel.columns[colIndex] : null));
            if (col) {
                var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType), templContext = (isGridCtx ? grid : col)[templContextProp];
                // maintain template inheritance
                if (!templContext) {
                    if (templateType === CellTemplateType.RowHeaderEdit) {
                        templateType = CellTemplateType.RowHeader;
                        templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                        templContext = grid[templContextProp];
                    }
                    else if (templateType === CellTemplateType.Group || templateType === CellTemplateType.GroupHeader) {
                        if (!isCvGroup) {
                            templateType = CellTemplateType.Cell;
                            templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                            templContext = col[templContextProp];
                        }
                    }
                }
                if (templContext) {
                    // apply directive template and style
                    var isTpl = true, cellValue;
                    if (needCellValue) {
                        cellValue = panel.getCellData(rowIndex, colIndex, false);
                    }
                    // apply cell template
                    if (isTpl) {
                        isUpdated = true;
                        var measureAttr = cell.getAttribute(wjcGrid.FlexGrid._WJS_MEASURE), isMeasuring = measureAttr && measureAttr.toLowerCase() === 'true';
                        if (isEdit) {
                            this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, true);
                        }
                        // if this is false then we can't reuse previously cached scope and linked tree.
                        var cellContext_1 = (cell[templContextProp] || {}), isForeignCell = cellContext_1.column !== col || !cellContext_1.viewRef ||
                            cellContext_1.templateContextProperty !== templContextProp ||
                            cell.firstChild != cellContext_1.rootElement, isImeInput_1 = isEdit && this._composing && grid.imeEnabled;
                        var cellInfo_1;
                        if (isForeignCell) {
                            if (isEdit) {
                                var rootEl = cell.firstElementChild;
                                if (rootEl) {
                                    // set focus to cell, because hiding a focused element may move focus to a page body
                                    // that will force Grid to finish editing.
                                    if (!isImeInput_1) {
                                        cell.focus();
                                    }
                                    rootEl.style.display = 'none';
                                }
                            }
                            else {
                                cell.textContent = '';
                            }
                            this._doDisposeCell(cell);
                            var vrContext = {};
                            cellInfo_1 = this._setViewRefContext(vrContext, row, col, dataItem, cellValue, templContext.valuePaths);
                            var templInstance = templContext._instantiateTemplate(cell, vrContext);
                            cellContext_1.column = col;
                            cellContext_1.viewRef = templInstance.viewRef;
                            cellContext_1.rootElement = templInstance.rootElement;
                            cellContext_1.templateContextProperty = templContextProp;
                            cell[templContextProp] = cellContext_1;
                        }
                        else {
                            cellInfo_1 = this._setViewRefContext(cellContext_1.viewRef.context, row, col, dataItem, cellValue, templContext.valuePaths);
                        }
                        if (templContext.cellOverflow) {
                            cell.style.overflow = templContext.cellOverflow;
                        }
                        if (isMeasuring) {
                            //force local template 'cell' var values to be applied immediately
                            templContext.cdRef.detectChanges();
                        }
                        else if (templContext.autoSizeRows && !isImeInput_1) {
                            // increase row height if cell doesn't fit in the current row height.
                            setTimeout(function () {
                                // ignore the cell if it is already obsolete at this moment
                                if (cellStamp !== cell[DirectiveCellFactory._cellStampProp]) {
                                    return;
                                }
                                var cellHeight = cell.scrollHeight, panelRows = panel.rows, rowSpan = rng && rng.rowSpan || 1;
                                // TBD: it's not clear why we need (cellHeight - 1), but without it may get to an 
                                // infinite loop. It's not the issue in Ng2 Explorer.
                                if (rowIndex < panelRows.length &&
                                    (panelRows[rowIndex].renderHeight * rowSpan) < (cellHeight - 1)) {
                                    panelRows.defaultSize = cellHeight / rowSpan;
                                    if (isEdit) {
                                        var isFullEdit = self._isFullEdit();
                                        grid.refresh();
                                        grid.startEditing(isFullEdit);
                                        return;
                                    }
                                }
                                else if (isEdit) {
                                    _this._initEditInput(cellContext_1, templContext, null);
                                }
                                ;
                            }, 0);
                        }
                        else if (isEdit) {
                            setTimeout(function () {
                                if (isImeInput_1) {
                                    _this._initImeEditInput(cellContext_1, templContext);
                                }
                                else {
                                    _this._initEditInput(cellContext_1, templContext, null);
                                }
                            }, 0);
                        }
                        if (isEdit) {
                            self._cellEditorVars = cellInfo_1.localVars;
                            var editEndingEH = function (s, e) {
                                grid.cellEditEnding.removeHandler(editEndingEH);
                                // Move focus out of the current input element, in order to let it to save
                                // its value (necessary for controls like InputDate that can't update value immediately
                                // as user typing).
                                // We do it via event emulation, instead of moving focus to another element,
                                // because in IE an element doesn't fit in time to receive the 'blur' event.
                                if (!e.stayInEditMode) {
                                    var activeElement = wjcCore.getActiveElement();
                                    if (activeElement) {
                                        activeElement.dispatchEvent(self._evtBlur);
                                    }
                                    // We need to move focus nevertheless, because without this grid may lose focus at all in IE.
                                    cell.focus();
                                }
                                self._triggerEditorEvents(cell);
                                if (!(e.cancel || e.stayInEditMode)) {
                                    //e.cancel = true;
                                    var cellVar = cellInfo_1.localVars, 
                                    //newVal = cellVar.value,
                                    bindNames = Object.getOwnPropertyNames(cellInfo_1.bindings);
                                    // set cell value
                                    //panel.grid.setCellData(rowIndex, colIndex, newVal);
                                    // set values for valuePaths
                                    for (var _i = 0, bindNames_1 = bindNames; _i < bindNames_1.length; _i++) {
                                        var curName = bindNames_1[_i];
                                        cellInfo_1.bindings[curName].setValue(cellVar, cellInfo_1.localVars.values[curName]);
                                    }
                                }
                                // close all open dropdowns 
                                var dropDowns = cell.querySelectorAll('.wj-dropdown');
                                [].forEach.call(dropDowns, function (el) {
                                    var ctrl = wjcCore.Control.getControl(el);
                                    if (ctrl && (tryGetModuleWijmoInput()) && ctrl instanceof (tryGetModuleWijmoInput()).DropDown) {
                                        ctrl.isDroppedDown = false;
                                    }
                                });
                            };
                            var editEndedEH_1 = function (s, e) {
                                grid.cellEditEnded.removeHandler(editEndedEH_1);
                                self._cellEditorVars = null;
                            };
                            // subscribe the handler to the cellEditEnding event
                            grid.cellEditEnding.addHandler(editEndingEH);
                            grid.cellEditEnded.addHandler(editEndedEH_1);
                        }
                        else {
                            this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, false);
                        }
                    }
                }
            }
        }
        if (!isUpdated) {
            this._doDisposeCell(cell);
            this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng);
        }
    };
    DirectiveCellFactory.prototype.getEditorValue = function (g) {
        if (this._cellEditorVars) {
            // trigger all pending async events in the child Wijmo controls immediately
            var editRange = g.editRange;
            if (editRange && editRange.isValid) {
                this._triggerEditorEvents(g.cells.getCellElement(editRange.row, editRange.col));
            }
            return this._cellEditorVars.value;
        }
        else {
            return _super.prototype.getEditorValue.call(this, g);
        }
    };
    DirectiveCellFactory.prototype.disposeCell = function (cell) {
        this._doDisposeCell(cell);
    };
    DirectiveCellFactory.prototype._doDisposeCell = function (cell) {
        var ttm = DirectiveCellFactory._templateTypes;
        for (var i = 0; i < ttm.length; i++) {
            var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[ttm[i]]), cellContext = (cell[templContextProp]);
            if (cellContext && cellContext.viewRef) {
                var templateOwner = cellContext.column || this.grid, templateContext = templateOwner[templContextProp];
                if (templateContext) {
                    var viewIdx = templateContext.viewContainerRef.indexOf(cellContext.viewRef);
                    if (viewIdx > -1) {
                        templateContext.viewContainerRef.remove(viewIdx);
                    }
                }
                cellContext.viewRef = null;
                cellContext.rootElement = null;
                cellContext.column = null;
                cellContext.templateContextProperty = null;
                cell[templContextProp] = null;
            }
        }
    };
    DirectiveCellFactory.prototype._setViewRefContext = function (context, row, col, dataItem, cellValue, valuePaths) {
        this._needsCdCheck = true;
        context.row = row;
        context.col = col;
        context.item = dataItem;
        var values = {}, 
        //cellCtx = { row: row, col: col, item: dataItem, value: cellValue, values: values },
        cellCtx = context.cell || {}, bindings = {}, ret = { localVars: cellCtx, bindings: bindings };
        cellCtx.row = row;
        cellCtx.col = col;
        cellCtx.item = dataItem;
        cellCtx.value = cellValue;
        cellCtx.values = values;
        if (valuePaths) {
            var pathNames = Object.getOwnPropertyNames(valuePaths);
            for (var _i = 0, pathNames_1 = pathNames; _i < pathNames_1.length; _i++) {
                var pName = pathNames_1[_i];
                var binding = new wjcCore.Binding(valuePaths[pName]);
                bindings[pName] = binding;
                values[pName] = binding.getValue(cellCtx);
            }
        }
        if (context.cell !== cellCtx) {
            context.cell = cellCtx;
        }
        return ret;
    };
    // finds a first input element in the edit template and initializes it with a data typed by keyboard
    DirectiveCellFactory.prototype._initEditInput = function (cellContext, templContext, initialValue) {
        var _this = this;
        this._setFullEdit(templContext);
        var input = this._findInitialInput(cellContext);
        if (input) {
            var inpFocusEh = function () {
                input.removeEventListener('focus', inpFocusEh);
                //setTimeout(() => {
                // at this moment control had to select the whole content
                setTimeout(function () {
                    var value = initialValue != null ? initialValue : _this._editChar;
                    if (value) {
                        //let caretPos = input.selectionStart + value.length;
                        //console.log(`caretPos = ${caretPos}; old value = "${input.value}"; new value = ${value}`);
                        input.value = value;
                        _this._editChar = null;
                        //input.setSelectionRange(value.length, value.length);
                        DirectiveCellFactory._setSelectionRange(input, value.length, value.length);
                        input.dispatchEvent(_this._evtInput);
                        // It seems that all the selection logic is not needed anymore, controls
                        // can set their cursor position by themselves.
                        //setTimeout(() => {
                        //    // at this moment control had to process 'input' event,
                        //    // even if it happens asynchronously 
                        //    setTimeout(() => {
                        //        //TBD: should use wijmo.setSelectionRange which needs adaption to HTMLTextAreaElement
                        //        //wijmo.setSelectionRange(input,
                        //        //    Math.min(caretPos, input.value.length), input.value.length);
                        //        DirectiveCellFactory._setSelectionRange(input,
                        //            Math.min(caretPos, input.value.length), input.value.length);
                        //    }, 0);
                        //}, 0);
                    }
                }, DirectiveCellFactory._FOCUS_INTERVAL);
                //}, 0);
            };
            input.addEventListener('focus', inpFocusEh);
            input.focus();
        }
    };
    DirectiveCellFactory.prototype._initImeEditInput = function (cellContext, templContext) {
        var _this = this;
        var imeEditor = wjcCore.getActiveElement();
        if (imeEditor && (imeEditor instanceof HTMLInputElement) && wjcCore.hasClass(imeEditor, 'wj-grid-ime')) {
            var compEndEh_1 = function (e) {
                imeEditor.removeEventListener('compositionend', compEndEh_1);
                wjcCore.setCss(imeEditor, wjcGrid._ImeHandler._cssHidden);
                _this._initEditInput(cellContext, templContext, imeEditor.value);
            };
            imeEditor.addEventListener('compositionend', compEndEh_1);
            // position/size the editor
            var templateInput = this._findInitialInput(cellContext);
            if (templateInput) {
                var tRect = templateInput.getBoundingClientRect(), imeRect = imeEditor.getBoundingClientRect(), imeStyle = window.getComputedStyle(imeEditor), imeStyleLeft = parseFloat(imeStyle.left), imeStyleTop = parseFloat(imeStyle.top);
                wjcCore.setCss(imeEditor, {
                    left: (imeStyleLeft + tRect.left - imeRect.left) + 'px',
                    top: (imeStyleTop + tRect.top - imeRect.top) + 'px',
                    width: tRect.width + 'px',
                    height: tRect.height + 'px'
                });
            }
        }
    };
    DirectiveCellFactory.prototype._findInitialInput = function (cellContext) {
        var inputs = cellContext && cellContext.rootElement
            && cellContext.rootElement.querySelectorAll('input,textarea');
        if (inputs) {
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i], inpSt = window.getComputedStyle(input);
                if (inpSt.display !== 'none' && inpSt.visibility === 'visible') {
                    return input;
                }
            }
        }
        return null;
    };
    DirectiveCellFactory._setSelectionRange = function (e, start, end) {
        if (end === void 0) { end = start; }
        //e = asType(e, HTMLInputElement);
        if (wjcCore.contains(document.body, e) && !e.disabled && e.style.display != 'none') {
            try {
                // use 'backward' to keep the start in view (but not in Edge! TFS 228053)
                e.setSelectionRange(wjcCore.asNumber(start), wjcCore.asNumber(end), wjcCore.isIE() ? null : 'backward');
                // focus needed in Chrome (TFS 124102, 142672) 
                // and after setRange (TFS 228053)
                e.focus();
            }
            catch (x) { }
        }
    };
    DirectiveCellFactory.prototype._triggerEditorEvents = function (editCell) {
        if (editCell) {
            var cellCtrlElements = editCell.querySelectorAll('.wj-control');
            for (var i = 0; i < cellCtrlElements.length; i++) {
                var curCtrlElement = cellCtrlElements[i], ctrl = wjcCore.Control.getControl(curCtrlElement);
                if (ctrl) {
                    var behaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getBehavior(ctrl);
                    if (behaviour) {
                        behaviour.flushPendingEvents();
                    }
                }
            }
        }
    };
    DirectiveCellFactory.prototype._isFullEdit = function () {
        var grid = this.grid;
        return !grid.activeEditor || grid._edtHdl._fullEdit;
    };
    DirectiveCellFactory.prototype._setFullEdit = function (templContext) {
        var grid = this.grid;
        if (templContext.forceFullEdit && grid.activeEditor) {
            grid._edtHdl._fullEdit = true;
        }
    };
    DirectiveCellFactory._cellStampProp = '__wjCellStamp';
    DirectiveCellFactory._FOCUS_INTERVAL = wjcCore.Control._FOCUS_INTERVAL + 20;
    return DirectiveCellFactory;
}(wjcGrid.CellFactory));
var moduleExports = [
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridCellTemplate
];
var WjGridModule = /** @class */ (function () {
    function WjGridModule() {
    }
    WjGridModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjGridModule.ctorParameters = function () { return []; };
    return WjGridModule;
}());
exports.WjGridModule = WjGridModule;
//# sourceMappingURL=wijmo.angular2.grid.js.map