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
var wjcCore = require("wijmo/wijmo");
function tryGetModuleWijmoInput() {
    var m1;
    return (m1 = window['wijmo']) && m1['input'];
}
var wjcSelf = require("wijmo/wijmo.grid");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = wjcSelf;
wjcCore.culture.FlexGrid = window['wijmo'].culture.FlexGrid || {
    groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} items)'
};
'use strict';
var HeadersVisibility;
(function (HeadersVisibility) {
    HeadersVisibility[HeadersVisibility["None"] = 0] = "None";
    HeadersVisibility[HeadersVisibility["Column"] = 1] = "Column";
    HeadersVisibility[HeadersVisibility["Row"] = 2] = "Row";
    HeadersVisibility[HeadersVisibility["All"] = 3] = "All";
})(HeadersVisibility = exports.HeadersVisibility || (exports.HeadersVisibility = {}));
var FlexGrid = (function (_super) {
    __extends(FlexGrid, _super);
    function FlexGrid(element, options) {
        var _this = _super.call(this, element, null, true) || this;
        _this._szClient = new wjcCore.Size(0, 0);
        _this._ptScrl = new wjcCore.Point(0, 0);
        _this._cellPadding = 3;
        _this._clipToScreen = false;
        _this._autoGenCols = true;
        _this._autoClipboard = true;
        _this._readOnly = false;
        _this._indent = 14;
        _this._autoSizeMode = AutoSizeMode.Both;
        _this._hdrVis = HeadersVisibility.All;
        _this._alSorting = true;
        _this._alAddNew = false;
        _this._alDelete = false;
        _this._alResizing = AllowResizing.Columns;
        _this._alDragging = AllowDragging.Columns;
        _this._alMerging = AllowMerging.None;
        _this._ssHdr = HeadersVisibility.None;
        _this._shSort = true;
        _this._shGroups = true;
        _this._shAlt = true;
        _this._shErr = true;
        _this._shDropDown = true;
        _this._valEdt = true;
        _this._deferResizing = false;
        _this._pSel = true;
        _this._pOutline = true;
        _this._vt = 0;
        _this.itemsSourceChanging = new wjcCore.Event();
        _this.itemsSourceChanged = new wjcCore.Event();
        _this.scrollPositionChanged = new wjcCore.Event();
        _this.selectionChanging = new wjcCore.Event();
        _this.selectionChanged = new wjcCore.Event();
        _this.loadingRows = new wjcCore.Event();
        _this.loadedRows = new wjcCore.Event();
        _this.updatingLayout = new wjcCore.Event();
        _this.updatedLayout = new wjcCore.Event();
        _this.resizingColumn = new wjcCore.Event();
        _this.resizedColumn = new wjcCore.Event();
        _this.autoSizingColumn = new wjcCore.Event();
        _this.autoSizedColumn = new wjcCore.Event();
        _this.draggingColumn = new wjcCore.Event();
        _this.draggingColumnOver = new wjcCore.Event();
        _this.draggedColumn = new wjcCore.Event();
        _this.resizingRow = new wjcCore.Event();
        _this.resizedRow = new wjcCore.Event();
        _this.autoSizingRow = new wjcCore.Event();
        _this.autoSizedRow = new wjcCore.Event();
        _this.draggingRow = new wjcCore.Event();
        _this.draggingRowOver = new wjcCore.Event();
        _this.draggedRow = new wjcCore.Event();
        _this.groupCollapsedChanging = new wjcCore.Event();
        _this.groupCollapsedChanged = new wjcCore.Event();
        _this.sortingColumn = new wjcCore.Event();
        _this.sortedColumn = new wjcCore.Event();
        _this.beginningEdit = new wjcCore.Event();
        _this.prepareCellForEdit = new wjcCore.Event();
        _this.cellEditEnding = new wjcCore.Event();
        _this.cellEditEnded = new wjcCore.Event();
        _this.rowEditStarting = new wjcCore.Event();
        _this.rowEditStarted = new wjcCore.Event();
        _this.rowEditEnding = new wjcCore.Event();
        _this.rowEditEnded = new wjcCore.Event();
        _this.rowAdded = new wjcCore.Event();
        _this.deletingRow = new wjcCore.Event();
        _this.deletedRow = new wjcCore.Event();
        _this.copying = new wjcCore.Event();
        _this.copied = new wjcCore.Event();
        _this.pasting = new wjcCore.Event();
        _this.pasted = new wjcCore.Event();
        _this.pastingCell = new wjcCore.Event();
        _this.pastedCell = new wjcCore.Event();
        _this.formatItem = new wjcCore.Event();
        _this.updatingView = new wjcCore.Event();
        _this.updatedView = new wjcCore.Event();
        _this._mappedColumns = null;
        var host = _this.hostElement;
        if (wjcCore.isIE()) {
            host.style.borderRadius = '0px';
        }
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-flexgrid wj-content', tpl, {
            _root: 'root',
            _eSz: 'sz',
            _eCt: 'cells',
            _fCt: 'fcells',
            _eTL: 'tl',
            _eBL: 'bl',
            _eCHdr: 'ch',
            _eRHdr: 'rh',
            _eCFtr: 'cf',
            _eTLCt: 'tlcells',
            _eBLCt: 'blcells',
            _eCHdrCt: 'chcells',
            _eCFtrCt: 'cfcells',
            _eRHdrCt: 'rhcells',
            _eMarquee: 'marquee',
            _eFocus: 'focus'
        });
        _this._tabIndex = host.tabIndex;
        host.tabIndex = -1;
        var defRowHei = _this._getDefaultRowHeight();
        _this.deferUpdate(function () {
            _this._rows = new RowCollection(_this, defRowHei);
            _this._cols = new ColumnCollection(_this, defRowHei * 4);
            _this._hdrRows = new RowCollection(_this, defRowHei);
            _this._hdrCols = new ColumnCollection(_this, Math.round(defRowHei * 1.25));
            _this._ftrRows = new RowCollection(_this, defRowHei);
            _this._gpTL = new GridPanel(_this, CellType.TopLeft, _this._hdrRows, _this._hdrCols, _this._eTLCt);
            _this._gpCHdr = new GridPanel(_this, CellType.ColumnHeader, _this._hdrRows, _this._cols, _this._eCHdrCt);
            _this._gpRHdr = new GridPanel(_this, CellType.RowHeader, _this._rows, _this._hdrCols, _this._eRHdrCt);
            _this._gpCells = new GridPanel(_this, CellType.Cell, _this._rows, _this._cols, _this._eCt);
            _this._gpBL = new GridPanel(_this, CellType.BottomLeft, _this._ftrRows, _this._hdrCols, _this._eBLCt);
            _this._gpCFtr = new GridPanel(_this, CellType.ColumnFooter, _this._ftrRows, _this._cols, _this._eCFtrCt);
            _this._hdrRows.push(new Row());
            _this._hdrCols.push(new Column());
            _this._hdrCols[0].align = 'center';
            _this._cf = new CellFactory();
            _this._keyHdl = new _KeyboardHandler(_this);
            _this._mouseHdl = new _MouseHandler(_this);
            _this._edtHdl = new _EditHandler(_this);
            _this._selHdl = new _SelectionHandler(_this);
            _this._addHdl = new _AddNewHandler(_this);
            _this._mrgMgr = new MergeManager(_this);
            _this._bndSortConverter = _this._sortConverter.bind(_this);
            _this._bndScroll = _this._scroll.bind(_this);
            wjcCore.setAttribute(_this.cells.hostElement, 'role', 'grid', true);
            _this.selectionMode = SelectionMode.CellRange;
            _this.initialize(options);
        });
        _this.addEventListener(_this._root, 'scroll', function (e) {
            if (_this._updateScrollPosition()) {
                _this.finishEditing();
                _this._updateContent(true);
            }
        });
        _this.addEventListener(host, 'focus', function (e) {
            if (host.tabIndex > -1) {
                var target = e.target;
                if (target instanceof HTMLElement && target.tabIndex < 0) {
                    _this._setFocus(true);
                    return;
                }
            }
        }, true);
        return _this;
    }
    FlexGrid.prototype._handleResize = function () {
        this._rcBounds = null;
        _super.prototype._handleResize.call(this);
    };
    Object.defineProperty(FlexGrid.prototype, "headersVisibility", {
        get: function () {
            return this._hdrVis;
        },
        set: function (value) {
            if (value != this._hdrVis) {
                this._hdrVis = wjcCore.asEnum(value, HeadersVisibility);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "stickyHeaders", {
        get: function () {
            return this._stickyHdr;
        },
        set: function (value) {
            if (value != this._stickyHdr) {
                this._stickyHdr = wjcCore.asBoolean(value);
                this._updateStickyHeaders();
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "preserveSelectedState", {
        get: function () {
            return this._pSel;
        },
        set: function (value) {
            this._pSel = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "preserveOutlineState", {
        get: function () {
            return this._pOutline;
        },
        set: function (value) {
            this._pOutline = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "virtualizationThreshold", {
        get: function () {
            return this._vt;
        },
        set: function (value) {
            this._vt = wjcCore.asNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "autoGenerateColumns", {
        get: function () {
            return this._autoGenCols;
        },
        set: function (value) {
            this._autoGenCols = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "autoClipboard", {
        get: function () {
            return this._autoClipboard;
        },
        set: function (value) {
            this._autoClipboard = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "columnLayout", {
        get: function () {
            var props = FlexGrid._getSerializableProperties(Column), defs = new Column(), proxyCols = [];
            for (var i = 0; i < this.columns.length; i++) {
                var col = this.columns[i], proxyCol = {};
                for (var j = 0; j < props.length; j++) {
                    var prop = props[j], value = col[prop];
                    if (value != defs[prop] && wjcCore.isPrimitive(value) && prop != 'size') {
                        proxyCol[prop] = value;
                    }
                }
                proxyCols.push(proxyCol);
            }
            return JSON.stringify({ columns: proxyCols });
        },
        set: function (value) {
            var colOptions = JSON.parse(wjcCore.asString(value));
            if (!colOptions || colOptions.columns == null) {
                throw 'Invalid columnLayout data.';
            }
            this.columns.clear();
            this.initialize(colOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "isReadOnly", {
        get: function () {
            return this._readOnly;
        },
        set: function (value) {
            if (value != this._readOnly) {
                this._readOnly = wjcCore.asBoolean(value);
                this.finishEditing();
                this.invalidate(true);
                this._addHdl.updateNewRowTemplate();
                wjcCore.toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
                this._setAria('readonly', this.isReadOnly ? 'true' : null);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "imeEnabled", {
        get: function () {
            return this._imeHdl != null;
        },
        set: function (value) {
            if (value != this.imeEnabled) {
                if (this._imeHdl) {
                    this._imeHdl.dispose();
                    this._imeHdl = null;
                }
                if (value) {
                    this._imeHdl = new _ImeHandler(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "allowResizing", {
        get: function () {
            return this._alResizing;
        },
        set: function (value) {
            this._alResizing = wjcCore.asEnum(value, AllowResizing);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "deferResizing", {
        get: function () {
            return this._deferResizing;
        },
        set: function (value) {
            this._deferResizing = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "autoSizeMode", {
        get: function () {
            return this._autoSizeMode;
        },
        set: function (value) {
            this._autoSizeMode = wjcCore.asEnum(value, AutoSizeMode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "quickAutoSize", {
        get: function () {
            return this._quickSize;
        },
        set: function (value) {
            this._quickSize = wjcCore.asBoolean(value, true);
        },
        enumerable: true,
        configurable: true
    });
    FlexGrid.prototype._getQuickAutoSize = function () {
        return wjcCore.isBoolean(this._quickSize)
            ? this._quickSize
            : !this.formatItem.hasHandlers && this.itemFormatter == null;
    };
    Object.defineProperty(FlexGrid.prototype, "allowSorting", {
        get: function () {
            return this._alSorting;
        },
        set: function (value) {
            this._alSorting = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "allowAddNew", {
        get: function () {
            return this._alAddNew;
        },
        set: function (value) {
            if (value != this._alAddNew) {
                this._alAddNew = wjcCore.asBoolean(value);
                this._addHdl.updateNewRowTemplate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "newRowAtTop", {
        get: function () {
            return this._addHdl.newRowAtTop;
        },
        set: function (value) {
            this._addHdl.newRowAtTop = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "allowDelete", {
        get: function () {
            return this._alDelete;
        },
        set: function (value) {
            if (value != this._alDelete) {
                this._alDelete = wjcCore.asBoolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "allowMerging", {
        get: function () {
            return this._alMerging;
        },
        set: function (value) {
            if (value != this._alMerging) {
                this._alMerging = wjcCore.asEnum(value, AllowMerging);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "showSelectedHeaders", {
        get: function () {
            return this._ssHdr;
        },
        set: function (value) {
            if (value != this._ssHdr) {
                this._ssHdr = wjcCore.asEnum(value, HeadersVisibility);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "showMarquee", {
        get: function () {
            return !this._eMarquee.style.display;
        },
        set: function (value) {
            if (value != this.showMarquee) {
                var s = this._eMarquee.style;
                s.visibility = 'collapse';
                s.display = wjcCore.asBoolean(value) ? '' : 'none';
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "showSort", {
        get: function () {
            return this._shSort;
        },
        set: function (value) {
            if (value != this._shSort) {
                this._shSort = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "showGroups", {
        get: function () {
            return this._shGroups;
        },
        set: function (value) {
            if (value != this._shGroups) {
                this._shGroups = wjcCore.asBoolean(value);
                this._bindGrid(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "showAlternatingRows", {
        get: function () {
            return this._shAlt;
        },
        set: function (value) {
            if (value != this._shAlt) {
                this._shAlt = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "showErrors", {
        get: function () {
            return this._shErr;
        },
        set: function (value) {
            if (value != this._shErr) {
                this._clearCells();
                this._shErr = wjcCore.asBoolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "itemValidator", {
        get: function () {
            return this._itemValidator;
        },
        set: function (value) {
            if (value != this.itemValidator) {
                this._itemValidator = wjcCore.asFunction(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "validateEdits", {
        get: function () {
            return this._valEdt;
        },
        set: function (value) {
            this._valEdt = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "groupHeaderFormat", {
        get: function () {
            return this._gHdrFmt;
        },
        set: function (value) {
            if (value != this._gHdrFmt) {
                this._gHdrFmt = wjcCore.asString(value);
                this._bindGrid(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "allowDragging", {
        get: function () {
            return this._alDragging;
        },
        set: function (value) {
            if (value != this._alDragging) {
                this._alDragging = wjcCore.asEnum(value, AllowDragging);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "itemsSource", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (value != this._items) {
                var e = new wjcCore.CancelEventArgs();
                if (this.onItemsSourceChanging(e)) {
                    if (this._cv) {
                        var view = wjcCore.tryCast(this._cv, wjcCore.CollectionView);
                        if (view && view.sortConverter == this._bndSortConverter) {
                            view.sortConverter = null;
                        }
                        this._cv.currentChanged.removeHandler(this._cvCurrentChanged, this);
                        this._cv.collectionChanged.removeHandler(this._cvCollectionChanged, this);
                        this._cv = null;
                    }
                    this._items = value;
                    this._cv = this._getCollectionView(value);
                    this._lastCount = 0;
                    if (this._cv) {
                        this._cv.currentChanged.addHandler(this._cvCurrentChanged, this);
                        this._cv.collectionChanged.addHandler(this._cvCollectionChanged, this);
                        var view = wjcCore.tryCast(this._cv, wjcCore.CollectionView);
                        if (view && !view.sortConverter) {
                            view.sortConverter = this._bndSortConverter;
                        }
                    }
                    this._bindGrid(true);
                    var sm = SelectionMode;
                    if (this.selectionMode == sm.ListBox) {
                        this.selectionMode = sm.CellRange;
                        this.selectionMode = sm.ListBox;
                    }
                    this.onItemsSourceChanged(e);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "collectionView", {
        get: function () {
            return this._cv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "editableCollectionView", {
        get: function () {
            return wjcCore.tryCast(this._cv, 'IEditableCollectionView');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "childItemsPath", {
        get: function () {
            return this._childItemsPath;
        },
        set: function (value) {
            if (value != this._childItemsPath) {
                wjcCore.assert(value == null || wjcCore.isArray(value) || wjcCore.isString(value), 'childItemsPath should be an array or a string.');
                this._childItemsPath = value;
                this._bindGrid(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "rowHeaderPath", {
        get: function () {
            return this._rowHdrPath ? this._rowHdrPath.path : null;
        },
        set: function (value) {
            if (value != this.rowHeaderPath) {
                value = wjcCore.asString(value);
                this._rowHdrPath = value ? new wjcCore.Binding(value) : null;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "cells", {
        get: function () {
            return this._gpCells;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "columnHeaders", {
        get: function () {
            return this._gpCHdr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "columnFooters", {
        get: function () {
            return this._gpCFtr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "rowHeaders", {
        get: function () {
            return this._gpRHdr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "topLeftCells", {
        get: function () {
            return this._gpTL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "bottomLeftCells", {
        get: function () {
            return this._gpBL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "columns", {
        get: function () {
            return this._cols;
        },
        enumerable: true,
        configurable: true
    });
    FlexGrid.prototype.getColumn = function (name) {
        return this.columns.getColumn(name);
    };
    Object.defineProperty(FlexGrid.prototype, "frozenRows", {
        get: function () {
            return this.rows.frozen;
        },
        set: function (value) {
            this.rows.frozen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "frozenColumns", {
        get: function () {
            return this.columns.frozen;
        },
        set: function (value) {
            this.columns.frozen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "cloneFrozenCells", {
        get: function () {
            return this._fzClone;
        },
        set: function (value) {
            if (value != this.cloneFrozenCells) {
                this._fzClone = wjcCore.asBoolean(value, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "sortRowIndex", {
        get: function () {
            return this._sortRowIndex;
        },
        set: function (value) {
            if (value != this._sortRowIndex) {
                this._sortRowIndex = wjcCore.asNumber(value, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "scrollPosition", {
        get: function () {
            return this._ptScrl.clone();
        },
        set: function (pt) {
            var root = this._root, left = -pt.x;
            if (this.rightToLeft) {
                switch (FlexGrid._getRtlMode()) {
                    case 'rev':
                        left = (root.scrollWidth - root.clientWidth) + pt.x;
                        break;
                    case 'neg':
                        left = pt.x;
                        break;
                    default:
                        left = -pt.x;
                        break;
                }
            }
            root.scrollLeft = left;
            root.scrollTop = -pt.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "clientSize", {
        get: function () {
            return this._szClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "controlRect", {
        get: function () {
            if (!this._rcBounds) {
                this._rcBounds = wjcCore.getElementRect(this._root);
            }
            return this._rcBounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "scrollSize", {
        get: function () {
            return new wjcCore.Size(this._gpCells.width, this._heightBrowser);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "viewRange", {
        get: function () {
            return this._gpCells.viewRange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "cellFactory", {
        get: function () {
            return this._cf;
        },
        set: function (value) {
            if (value != this._cf) {
                this._clearCells();
                this._cf = wjcCore.asType(value, CellFactory, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "itemFormatter", {
        get: function () {
            return this._itemFormatter;
        },
        set: function (value) {
            if (value != this._itemFormatter) {
                this._clearCells();
                this._itemFormatter = wjcCore.asFunction(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    FlexGrid.prototype.canEditCell = function (r, c) {
        return this._edtHdl._allowEditing(r, c);
    };
    FlexGrid.prototype.getCellData = function (r, c, formatted) {
        return this.cells.getCellData(r, c, formatted);
    };
    FlexGrid.prototype.getCellBoundingRect = function (r, c, raw) {
        return this.cells.getCellBoundingRect(r, c, raw);
    };
    FlexGrid.prototype.setCellData = function (r, c, value, coerce, invalidate) {
        if (coerce === void 0) { coerce = true; }
        if (invalidate === void 0) { invalidate = true; }
        return this.cells.setCellData(r, c, value, coerce, invalidate);
    };
    FlexGrid.prototype.hitTest = function (pt, y) {
        if (wjcCore.isNumber(pt) && wjcCore.isNumber(y)) {
            pt = new wjcCore.Point(pt, y);
        }
        if (wjcCore.isBoolean(y) && y) {
            this._rcBounds = null;
        }
        return new HitTestInfo(this, pt);
    };
    FlexGrid.prototype.getClipString = function (rng) {
        return this._edtHdl.getClipString(rng);
    };
    FlexGrid.prototype.setClipString = function (text, rng) {
        this._edtHdl.setClipString(text, rng);
    };
    FlexGrid.prototype.focus = function () {
        this._setFocus(false);
    };
    FlexGrid.prototype.dispose = function () {
        this.finishEditing(true);
        this.itemsSource = null;
        _super.prototype.dispose.call(this);
    };
    FlexGrid.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        this.finishEditing();
        if (fullUpdate) {
            this._updateColumnTypes();
            this.scrollPosition = this._ptScrl;
        }
        this.refreshCells(fullUpdate);
    };
    FlexGrid.prototype.refreshCells = function (fullUpdate, recycle, state) {
        if (!this.isUpdating) {
            if (fullUpdate) {
                this._updateLayout();
            }
            else {
                this._updateContent(recycle, state);
            }
        }
    };
    FlexGrid.prototype.autoSizeColumn = function (c, header, extra) {
        if (header === void 0) { header = false; }
        if (extra === void 0) { extra = 4; }
        this.autoSizeColumns(c, c, header, extra);
    };
    FlexGrid.prototype.autoSizeColumns = function (firstColumn, lastColumn, header, extra) {
        var _this = this;
        if (header === void 0) { header = false; }
        if (extra === void 0) { extra = 4; }
        var max = 0, pHdr = header ? this.topLeftCells : this.columnHeaders, pFtr = header ? this.bottomLeftCells : this.columnFooters, pCells = header ? this.rowHeaders : this.cells, rowRange = this.viewRange;
        firstColumn = firstColumn == null ? 0 : wjcCore.asInt(firstColumn);
        lastColumn = lastColumn == null ? pCells.columns.length - 1 : wjcCore.asInt(lastColumn);
        rowRange.row = Math.max(0, rowRange.row - 1000);
        rowRange.row2 = Math.min(rowRange.row2 + 1000, this.rows.length - 1);
        if (this.finishEditing()) {
            this.columns.deferUpdate(function () {
                wjcCore.setCss(_this._eCt, { width: _this._gpCells.width });
                var eMeasure = document.createElement('div');
                eMeasure.setAttribute(FlexGrid._WJS_MEASURE, 'true');
                eMeasure.style.visibility = 'hidden';
                pCells.hostElement.parentElement.appendChild(eMeasure);
                var ctx = _this._getCanvasContext();
                for (var c = firstColumn; c <= lastColumn && c > -1 && c < pCells.columns.length; c++) {
                    var col = pCells.columns[c];
                    if (col.isVisible) {
                        max = 0;
                        if (_this.autoSizeMode & AutoSizeMode.Headers) {
                            for (var r = 0; r < pHdr.rows.length; r++) {
                                if (pHdr.rows[r].isVisible) {
                                    var w = _this._getDesiredWidth(pHdr, r, c, eMeasure);
                                    max = Math.max(max, w);
                                }
                            }
                            for (var r = 0; r < pFtr.rows.length; r++) {
                                if (pFtr.rows[r].isVisible) {
                                    var w = _this._getDesiredWidth(pFtr, r, c, eMeasure);
                                    max = Math.max(max, w);
                                }
                            }
                        }
                        if (_this.autoSizeMode & AutoSizeMode.Cells) {
                            if (rowRange.isValid) {
                                if (col._getQuickAutoSize()) {
                                    var r = _this._getWidestRow(pCells, rowRange, c, ctx), w = _this._getDesiredWidth(pCells, r, c, eMeasure);
                                    max = Math.max(max, w);
                                }
                                else {
                                    for (var r = rowRange.row; r <= rowRange.row2 && r < pCells.rows.length; r++) {
                                        if (pCells.rows[r].isVisible) {
                                            var w = _this._getDesiredWidth(pCells, r, c, eMeasure);
                                            max = Math.max(max, w);
                                        }
                                    }
                                }
                            }
                        }
                        col.width = max + extra + 2;
                    }
                }
                _this.cellFactory.disposeCell(eMeasure);
                wjcCore.removeChild(eMeasure);
            });
        }
    };
    FlexGrid.prototype.autoSizeRow = function (r, header, extra) {
        if (header === void 0) { header = false; }
        if (extra === void 0) { extra = 0; }
        this.autoSizeRows(r, r, header, extra);
    };
    FlexGrid.prototype.autoSizeRows = function (firstRow, lastRow, header, extra) {
        var _this = this;
        if (header === void 0) { header = false; }
        if (extra === void 0) { extra = 0; }
        var max = 0, pHdr = header ? this.topLeftCells : this.rowHeaders, pCells = header ? this.columnHeaders : this.cells;
        header = wjcCore.asBoolean(header);
        extra = wjcCore.asNumber(extra);
        firstRow = firstRow == null ? 0 : wjcCore.asInt(firstRow);
        lastRow = lastRow == null ? pCells.rows.length - 1 : wjcCore.asInt(lastRow);
        if (this.finishEditing()) {
            this.rows.deferUpdate(function () {
                wjcCore.setCss(_this._eCt, { width: _this._gpCells.width });
                var eMeasure = document.createElement('div');
                eMeasure.setAttribute(FlexGrid._WJS_MEASURE, 'true');
                eMeasure.style.visibility = 'hidden';
                pCells.hostElement.appendChild(eMeasure);
                var cache = {};
                for (var r = firstRow; r <= lastRow && r > -1 && r < pCells.rows.length; r++) {
                    var row = pCells.rows[r];
                    if (row.isVisible) {
                        max = 0;
                        if (_this.autoSizeMode & AutoSizeMode.Headers) {
                            for (var c = 0; c < pHdr.columns.length; c++) {
                                if (pHdr.columns[c].isVisible > 0) {
                                    var h = _this._getDesiredHeight(pHdr, r, c, eMeasure);
                                    max = Math.max(max, h);
                                }
                            }
                        }
                        if (_this.autoSizeMode & AutoSizeMode.Cells) {
                            var first = true;
                            for (var c = 0; c < pCells.columns.length; c++) {
                                var col = pCells.columns[c], quick = col._getQuickAutoSize();
                                if (col.isVisible) {
                                    if (first || col.wordWrap || col.cssClass || col.dataType == wjcCore.DataType.Boolean || !quick) {
                                        var h = void 0;
                                        if (quick) {
                                            var key = {
                                                col: c,
                                                content: col.dataType == wjcCore.DataType.Number ? '1' : pCells.getCellData(r, c, true)
                                            };
                                            var strKey = JSON.stringify(key);
                                            h = cache[strKey];
                                            if (h == null) {
                                                h = _this._getDesiredHeight(pCells, r, c, eMeasure);
                                                cache[strKey] = h;
                                            }
                                        }
                                        else {
                                            h = _this._getDesiredHeight(pCells, r, c, eMeasure);
                                        }
                                        max = Math.max(max, h);
                                        first = false;
                                    }
                                }
                            }
                        }
                        pCells.rows[r].height = max + extra;
                    }
                }
                _this.cellFactory.disposeCell(eMeasure);
                wjcCore.removeChild(eMeasure);
            });
        }
    };
    Object.defineProperty(FlexGrid.prototype, "treeIndent", {
        get: function () {
            return this._indent;
        },
        set: function (value) {
            if (value != this._indent) {
                this._indent = wjcCore.asNumber(value, false, true);
                this.columns.onCollectionChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    FlexGrid.prototype.collapseGroupsToLevel = function (level) {
        if (this.finishEditing()) {
            var rows_1 = this.rows;
            rows_1.deferUpdate(function () {
                for (var r = 0; r < rows_1.length; r++) {
                    var gr = wjcCore.tryCast(rows_1[r], GroupRow);
                    if (gr) {
                        gr.isCollapsed = gr.level >= level;
                    }
                }
            });
        }
    };
    Object.defineProperty(FlexGrid.prototype, "selectionMode", {
        get: function () {
            return this._selHdl.selectionMode;
        },
        set: function (value) {
            if (value != this.selectionMode) {
                this._clearCells();
                this._selHdl.selectionMode = wjcCore.asEnum(value, SelectionMode);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "selection", {
        get: function () {
            return this._selHdl.selection.clone();
        },
        set: function (value) {
            this._selHdl.selection = value;
        },
        enumerable: true,
        configurable: true
    });
    FlexGrid.prototype.select = function (rng, show) {
        if (show === void 0) { show = true; }
        this._selHdl.select(rng, show);
    };
    FlexGrid.prototype.getSelectedState = function (r, c) {
        return this.cells.getSelectedState(r, c, null);
    };
    Object.defineProperty(FlexGrid.prototype, "selectedRows", {
        get: function () {
            var rows = [];
            if (this.selectionMode == SelectionMode.ListBox) {
                for (var i = 0; i < this.rows.length; i++) {
                    if (this.rows[i].isSelected) {
                        rows.push(this.rows[i]);
                    }
                }
            }
            else if (this.rows.length) {
                var sel = this.selection;
                for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                    rows.push(this.rows[i]);
                }
            }
            return rows;
        },
        set: function (value) {
            var _this = this;
            wjcCore.assert(this.selectionMode == SelectionMode.ListBox, 'This property can be set only in ListBox mode.');
            value = wjcCore.asArray(value);
            this.deferUpdate(function () {
                for (var i = 0, first = true; i < _this.rows.length; i++) {
                    var row = _this.rows[i], sel = value && value.indexOf(row) > -1;
                    if (sel && first) {
                        first = false;
                        _this.select(i, _this.selection.col);
                    }
                    row.isSelected = sel;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "selectedItems", {
        get: function () {
            var items = this.selectedRows;
            for (var i = 0; i < items.length; i++) {
                items[i] = items[i].dataItem;
            }
            return items;
        },
        set: function (value) {
            var _this = this;
            wjcCore.assert(this.selectionMode == SelectionMode.ListBox, 'This property can be set only in ListBox mode.');
            value = wjcCore.asArray(value);
            this.deferUpdate(function () {
                for (var i = 0, first = true; i < _this.rows.length; i++) {
                    var row = _this.rows[i], sel = value && value.indexOf(row.dataItem) > -1;
                    if (sel && first) {
                        first = false;
                        _this.select(i, _this.selection.col);
                    }
                    row.isSelected = sel;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    FlexGrid.prototype.scrollIntoView = function (r, c, refresh) {
        if (this._maxOffsetY == null) {
            this._updateLayout();
        }
        var sp = this.scrollPosition, wid = this._szClient.width, hei = this._szClient.height - this._gpCFtr.rows.getTotalSize(), ptFrz = this.cells._getFrozenPos();
        r = wjcCore.asInt(r);
        if (r > -1 && r < this._rows.length && r >= this._rows.frozen) {
            var row = this._rows[r], pct = this.cells.height > hei ? Math.round(row.pos / (this.cells.height - hei) * 100) / 100 : 0, offsetY = Math.round(this._maxOffsetY * pct), rpos = row.pos - offsetY, rbot = rpos + row.renderSize;
            if (rbot > hei - sp.y) {
                sp.y = Math.max(-rpos, hei - rbot);
            }
            if (rpos - ptFrz.y < -sp.y) {
                sp.y = -(rpos - ptFrz.y);
            }
        }
        c = wjcCore.asInt(c);
        if (c > -1 && c < this._cols.length && c >= this._cols.frozen) {
            var col = this._cols[c], rgt = col.pos + col.renderSize;
            if (rgt > -sp.x + wid) {
                sp.x = Math.max(-col.pos, wid - rgt);
            }
            if (col.pos - ptFrz.x < -sp.x) {
                sp.x = -(col.pos - ptFrz.x);
            }
        }
        if (!sp.equals(this._ptScrl)) {
            this.scrollPosition = sp;
            if (refresh) {
                this._updateScrollPosition();
                this.refresh();
            }
            return true;
        }
        return false;
    };
    FlexGrid.prototype.isRangeValid = function (rng) {
        return rng.isValid && rng.bottomRow < this.rows.length && rng.rightCol < this.columns.length;
    };
    FlexGrid.prototype.startEditing = function (fullEdit, r, c, focus) {
        if (fullEdit === void 0) { fullEdit = true; }
        return this._edtHdl.startEditing(fullEdit, r, c, focus);
    };
    FlexGrid.prototype.finishEditing = function (cancel) {
        if (cancel === void 0) { cancel = false; }
        return this._edtHdl.finishEditing(cancel);
    };
    Object.defineProperty(FlexGrid.prototype, "activeEditor", {
        get: function () {
            return this._edtHdl.activeEditor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "editRange", {
        get: function () {
            return this._edtHdl.editRange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "mergeManager", {
        get: function () {
            return this._mrgMgr;
        },
        set: function (value) {
            if (value != this._mrgMgr) {
                this._mrgMgr = wjcCore.asType(value, MergeManager, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    FlexGrid.prototype.getMergedRange = function (p, r, c, clip) {
        if (clip === void 0) { clip = true; }
        return this._mrgMgr ? this._mrgMgr.getMergedRange(p, r, c, clip) : null;
    };
    Object.defineProperty(FlexGrid.prototype, "keyActionTab", {
        get: function () {
            return this._keyHdl._kaTab;
        },
        set: function (value) {
            this._keyHdl._kaTab = wjcCore.asEnum(value, KeyAction);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "keyActionEnter", {
        get: function () {
            return this._keyHdl._kaEnter;
        },
        set: function (value) {
            this._keyHdl._kaEnter = wjcCore.asEnum(value, KeyAction);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGrid.prototype, "showDropDown", {
        get: function () {
            return this._shDropDown;
        },
        set: function (value) {
            if (value != this._shDropDown) {
                this._shDropDown = wjcCore.asBoolean(value, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    FlexGrid.prototype.toggleDropDownList = function () {
        if (!this._tglDropDown) {
            this._tglDropDown = true;
            this._edtHdl._toggleListBox(null);
            this._tglDropDown = false;
        }
    };
    FlexGrid.prototype.onItemsSourceChanging = function (e) {
        this.itemsSourceChanging.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onItemsSourceChanged = function (e) {
        this.itemsSourceChanged.raise(this, e);
    };
    FlexGrid.prototype.onScrollPositionChanged = function (e) {
        this.scrollPositionChanged.raise(this, e);
    };
    FlexGrid.prototype.onSelectionChanging = function (e) {
        this.selectionChanging.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onSelectionChanged = function (e) {
        this.selectionChanged.raise(this, e);
    };
    FlexGrid.prototype.onLoadingRows = function (e) {
        this.loadingRows.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onLoadedRows = function (e) {
        this.loadedRows.raise(this, e);
    };
    FlexGrid.prototype.onUpdatingLayout = function (e) {
        this.updatingLayout.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onUpdatedLayout = function (e) {
        this.updatedLayout.raise(this, e);
    };
    FlexGrid.prototype.onResizingColumn = function (e) {
        this.resizingColumn.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onResizedColumn = function (e) {
        this.resizedColumn.raise(this, e);
    };
    FlexGrid.prototype.onAutoSizingColumn = function (e) {
        this.autoSizingColumn.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onAutoSizedColumn = function (e) {
        this.autoSizedColumn.raise(this, e);
    };
    FlexGrid.prototype.onDraggingColumn = function (e) {
        this.draggingColumn.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onDraggingColumnOver = function (e) {
        this.draggingColumnOver.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onDraggedColumn = function (e) {
        this.draggedColumn.raise(this, e);
    };
    FlexGrid.prototype.onResizingRow = function (e) {
        this.resizingRow.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onResizedRow = function (e) {
        this.resizedRow.raise(this, e);
    };
    FlexGrid.prototype.onAutoSizingRow = function (e) {
        this.autoSizingRow.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onAutoSizedRow = function (e) {
        this.autoSizedRow.raise(this, e);
    };
    FlexGrid.prototype.onDraggingRow = function (e) {
        this.draggingRow.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onDraggingRowOver = function (e) {
        this.draggingRowOver.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onDraggedRow = function (e) {
        this.draggedRow.raise(this, e);
    };
    FlexGrid.prototype.onGroupCollapsedChanging = function (e) {
        this.groupCollapsedChanging.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onGroupCollapsedChanged = function (e) {
        this.groupCollapsedChanged.raise(this, e);
    };
    FlexGrid.prototype.onSortingColumn = function (e) {
        this.sortingColumn.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onSortedColumn = function (e) {
        this.sortedColumn.raise(this, e);
    };
    FlexGrid.prototype.onBeginningEdit = function (e) {
        this.beginningEdit.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onPrepareCellForEdit = function (e) {
        this.prepareCellForEdit.raise(this, e);
    };
    FlexGrid.prototype.onCellEditEnding = function (e) {
        this.cellEditEnding.raise(this, e);
        return !e.cancel && !e.stayInEditMode;
    };
    FlexGrid.prototype.onCellEditEnded = function (e) {
        this.cellEditEnded.raise(this, e);
    };
    FlexGrid.prototype.onRowEditStarting = function (e) {
        this.rowEditStarting.raise(this, e);
    };
    FlexGrid.prototype.onRowEditStarted = function (e) {
        this.rowEditStarted.raise(this, e);
    };
    FlexGrid.prototype.onRowEditEnding = function (e) {
        this.rowEditEnding.raise(this, e);
    };
    FlexGrid.prototype.onRowEditEnded = function (e) {
        this.rowEditEnded.raise(this, e);
    };
    FlexGrid.prototype.onRowAdded = function (e) {
        this.rowAdded.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onDeletingRow = function (e) {
        this.deletingRow.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onDeletedRow = function (e) {
        this.deletedRow.raise(this, e);
    };
    FlexGrid.prototype.onCopying = function (e) {
        this.copying.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onCopied = function (e) {
        this.copied.raise(this, e);
    };
    FlexGrid.prototype.onPasting = function (e) {
        this.pasting.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onPasted = function (e) {
        this.pasted.raise(this, e);
    };
    FlexGrid.prototype.onPastingCell = function (e) {
        this.pastingCell.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onPastedCell = function (e) {
        this.pastedCell.raise(this, e);
    };
    FlexGrid.prototype.onFormatItem = function (e) {
        this.formatItem.raise(this, e);
    };
    FlexGrid.prototype.onUpdatingView = function (e) {
        this.updatingView.raise(this, e);
        return !e.cancel;
    };
    FlexGrid.prototype.onUpdatedView = function (e) {
        this.updatedView.raise(this, e);
    };
    FlexGrid.prototype._getShowErrors = function () {
        return this.showErrors && this._hasValidation;
    };
    FlexGrid.prototype._getHasValidation = function () {
        return this._hasValidation;
    };
    FlexGrid.prototype._getError = function (p, r, c) {
        if (wjcCore.isFunction(this.itemValidator)) {
            if (p == this.cells) {
                return this.itemValidator(r, c);
            }
            else if (p == this.rowHeaders) {
                for (c = 0; c < this.columns.length; c++) {
                    var error = this.itemValidator(r, c);
                    if (error) {
                        return error;
                    }
                }
            }
        }
        var view = this._cv, getError = view ? view['getError'] : null;
        if (wjcCore.isFunction(getError)) {
            var rows = p.rows, cols = this.columns, item = rows[r].dataItem;
            if (item) {
                for (; r < rows.length && rows[r].dataItem == item; r++) {
                    if (p == this.cells) {
                        var bcol = this._getBindingColumn(this.cells, r, cols[c]);
                        return getError(item, bcol.binding);
                    }
                    else if (p == this.rowHeaders) {
                        for (c = 0; c < cols.length; c++) {
                            var bcol = this._getBindingColumn(this.cells, r, cols[c]), error = getError(item, bcol.binding);
                            if (error) {
                                return error;
                            }
                        }
                    }
                }
            }
        }
        return null;
    };
    FlexGrid.prototype._setAria = function (name, value) {
        wjcCore.setAttribute(this.cells.hostElement, 'aria-' + name, value);
    };
    FlexGrid.prototype._setFocus = function (force) {
        if (this.hostElement) {
            if (force || !this.containsFocus()) {
                var ae = wjcCore.getActiveElement(), eFocus = this._eFocus, ti = 'tabindex';
                if (this.activeEditor) {
                    if (!wjcCore.contains(this.activeEditor, ae)) {
                        this.activeEditor.focus();
                        eFocus.removeAttribute(ti);
                    }
                }
                else if (this._activeCell) {
                    if (!wjcCore.contains(this._activeCell, ae)) {
                        if (ae != this._root) {
                            this._activeCell.tabIndex = this._tabIndex;
                            this._activeCell.focus();
                            eFocus.removeAttribute(ti);
                        }
                    }
                }
                else {
                    if (!wjcCore.contains(eFocus, ae)) {
                        eFocus.tabIndex = this._tabIndex;
                        eFocus.focus();
                    }
                }
                if (!this.containsFocus()) {
                    eFocus.tabIndex = this._tabIndex;
                    eFocus.focus();
                }
            }
        }
    };
    FlexGrid.prototype._setFocusNoScroll = function (e) {
        var sp = this.scrollPosition, st = e.style, pos = st.position;
        st.position = 'fixed';
        e.tabIndex = this._tabIndex;
        e.focus();
        st.position = pos;
        this.scrollPosition = sp;
        var host = this.hostElement;
        host.scrollTop = host.scrollLeft = 0;
    };
    FlexGrid.prototype._getDefaultRowHeight = function () {
        var defRowHei = this._eFocus.scrollHeight + 2;
        if (defRowHei <= 6 || isNaN(defRowHei)) {
            defRowHei = 28;
        }
        return defRowHei;
    };
    FlexGrid.prototype._getDefaultCellPadding = function () {
        var cs = getComputedStyle(this._eFocus);
        return parseInt(this.rightToLeft ? cs.paddingRight : cs.paddingLeft);
    };
    FlexGrid.prototype._getCollectionView = function (value) {
        return wjcCore.asCollectionView(value);
    };
    FlexGrid.prototype._getCanvasContext = function () {
        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), cs = getComputedStyle(this.hostElement);
        ctx.font = cs.fontSize + ' ' + cs.fontFamily.split(',')[0];
        return ctx;
    };
    FlexGrid.prototype._getWidestRow = function (p, rowRange, col, ctx) {
        var row = 0, maxWid = 0, isBoolean = p.columns[col].dataType == wjcCore.DataType.Boolean;
        for (var r = rowRange.row; r <= rowRange.row2; r++) {
            if (p.rows[r].isVisible) {
                var str = p.getCellData(r, col, true), wid = ctx.measureText(str).width;
                if (wid > maxWid) {
                    maxWid = wid;
                    row = r;
                }
                if (isBoolean) {
                    break;
                }
            }
        }
        return row;
    };
    FlexGrid.prototype._getDesiredWidth = function (p, r, c, e) {
        var rng = this.getMergedRange(p, r, c), s = e.style;
        this.cellFactory.updateCell(p, r, c, e, rng);
        s.width = s.top = s.left = '';
        return e.offsetWidth / ((rng && rng.columnSpan > 1) ? rng.columnSpan : 1);
    };
    FlexGrid.prototype._getDesiredHeight = function (p, r, c, e) {
        var rng = this.getMergedRange(p, r, c), s = e.style;
        this.cellFactory.updateCell(p, r, c, e, rng);
        s.height = s.top = s.left = '';
        return e.offsetHeight / ((rng && rng.rowSpan > 1) ? rng.rowSpan : 1);
    };
    FlexGrid.prototype._getSortRowIndex = function () {
        return this._sortRowIndex != null
            ? this._sortRowIndex
            : this.columnHeaders.rows.length - 1;
    };
    FlexGrid.prototype._sortConverter = function (sd, item, value, init) {
        var col;
        if (init) {
            this._mappedColumns = null;
            if (this._cv) {
                var sds = this._cv.sortDescriptions;
                for (var i = 0; i < sds.length; i++) {
                    col = this.getColumn(sds[i].property);
                    if (col && col.dataMap) {
                        if (!this._mappedColumns) {
                            this._mappedColumns = {};
                        }
                        this._mappedColumns[col.binding] = col.dataMap;
                    }
                }
            }
            if (this._mouseHdl._htDown && this._mouseHdl._htDown.col > -1) {
                col = this.columns[this._mouseHdl._htDown.col];
                if (this._mappedColumns && col.dataMap) {
                    this._mappedColumns[col.binding] = col.dataMap;
                }
            }
        }
        if (this._mappedColumns) {
            var map = this._mappedColumns[sd.property];
            if (map && map.sortByDisplayValues) {
                value = map.getDisplayValue(value);
            }
        }
        return value;
    };
    FlexGrid.prototype._bindGrid = function (full) {
        var _this = this;
        this.deferUpdate(function () {
            if (_this._lastCount == 0 && wjcCore.hasItems(_this._cv)) {
                full = true;
            }
            var selItems, isListBox = _this.selectionMode == SelectionMode.ListBox;
            if (_this.preserveSelectedState && isListBox && !_this.childItemsPath) {
                selItems = _this.selectedItems;
            }
            var collapsedMap;
            if (_this.preserveOutlineState && wjcCore.isFunction(window['Map']) && _this.rows.maxGroupLevel > -1) {
                collapsedMap = new Map();
                for (var i = 0; i < _this.rows.length; i++) {
                    var gr = _this.rows[i];
                    if (gr instanceof GroupRow && gr.isCollapsed && gr.dataItem) {
                        var key = gr.dataItem;
                        if (key instanceof wjcCore.CollectionViewGroup) {
                            key = key._path;
                        }
                        collapsedMap.set(key, true);
                    }
                }
            }
            if (full) {
                _this.columns.deferUpdate(function () {
                    _this._bindColumns();
                });
            }
            var e = new wjcCore.CancelEventArgs();
            if (_this.onLoadingRows(e)) {
                _this.rows.deferUpdate(function () {
                    _this._bindRows();
                });
                _this.onLoadedRows(e);
            }
            var cnt = 0;
            if (selItems && selItems.length) {
                for (var i = 0; i < _this.rows.length && cnt < selItems.length; i++) {
                    if (selItems.indexOf(_this.rows[i].dataItem) > -1) {
                        _this.rows[i].isSelected = true;
                        cnt++;
                    }
                }
            }
            if (isListBox && cnt == 0 && _this._lastCount > 0) {
                var sel = _this.selection;
                for (var i = sel.topRow; i <= sel.bottomRow && i > -1 && i < _this.rows.length; i++) {
                    _this.rows[i].isSelected = true;
                }
            }
            if (collapsedMap) {
                _this.rows.deferUpdate(function () {
                    for (var i = 0; i < _this.rows.length; i++) {
                        var gr = _this.rows[i];
                        if (gr instanceof GroupRow) {
                            var key = gr.dataItem;
                            if (key instanceof wjcCore.CollectionViewGroup) {
                                key = key._path;
                            }
                            if (collapsedMap.get(key)) {
                                gr.isCollapsed = true;
                            }
                        }
                    }
                });
            }
            if (!_this._lastCount && _this._cv && _this._cv.items) {
                _this._lastCount = _this._cv.items.length;
            }
        });
        if (!this.rows.length) {
            var sel = this._selHdl.selection;
            sel.row = sel.row2 = -1;
        }
        if (this._cv) {
            this._syncSelection(true);
        }
    };
    FlexGrid.prototype._cvCollectionChanged = function (sender, e) {
        if (this.autoGenerateColumns && this.columns.length == 0) {
            this._bindGrid(true);
            return;
        }
        if (this.childItemsPath && e.action != wjcCore.NotifyCollectionChangedAction.Change) {
            this._bindGrid(false);
            return;
        }
        switch (e.action) {
            case wjcCore.NotifyCollectionChangedAction.Change:
                this.invalidate();
                return;
            case wjcCore.NotifyCollectionChangedAction.Add:
                if (e.index == this._cv.items.length - 1) {
                    var index_1 = this.rows.length;
                    if (this.rows[index_1 - 1] instanceof _NewRowTemplate) {
                        index_1--;
                    }
                    this.rows.insert(index_1, new Row(e.item));
                    return;
                }
                wjcCore.assert(false, 'added item should be the last one.');
                break;
            case wjcCore.NotifyCollectionChangedAction.Remove:
                var index = this._findRow(e.item);
                if (index > -1) {
                    this.rows.removeAt(index);
                    this._syncSelection(false);
                    return;
                }
                wjcCore.assert(false, 'removed item not found in grid.');
                break;
        }
        this._bindGrid(false);
    };
    FlexGrid.prototype._cvCurrentChanged = function (s, e) {
        this._syncSelection(false);
    };
    FlexGrid.prototype._syncSelection = function (force) {
        if (this._cv && this.selectionMode != SelectionMode.None) {
            var sel = this.selection, item = sel.row > -1 && sel.row < this.rows.length
                ? this.rows[sel.row].dataItem
                : null;
            if (item instanceof wjcCore.CollectionViewGroup) {
                item = null;
            }
            if (item != this._cv.currentItem || force) {
                if (!this.childItemsPath || !this.editableCollectionView || !this.editableCollectionView.currentAddItem) {
                    var index = this._getRowIndex(this._cv.currentPosition);
                    if (index != sel.row || !this.childItemsPath) {
                        sel.row = sel.row2 = index;
                        this.select(sel, false);
                        if (this.selectionMode) {
                            this.scrollIntoView(sel.row, -1);
                        }
                    }
                }
            }
        }
    };
    FlexGrid.prototype._getRowIndex = function (index) {
        if (this._cv) {
            if (index > -1) {
                var item = this._cv.items[index];
                for (; index < this.rows.length; index++) {
                    if (this.rows[index].dataItem === item) {
                        return index;
                    }
                }
                return -1;
            }
            else {
                if (this.rows.length == 1 && this.rows[0] instanceof _NewRowTemplate) {
                    return 0;
                }
                var index_2 = this.selection.row, row = index_2 > -1 ? this.rows[index_2] : null;
                return row && (row instanceof GroupRow || row.dataItem == null)
                    ? index_2
                    : -1;
            }
        }
        return this.selection.row;
    };
    FlexGrid.prototype._getCvIndex = function (index) {
        if (this._cv && index > -1 && index < this.rows.length) {
            var items = this._cv.items, item = this.rows[index].dataItem;
            index = Math.min(index, items.length - 1);
            for (; index > -1; index--) {
                if (items[index] === item) {
                    return index;
                }
            }
        }
        return -1;
    };
    FlexGrid.prototype._findRow = function (data) {
        for (var i = 0; i < this.rows.length; i++) {
            if (this.rows[i].dataItem == data) {
                return i;
            }
        }
        return -1;
    };
    FlexGrid.prototype._updateLayout = function () {
        var e = new wjcCore.CancelEventArgs();
        if (!this.onUpdatingLayout(e)) {
            return;
        }
        this._hasValidation =
            wjcCore.isFunction(this._itemValidator) ||
                (this._cv && wjcCore.isFunction(this._cv['getError']));
        var tlw = (this._hdrVis & HeadersVisibility.Row) ? this._hdrCols.getTotalSize() : 0, tlh = (this._hdrVis & HeadersVisibility.Column) ? this._hdrRows.getTotalSize() : 0, blh = this._ftrRows.getTotalSize(), heightReal = this._rows.getTotalSize() + blh;
        if (heightReal < 1) {
            heightReal = 1;
        }
        this._heightBrowser = Math.min(heightReal, FlexGrid._getMaxSupportedCssHeight());
        this._maxOffsetY = Math.max(0, heightReal - this._heightBrowser);
        this._cellPadding = this._getDefaultCellPadding();
        var ftrTop = this._heightBrowser + tlh - blh;
        var cellWid = this._gpCells.width, cellHei = this._heightBrowser;
        if (!cellWid && this.rows.length)
            cellWid = 0.1;
        if (!cellHei && this.columns.length)
            cellHei = 0.1;
        if (this.rightToLeft) {
            wjcCore.setCss(this._eTL, { right: 0, top: 0, width: tlw, height: tlh });
            wjcCore.setCss(this._eCHdr, { right: tlw, top: 0, height: tlh });
            wjcCore.setCss(this._eRHdr, { right: 0, top: tlh, width: tlw });
            wjcCore.setCss(this._eCt, { right: tlw, top: tlh, width: cellWid, height: cellHei });
            wjcCore.setCss(this._fCt, { right: tlw, top: tlh });
            wjcCore.setCss(this._eBL, { right: 0, top: ftrTop, width: tlw, height: blh });
            wjcCore.setCss(this._eCFtr, { right: tlw, top: ftrTop, height: blh });
        }
        else {
            wjcCore.setCss(this._eTL, { left: 0, top: 0, width: tlw, height: tlh });
            wjcCore.setCss(this._eCHdr, { left: tlw, top: 0, height: tlh });
            wjcCore.setCss(this._eRHdr, { left: 0, top: tlh, width: tlw });
            wjcCore.setCss(this._eCt, { left: tlw, top: tlh, width: cellWid, height: cellHei });
            wjcCore.setCss(this._fCt, { left: tlw, top: tlh });
            wjcCore.setCss(this._eBL, { left: 0, top: ftrTop, width: tlw, height: blh });
            wjcCore.setCss(this._eCFtr, { left: tlw, top: ftrTop, height: blh });
        }
        if (this._stickyHdr) {
            this._updateStickyHeaders();
        }
        var zIndex = (this.frozenRows || this.frozenColumns) ? '3' : '';
        wjcCore.setCss([this._eTL, this._eBL, this._eCHdr, this._eCFtr, this._eRHdr, this._eMarquee], {
            zIndex: zIndex
        });
        var root = this._root, sbW = root.offsetWidth - root.clientWidth, sbH = root.offsetHeight - root.clientHeight;
        wjcCore.setCss(this._eSz, {
            width: tlw + sbW + this._gpCells.width,
            height: tlh + sbH + this._heightBrowser
        });
        var clientWidth = null;
        if (this.columns._updateStarSizes(root.clientWidth - tlw)) {
            clientWidth = root.clientWidth;
            wjcCore.setCss(this._eCt, { width: this._gpCells.width });
        }
        this._szClient = new wjcCore.Size(root.clientWidth - tlw, root.clientHeight - tlh);
        this._rcBounds = null;
        this._updateScrollHandler();
        this._updateContent(false);
        sbW = root.offsetWidth - root.clientWidth;
        sbH = root.offsetHeight - root.clientHeight;
        wjcCore.setCss(this._eSz, {
            width: tlw + sbW + this._gpCells.width,
            height: tlh + sbH + this._heightBrowser
        });
        this._szClient = new wjcCore.Size(root.clientWidth - tlw, root.clientHeight - tlh);
        if (clientWidth && clientWidth != root.clientWidth) {
            if (this.columns._updateStarSizes(root.clientWidth - tlw)) {
                wjcCore.setCss(this._eCt, { width: this._gpCells.width });
                this._updateContent(false);
            }
        }
        wjcCore.setCss([this._eCHdr, this._eCFtr, this._fCt], { width: this._szClient.width });
        wjcCore.setCss([this._eRHdr, this._fCt], { height: this._szClient.height });
        if (blh) {
            ftrTop = Math.min(ftrTop, this._szClient.height + tlh - blh);
            wjcCore.setCss([this._eBL, this._eCFtr], { top: ftrTop });
        }
        this.onUpdatedLayout(e);
    };
    FlexGrid.prototype._updateStickyHeaders = function () {
        var stuck = false, offset = 0;
        if (this._stickyHdr) {
            var maxTop = 0, thisTop = null;
            for (var el = this.hostElement; el; el = el.parentElement) {
                var rc = el.getBoundingClientRect();
                if (thisTop == null) {
                    thisTop = rc.top;
                }
                maxTop = Math.max(maxTop, rc.top);
            }
            thisTop = Math.max(0, maxTop - thisTop - 1);
            offset = -thisTop;
            stuck = thisTop > 0;
            this._rcBounds = null;
        }
        this._eTL.style.top = this._eCHdr.style.top = stuck ? (-offset + 'px') : '';
        wjcCore.toggleClass(this._eTL, FlexGrid._WJS_STICKY, stuck);
        wjcCore.toggleClass(this._eCHdr, FlexGrid._WJS_STICKY, stuck);
    };
    FlexGrid.prototype._updateScrollHandler = function () {
        this._clipToScreen = this._getClipToScreen();
        var needScrollHandler = this._stickyHdr || this._clipToScreen;
        if (needScrollHandler != this._scrollHandlerAttached) {
            this._scrollHandlerAttached = needScrollHandler;
            if (needScrollHandler) {
                this.addEventListener(window, 'scroll', this._bndScroll, true);
            }
            else {
                this.removeEventListener(window, 'scroll', this._bndScroll, true);
            }
        }
    };
    FlexGrid.prototype._getClipToScreen = function () {
        if (this.rows.length <= FlexGrid._MIN_VIRT_ROWS) {
            return false;
        }
        if (this._root.clientHeight != this._root.scrollHeight) {
            return false;
        }
        for (var host = this.hostElement; host && host != document.documentElement; host = host.parentElement) {
            var cs = getComputedStyle(host);
            if (cs.overflow == 'auto') {
                return false;
            }
        }
        return true;
    };
    FlexGrid.prototype._scroll = function (e) {
        var _this = this;
        if (wjcCore.contains(e.target, this.hostElement)) {
            if (this._clipToScreen) {
                if (this._afScrl) {
                    cancelAnimationFrame(this._afScrl);
                }
                this._afScrl = requestAnimationFrame(function () {
                    _this._afScrl = null;
                    _this.finishEditing();
                    _this._updateContent(true);
                });
            }
            if (this._stickyHdr) {
                if (this._afSticky) {
                    cancelAnimationFrame(this._afSticky);
                }
                this._afSticky = requestAnimationFrame(function () {
                    _this._afSticky = null;
                    var e = new wjcCore.CancelEventArgs();
                    if (_this.onUpdatingLayout(e)) {
                        _this._updateStickyHeaders();
                        _this.onUpdatedLayout(e);
                    }
                });
            }
        }
    };
    FlexGrid.prototype._updateScrollPosition = function () {
        var root = this._root, top = root.scrollTop, left = root.scrollLeft;
        if (this.rightToLeft && FlexGrid._getRtlMode() == 'rev') {
            left = (root.scrollWidth - root.clientWidth) - left;
        }
        var pt = new wjcCore.Point(-Math.abs(left), -top);
        if (!this._ptScrl.equals(pt)) {
            this._ptScrl = pt;
            this.onScrollPositionChanged();
            return true;
        }
        return false;
    };
    FlexGrid.prototype._updateContent = function (recycle, state) {
        var ae = wjcCore.getActiveElement(), elFocus = wjcCore.contains(this.hostElement, ae) ? ae : null, oldActiveCell = this._activeCell;
        var e = new wjcCore.CancelEventArgs();
        if (!this.onUpdatingView(e)) {
            return;
        }
        this._offsetY = 0;
        if (this._heightBrowser > this._szClient.height) {
            var pct = Math.round((-this._ptScrl.y) / (this._heightBrowser - this._szClient.height) * 100) / 100;
            this._offsetY = Math.round(this._maxOffsetY * pct);
        }
        this._updateScrollPosition();
        var newActiveCell = this._gpCells._updateContent(recycle, state, this._offsetY);
        if (this._hdrVis & HeadersVisibility.Column) {
            if (!state || (this._ssHdr & HeadersVisibility.Column)) {
                this._gpCHdr._updateContent(recycle, state, 0);
            }
        }
        if (this._hdrVis & HeadersVisibility.Row) {
            if (!state || (this._ssHdr & HeadersVisibility.Row)) {
                this._gpRHdr._updateContent(recycle, state, this._offsetY);
            }
        }
        if (this._hdrVis && !state) {
            this._gpTL._updateContent(recycle, state, 0);
        }
        if (this._gpCFtr.rows.length) {
            this._gpBL._updateContent(recycle, state, 0);
            this._gpCFtr._updateContent(recycle, state, 0);
        }
        if (this.showMarquee) {
            var sel = this._selHdl.selection, marquee = this._eMarquee;
            if (!this.isRangeValid(sel)) {
                wjcCore.setCss(marquee, {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    visibility: 'collapse'
                });
            }
            else {
                var rcm = this._getMarqueeRect(sel), host = this.cells.hostElement, mc = marquee.firstChild, dx = marquee.offsetWidth - mc.offsetWidth, dy = marquee.offsetHeight - mc.offsetHeight;
                wjcCore.setCss(marquee, {
                    left: rcm.left + host.offsetLeft - dx / 2,
                    top: rcm.top + host.offsetTop - dy / 2,
                    width: rcm.width + dx,
                    height: rcm.height + dy,
                    visibility: rcm.width > 0 && rcm.height > 0 ? '' : 'collapse'
                });
            }
        }
        if (this._useFrozenDiv()) {
            this._updateFrozenCells(state);
            if (newActiveCell && wjcCore.hasClass(newActiveCell, 'wj-frozen')) {
                newActiveCell = null;
            }
        }
        this._activeCell = newActiveCell;
        if (elFocus) {
            if (elFocus != this._root &&
                elFocus != this._eFocus &&
                wjcCore.contains(this.hostElement, elFocus) &&
                !wjcCore.contains(this.cells.hostElement, elFocus)) {
                if (document.activeElement != elFocus) {
                    elFocus.focus();
                }
                if (wjcCore.isIE() &&
                    elFocus instanceof HTMLInputElement &&
                    !elFocus.type.match(/checkbox|radio|range/i)) {
                    var ss = elFocus.selectionStart, se = elFocus.selectionEnd;
                    elFocus.setSelectionRange(ss, se);
                }
            }
            else {
                var force = newActiveCell != oldActiveCell;
                this._setFocus(force);
            }
        }
        if (!elFocus && newActiveCell) {
            newActiveCell.tabIndex = this._tabIndex;
        }
        if (oldActiveCell && oldActiveCell != newActiveCell) {
            oldActiveCell.removeAttribute('tabindex');
        }
        this._rcBounds = null;
        this.onUpdatedView(e);
    };
    FlexGrid.prototype._clearCells = function () {
        for (var k in this) {
            if (k[0] == '_') {
                var p = this[k];
                if (p instanceof GridPanel) {
                    p._clearCells();
                }
            }
        }
        this.invalidate();
    };
    FlexGrid.prototype._useFrozenDiv = function () {
        return wjcCore.isBoolean(this._fzClone)
            ? this._fzClone
            : wjcCore.isIE() || wjcCore.isFirefox() || wjcCore.isMobile();
    };
    FlexGrid.prototype._updateFrozenCells = function (state) {
        if (!this.frozenRows && !this.frozenColumns) {
            wjcCore.setText(this._fCt, null);
        }
        else {
            var frozen = this._eCt.querySelectorAll('.wj-frozen');
            if (state && this._fCt.children.length == frozen.length) {
                for (var i = 0; i < frozen.length; i++) {
                    this._fCt.children[i].className = frozen[i].className;
                }
                return;
            }
            wjcCore.setText(this._fCt, null);
            if (!this.activeEditor) {
                for (var i = 0; i < frozen.length; i++) {
                    var cell = frozen[i].cloneNode(true);
                    cell.style.pointerEvents = 'auto';
                    this._fCt.appendChild(cell);
                }
            }
        }
    };
    FlexGrid.prototype._getMarqueeRect = function (rng) {
        var m1 = this.getMergedRange(this.cells, rng.topRow, rng.leftCol) || new CellRange(rng.topRow, rng.leftCol), m2 = this.getMergedRange(this.cells, rng.bottomRow, rng.rightCol) || new CellRange(rng.bottomRow, rng.rightCol);
        var rc1 = this.cells.getCellBoundingRect(m1.topRow, m1.leftCol, true), rc2 = this.cells.getCellBoundingRect(m2.bottomRow, m2.rightCol, true);
        if (this.rows.frozen) {
            var fzr = Math.min(this.rows.length, this.rows.frozen), rcf = this.cells.getCellBoundingRect(fzr - 1, 0, true);
            if (rng.topRow >= fzr && rc1.top < rcf.bottom) {
                rc1.top = rcf.bottom;
            }
            if (rng.bottomRow >= fzr && rc2.bottom < rcf.bottom) {
                rc2.height = rcf.bottom - rc2.top;
            }
        }
        if (this.columns.frozen) {
            var fzc = Math.min(this.columns.length, this.columns.frozen), rcf = this.cells.getCellBoundingRect(0, fzc - 1, true);
            if (this.rightToLeft) {
                if (rng.leftCol >= fzc && rc1.right > rcf.left) {
                    rc1.left = rcf.left - rc1.width;
                }
                if (rng.rightCol >= fzc && rc2.left > rcf.left) {
                    rc2.left = rcf.left;
                }
            }
            else {
                if (rng.leftCol >= fzc && rc1.left < rcf.right) {
                    rc1.left = rcf.right;
                }
                if (rng.rightCol >= fzc && rc2.right < rcf.right) {
                    rc2.width = rcf.right - rc2.left;
                }
            }
        }
        return this.rightToLeft
            ? new wjcCore.Rect(rc2.left, rc1.top, rc1.right - rc2.left, rc2.bottom - rc1.top)
            : new wjcCore.Rect(rc1.left, rc1.top, rc2.right - rc1.left, rc2.bottom - rc1.top);
    };
    FlexGrid.prototype._bindColumns = function () {
        for (var i = 0; i < this.columns.length; i++) {
            var col = this.columns[i];
            if (col._getFlag(RowColFlags.AutoGenerated)) {
                this.columns.removeAt(i);
                i--;
            }
        }
        var view = this._cv, sc = view ? view.sourceCollection : null, item = sc && sc.length ? sc[0] : null;
        if (item && this.autoGenerateColumns) {
            for (var key in item) {
                var value = null;
                for (var index = 0; index < sc.length && index < 1000 && value == null; index++) {
                    value = sc[index][key];
                    if (wjcCore.isPrimitive(value)) {
                        var col = new Column();
                        col._setFlag(RowColFlags.AutoGenerated, true);
                        col.binding = col.name = key;
                        col.header = wjcCore.toHeaderCase(key);
                        col.dataType = wjcCore.getType(value);
                        if (col.dataType == wjcCore.DataType.Number) {
                            col.width = 80;
                        }
                        var pdesc = Object.getOwnPropertyDescriptor(item, key);
                        if (pdesc && !pdesc.writable && !wjcCore.isFunction(pdesc.set)) {
                            col._setFlag(RowColFlags.ReadOnly, true);
                        }
                        this.columns.push(col);
                    }
                }
            }
        }
        this._updateColumnTypes();
    };
    FlexGrid.prototype._updateColumnTypes = function () {
        var view = this._cv;
        if (wjcCore.hasItems(view)) {
            var item = view.items[0], cols = this.columns;
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                if (col.dataType == null && col._binding) {
                    col.dataType = wjcCore.getType(col._binding.getValue(item));
                }
            }
        }
    };
    FlexGrid.prototype._getBindingColumn = function (p, r, c) {
        return c;
    };
    FlexGrid.prototype._getRowHeaderPath = function () {
        return this._rowHdrPath;
    };
    FlexGrid.prototype._bindRows = function () {
        this.rows.clear();
        var view = this._cv;
        if (view && view.items) {
            var list = view.items, groups = view.groups;
            if (this.childItemsPath) {
                for (var i = 0; i < list.length; i++) {
                    this._addNode(list, i, 0);
                }
            }
            else if (groups != null && groups.length > 0 && this.showGroups) {
                for (var i = 0; i < groups.length; i++) {
                    this._addGroup(groups[i]);
                }
            }
            else {
                for (var i = 0; i < list.length; i++) {
                    this._addBoundRow(list, i);
                }
            }
        }
    };
    FlexGrid.prototype._addBoundRow = function (items, index) {
        this.rows.push(new Row(items[index]));
    };
    FlexGrid.prototype._addNode = function (items, index, level) {
        var gr = new GroupRow(), path = this.childItemsPath, prop = wjcCore.isArray(path) ? path[level] : path, item = items[index], children = item[prop];
        gr.dataItem = item;
        gr.level = level;
        this.rows.push(gr);
        if (wjcCore.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
                this._addNode(children, i, level + 1);
            }
        }
    };
    FlexGrid.prototype._addGroup = function (g) {
        var gr = new GroupRow();
        gr.level = g.level;
        gr.dataItem = g;
        this.rows.push(gr);
        if (g.isBottomLevel) {
            var items = g.items;
            for (var i = 0; i < items.length; i++) {
                this._addBoundRow(items, i);
            }
        }
        else {
            for (var i = 0; i < g.groups.length; i++) {
                this._addGroup(g.groups[i]);
            }
        }
    };
    FlexGrid._getSerializableProperties = function (obj) {
        var arr = [];
        for (obj = obj.prototype; obj != Object.prototype; obj = Object.getPrototypeOf(obj)) {
            var names = Object.getOwnPropertyNames(obj);
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i], pd = Object.getOwnPropertyDescriptor(obj, name_1);
                if (pd && pd.set && pd.get && name_1[0] != '_' &&
                    !name_1.match(/disabled|required/)) {
                    arr.push(name_1);
                }
            }
        }
        return arr;
    };
    FlexGrid.prototype._copy = function (key, value) {
        if (key == 'columns') {
            this.columns.clear();
            var arr = wjcCore.asArray(value);
            for (var i = 0; i < arr.length; i++) {
                var c = new Column();
                wjcCore.copy(c, arr[i]);
                this.columns.push(c);
            }
            return true;
        }
        return false;
    };
    FlexGrid.prototype._isInputElement = function (e) {
        if (e instanceof HTMLElement) {
            if (e.contentEditable == 'true') {
                return true;
            }
            var m = e.tagName.match(/^(BUTTON|A|INPUT|TEXTAREA|SELECT|OPTION)$/i);
            return m && m.length > 0;
        }
        return false;
    };
    FlexGrid.prototype._wantsInput = function (e) {
        return this._isInputElement(e) &&
            !this.activeEditor &&
            !this._edtHdl._isNativeCheckbox(e) &&
            !wjcCore.hasClass(e, 'wj-grid-ime') &&
            wjcCore.contains(document.body, e);
    };
    FlexGrid._getMaxSupportedCssHeight = function () {
        if (!FlexGrid._maxCssHeight) {
            var maxHeight = 33500000;
            if (wjcCore.isIE()) {
                maxHeight = 1500000;
            }
            else if (wjcCore.isFirefox()) {
                maxHeight = 17500000;
            }
            FlexGrid._maxCssHeight = maxHeight;
        }
        return FlexGrid._maxCssHeight;
    };
    FlexGrid._getRtlMode = function () {
        if (!FlexGrid._rtlMode) {
            var el = wjcCore.createElement('<div dir="rtl" style="visibility:hidden;width:100px;height:100px;overflow:auto">' +
                '<div style="width:2000px;height:2000px"></div>' +
                '</div>');
            document.body.appendChild(el);
            var sl = el.scrollLeft;
            el.scrollLeft = -1000;
            var sln = el.scrollLeft;
            wjcCore.removeChild(el);
            FlexGrid._rtlMode = sln < 0 ? 'neg' : sl > 0 ? 'rev' : 'std';
        }
        return FlexGrid._rtlMode;
    };
    FlexGrid._WJS_STICKY = 'wj-state-sticky';
    FlexGrid._WJS_MEASURE = 'wj-state-measuring';
    FlexGrid._WJS_UPDATING = 'wj-state-updating';
    FlexGrid._MIN_VIRT_ROWS = 200;
    FlexGrid.controlTemplate = '<div style="position:relative;width:100%;height:100%;overflow:hidden;max-width:inherit;max-height:inherit">' +
        '<div wj-part="focus" aria-hidden="true" class="wj-cell" style="position:fixed;opacity:0;pointer-events:none;left:-10px">0</div>' +
        '<div wj-part="root" style="position:absolute;width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch;max-width:inherit;max-height:inherit">' +
        '<div wj-part="cells" class="wj-cells" style="position:absolute"></div>' +
        '<div wj-part="marquee" aria-hidden="true" class="wj-marquee" style="display:none;pointer-events:none;">' +
        '<div style="width:100%;height:100%"></div>' +
        '</div>' +
        '</div>' +
        '<div wj-part="fcells" aria-hidden="true" class="wj-cells" style="position:absolute;pointer-events:none;overflow:hidden"></div>' +
        '<div wj-part="rh" aria-hidden="true" style="position:absolute;overflow:hidden;outline:none">' +
        '<div wj-part="rhcells" class="wj-rowheaders" style="position:relative"></div>' +
        '</div>' +
        '<div wj-part="cf" aria-hidden="true" style="position:absolute;overflow:hidden;outline:none">' +
        '<div wj-part="cfcells" class="wj-colfooters" style="position:relative"></div>' +
        '</div>' +
        '<div wj-part="ch" aria-hidden="true" style="position:absolute;overflow:hidden;outline:none">' +
        '<div wj-part="chcells" class="wj-colheaders" style="position:relative"></div>' +
        '</div>' +
        '<div wj-part="bl" aria-hidden="true" style="position:absolute;overflow:hidden;outline:none">' +
        '<div wj-part="blcells" class="wj-bottomleft" style="position:relative"></div>' +
        '</div>' +
        '<div wj-part="tl" aria-hidden="true" style="position:absolute;overflow:hidden;outline:none">' +
        '<div wj-part="tlcells" class="wj-topleft" style="position:relative"></div>' +
        '</div>' +
        '<div wj-part="sz" aria-hidden="true" style="position:relative;visibility:hidden"></div>' +
        '</div>';
    return FlexGrid;
}(wjcCore.Control));
exports.FlexGrid = FlexGrid;
'use strict';
var CellRangeEventArgs = (function (_super) {
    __extends(CellRangeEventArgs, _super);
    function CellRangeEventArgs(p, rng, data) {
        var _this = _super.call(this) || this;
        _this._p = wjcCore.asType(p, GridPanel);
        _this._rng = wjcCore.asType(rng, CellRange);
        _this._data = data;
        return _this;
    }
    Object.defineProperty(CellRangeEventArgs.prototype, "panel", {
        get: function () {
            return this._p;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRangeEventArgs.prototype, "range", {
        get: function () {
            return this._rng.clone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRangeEventArgs.prototype, "row", {
        get: function () {
            return this._rng.row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRangeEventArgs.prototype, "col", {
        get: function () {
            return this._rng.col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRangeEventArgs.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    return CellRangeEventArgs;
}(wjcCore.CancelEventArgs));
exports.CellRangeEventArgs = CellRangeEventArgs;
var FormatItemEventArgs = (function (_super) {
    __extends(FormatItemEventArgs, _super);
    function FormatItemEventArgs(p, rng, cell) {
        var _this = _super.call(this, p, rng) || this;
        _this._cell = wjcCore.asType(cell, HTMLElement);
        return _this;
    }
    Object.defineProperty(FormatItemEventArgs.prototype, "cell", {
        get: function () {
            return this._cell;
        },
        enumerable: true,
        configurable: true
    });
    return FormatItemEventArgs;
}(CellRangeEventArgs));
exports.FormatItemEventArgs = FormatItemEventArgs;
var CellEditEndingEventArgs = (function (_super) {
    __extends(CellEditEndingEventArgs, _super);
    function CellEditEndingEventArgs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._stayInEditMode = false;
        _this._refresh = true;
        return _this;
    }
    Object.defineProperty(CellEditEndingEventArgs.prototype, "stayInEditMode", {
        get: function () {
            return this._stayInEditMode;
        },
        set: function (value) {
            this._stayInEditMode = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellEditEndingEventArgs.prototype, "refresh", {
        get: function () {
            return this._refresh;
        },
        set: function (value) {
            this._refresh = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    return CellEditEndingEventArgs;
}(CellRangeEventArgs));
exports.CellEditEndingEventArgs = CellEditEndingEventArgs;
'use strict';
var CellType;
(function (CellType) {
    CellType[CellType["None"] = 0] = "None";
    CellType[CellType["Cell"] = 1] = "Cell";
    CellType[CellType["ColumnHeader"] = 2] = "ColumnHeader";
    CellType[CellType["RowHeader"] = 3] = "RowHeader";
    CellType[CellType["TopLeft"] = 4] = "TopLeft";
    CellType[CellType["ColumnFooter"] = 5] = "ColumnFooter";
    CellType[CellType["BottomLeft"] = 6] = "BottomLeft";
})(CellType = exports.CellType || (exports.CellType = {}));
var GridPanel = (function () {
    function GridPanel(g, cellType, rows, cols, host) {
        this._offsetY = 0;
        this._g = wjcCore.asType(g, FlexGrid);
        this._ct = wjcCore.asInt(cellType);
        this._rows = wjcCore.asType(rows, RowCollection);
        this._cols = wjcCore.asType(cols, ColumnCollection);
        this._e = wjcCore.asType(host, HTMLElement);
        this._vrb = new CellRange();
    }
    Object.defineProperty(GridPanel.prototype, "grid", {
        get: function () {
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridPanel.prototype, "cellType", {
        get: function () {
            return this._ct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridPanel.prototype, "viewRange", {
        get: function () {
            return this._getViewRange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridPanel.prototype, "width", {
        get: function () {
            return this._cols.getTotalSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridPanel.prototype, "height", {
        get: function () {
            return this._rows.getTotalSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridPanel.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridPanel.prototype, "columns", {
        get: function () {
            return this._cols;
        },
        enumerable: true,
        configurable: true
    });
    GridPanel.prototype.getCellData = function (r, c, formatted) {
        var row = this._rows[wjcCore.asNumber(r, false, true)], col, value = null;
        if (wjcCore.isString(c)) {
            c = this._cols.indexOf(c);
            if (c < 0) {
                throw 'Invalid column name or binding.';
            }
        }
        col = this._cols[wjcCore.asNumber(c, false, true)];
        var bcol = this._g ? this._g._getBindingColumn(this, r, col) : col;
        if (bcol.binding && row.dataItem &&
            !(row.dataItem instanceof wjcCore.CollectionViewGroup)) {
            value = bcol._binding.getValue(row.dataItem);
        }
        else if (row._ubv) {
            value = row._ubv[col._hash];
        }
        if (value == null) {
            switch (this._ct) {
                case CellType.ColumnHeader:
                    if (r == this._rows.length - 1 || bcol != col) {
                        value = bcol.header;
                    }
                    break;
                case CellType.ColumnFooter:
                    if (bcol.aggregate != wjcCore.Aggregate.None && row instanceof GroupRow) {
                        var view = this._g.collectionView;
                        if (view) {
                            var cv = wjcCore.tryCast(view, wjcCore.CollectionView);
                            value = cv
                                ? cv.getAggregate(bcol.aggregate, bcol.binding)
                                : wjcCore.getAggregate(bcol.aggregate, view.items, bcol.binding);
                        }
                    }
                    break;
                case CellType.Cell:
                    if (bcol.aggregate != wjcCore.Aggregate.None && row instanceof GroupRow) {
                        var group = wjcCore.tryCast(row.dataItem, wjcCore.CollectionViewGroup);
                        if (group) {
                            value = group.getAggregate(bcol.aggregate, bcol.binding, this._g.collectionView);
                        }
                    }
                    break;
            }
        }
        if (formatted) {
            if (this.cellType == CellType.Cell && bcol.dataMap) {
                value = bcol.dataMap.getDisplayValue(value);
            }
            value = value != null ? wjcCore.Globalize.format(value, bcol.format) : '';
        }
        return value;
    };
    GridPanel.prototype.setCellData = function (r, c, value, coerce, invalidate) {
        if (coerce === void 0) { coerce = true; }
        if (invalidate === void 0) { invalidate = true; }
        var row = this._rows[wjcCore.asNumber(r, false, true)], col;
        if (wjcCore.isString(c)) {
            c = this._cols.indexOf(c);
            if (c < 0) {
                throw 'Invalid column name or binding.';
            }
        }
        col = this._cols[wjcCore.asNumber(c, false, true)];
        var bcol = this._g ? this._g._getBindingColumn(this, r, col) : col;
        if (this._ct == CellType.Cell) {
            if (bcol.dataMap && value != null) {
                if (bcol.isRequired || value != '') {
                    var map = bcol.dataMap, key = map.getKeyValue(value);
                    if (key == null && map.getDisplayValue(null) == null) {
                        if (!map.isEditable || map.displayMemberPath != map.selectedValuePath) {
                            return false;
                        }
                    }
                    else {
                        value = key;
                    }
                }
            }
            var targetType = wjcCore.DataType.Object;
            if (bcol.dataType) {
                targetType = bcol.dataType;
            }
            else {
                var current = this.getCellData(r, c, false);
                targetType = wjcCore.getType(current);
            }
            if (wjcCore.isBoolean(bcol.isRequired)) {
                if (!bcol.isRequired && (value === '' || value === null)) {
                    value = null;
                    coerce = false;
                }
                else if (bcol.isRequired && (value === '' || value === null)) {
                    return false;
                }
            }
            if (coerce) {
                value = wjcCore.changeType(value, targetType, bcol.format);
                if (targetType != wjcCore.DataType.Object && wjcCore.getType(value) != targetType) {
                    return false;
                }
            }
        }
        if (row.dataItem && bcol.binding) {
            var binding = bcol._binding, item = row.dataItem, oldValue = binding.getValue(item);
            if (value !== oldValue && !wjcCore.DateTime.equals(value, oldValue)) {
                binding.setValue(item, value);
                var view = this._g.collectionView;
                if (view instanceof wjcCore.CollectionView && item != view.currentEditItem) {
                    var e = new wjcCore.NotifyCollectionChangedEventArgs(wjcCore.NotifyCollectionChangedAction.Change, item, view.items.indexOf(item));
                    view.onCollectionChanged(e);
                }
            }
        }
        else {
            if (!row._ubv)
                row._ubv = {};
            row._ubv[col._hash] = value;
        }
        if (invalidate && this._g) {
            this._g.invalidate();
        }
        return true;
    };
    GridPanel.prototype.getCellBoundingRect = function (r, c, raw) {
        var row = this.rows[r], col = this.columns[c], rc = new wjcCore.Rect(col.pos, row.pos, col.renderSize, row.renderSize);
        if (this._g.rightToLeft) {
            rc.left = this.hostElement.clientWidth - rc.right;
            if (!wjcCore.isIE() && !wjcCore.isFirefox()) {
                var root = this.hostElement.parentElement;
                rc.left -= root.offsetWidth - root.clientWidth;
            }
        }
        if (!raw) {
            var rcp = this.hostElement.getBoundingClientRect();
            rc.left += rcp.left;
            rc.top += rcp.top - this._offsetY;
        }
        if (r < this.rows.frozen) {
            rc.top -= this._g.scrollPosition.y;
        }
        if (c < this.columns.frozen) {
            rc.left -= this._g.scrollPosition.x * (this._g.rightToLeft ? -1 : +1);
        }
        return rc;
    };
    GridPanel.prototype.getCellElement = function (r, c) {
        var rows = this.hostElement.children, nrows = Math.min(r + 2, rows.length);
        for (var i = 0; i < nrows; i++) {
            var row = rows[i].children, ncols = Math.min(c + 2, row.length);
            for (var j = 0; j < ncols; j++) {
                var cell = row[j], index = cell[GridPanel._INDEX_KEY];
                if (index) {
                    if ((index.row == r && index.col == c) ||
                        (index.rng && index.rng.contains(r, c))) {
                        return cell;
                    }
                }
            }
        }
        return null;
    };
    GridPanel.prototype.getSelectedState = function (r, c, rng) {
        var g = this._g, mode = g.selectionMode, sel = g._selHdl.selection, sm = SelectionMode, ss = SelectedState;
        if (mode != sm.None) {
            switch (this._ct) {
                case CellType.Cell:
                    if (!rng) {
                        rng = g.getMergedRange(this, r, c);
                    }
                    if (rng) {
                        if (rng.contains(sel.row, sel.col)) {
                            return g.showMarquee ? ss.None : ss.Cursor;
                        }
                        else if (rng.intersects(sel)) {
                            return ss.Selected;
                        }
                    }
                    if (sel.row == r && sel.col == c) {
                        return g.showMarquee ? ss.None : ss.Cursor;
                    }
                    if (g.rows[r].isSelected || g.columns[c].isSelected) {
                        return ss.Selected;
                    }
                    if (rng) {
                        switch (mode) {
                            case sm.Row:
                            case sm.RowRange:
                            case sm.ListBox:
                                if (rng.containsRow(sel.row)) {
                                    return ss.Selected;
                                }
                        }
                    }
                    sel = g._selHdl._adjustSelection(sel);
                    if (mode == SelectionMode.ListBox) {
                        return ss.None;
                    }
                    return sel.containsRow(r) && sel.containsColumn(c)
                        ? ss.Selected
                        : ss.None;
                case CellType.ColumnHeader:
                    if (g.showSelectedHeaders & HeadersVisibility.Column) {
                        if (g.columns[c].isSelected || sel.containsColumn(c) || sel.intersectsColumn(rng)) {
                            if (rng)
                                r = rng.bottomRow;
                            if (r == this.rows.length - 1) {
                                return ss.Selected;
                            }
                        }
                    }
                    break;
                case CellType.RowHeader:
                    if (g.showSelectedHeaders & HeadersVisibility.Row) {
                        if (g.rows[r].isSelected || sel.containsRow(r) || sel.intersectsRow(rng)) {
                            if (rng)
                                c = rng.rightCol;
                            if (c == this.columns.length - 1) {
                                return ss.Selected;
                            }
                        }
                    }
                    break;
            }
        }
        return ss.None;
    };
    Object.defineProperty(GridPanel.prototype, "hostElement", {
        get: function () {
            return this._e;
        },
        enumerable: true,
        configurable: true
    });
    GridPanel.prototype._getOffsetY = function () {
        return this._offsetY;
    };
    GridPanel.prototype._updateContent = function (recycle, state, offsetY) {
        var g = this._g, host = this._e, rows = this._rows, cols = this._cols, ct = this._ct;
        if (ct == CellType.ColumnHeader || ct == CellType.ColumnFooter || ct == CellType.RowHeader) {
            var sp = g._ptScrl, s = host.style;
            if (ct == CellType.RowHeader) {
                s.top = sp.y + 'px';
            }
            else {
                if (g.rightToLeft) {
                    s.right = sp.x + 'px';
                }
                else {
                    s.left = sp.x + 'px';
                }
            }
        }
        if (this._offsetY != offsetY) {
            recycle = false;
            this._offsetY = offsetY;
        }
        var vru = this._getViewRange();
        var vrb = vru;
        if (rows.length <= g.virtualizationThreshold) {
            vrb = new CellRange(0, 0, rows.length - 1, cols.length - 1);
        }
        else {
            if (vrb.isValid && g.isTouching) {
                var sz = 6;
                vrb = new CellRange(Math.max(vru.row - sz, rows.frozen), Math.max(vru.col - 1, cols.frozen), Math.min(vru.row2 + sz, rows.length - 1), Math.min(vru.col2 + 1, cols.length - 1));
            }
        }
        if (recycle && !state && this._vrb.contains(vru) && !rows.frozen && !cols.frozen) {
            return this._activeCell;
        }
        if (!recycle || !vrb.equals(this._vrb)) {
            state = false;
        }
        if (recycle && !state && this._ct != CellType.TopLeft) {
            this._reorderCells(vrb, this._vrb);
        }
        this._activeCell = null;
        this._vru = vru;
        this._vrb = vrb;
        this._cf = g.cellFactory;
        var ctr = 0;
        if (this._ct == CellType.Cell) {
            ctr = this._renderColHdrRow(vrb, state);
        }
        for (var r = 0; r < rows.frozen && r < rows.length; r++) {
            ctr = this._renderRow(r, vrb, state, ctr);
        }
        for (var r = vrb.topRow; r <= vrb.bottomRow && r > -1; r++) {
            ctr = this._renderRow(r, vrb, state, ctr);
        }
        while (host.childElementCount > ctr) {
            var row = host.lastElementChild;
            host.removeChild(row);
            this._removeExtraCells(row, 0);
        }
        return this._activeCell;
    };
    GridPanel.prototype._updateScrollPosition = function () {
        var g = this._g, sp = g._ptScrl, s = this.hostElement.style;
        if (this.cellType == CellType.RowHeader) {
            s.top = sp.y + 'px';
        }
        else {
            if (g.rightToLeft) {
                s.right = sp.x + 'px';
            }
            else {
                s.left = sp.x + 'px';
            }
        }
    };
    GridPanel.prototype._clearCells = function () {
        var host = this.hostElement;
        for (var i = host.childElementCount - 1; i >= 0; i--) {
            var row = host.children[i];
            host.removeChild(row);
            for (var j = row.childElementCount - 1; j >= 0; j--) {
                this._cf.disposeCell(row.children[j]);
            }
        }
    };
    GridPanel.prototype._reorderCells = function (rngNew, rngOld) {
        if (this._rows.frozen > 0 || this._cols.frozen > 0 ||
            rngNew.columnSpan != rngOld.columnSpan || rngNew.rowSpan != rngOld.rowSpan ||
            !rngOld.isValid || !rngNew.isValid || !rngNew.intersects(rngOld)) {
            return;
        }
        if (rngNew.row != rngOld.row) {
            var delta = rngNew.row - rngOld.row, limit = Math.max(1, rngNew.rowSpan - 1), host = this._e;
            if (delta != 0 && Math.abs(delta) < limit) {
                var first = this._ct == CellType.Cell ? 1 : 0, cnt = host.childElementCount;
                if (delta > 0) {
                    var start = first, end = Math.min(first + delta, cnt - 1), rng = this._createRange(start, end);
                    if (rng && end < cnt - 1) {
                        host.appendChild(rng.extractContents());
                    }
                }
                if (delta < 0) {
                    var end = cnt, start = Math.max(first, end + delta), rng = this._createRange(start, end);
                    if (rng && start > first) {
                        var ref = host.children[first];
                        host.insertBefore(rng.extractContents(), ref);
                    }
                }
            }
        }
    };
    GridPanel.prototype._createRange = function (start, end) {
        var rng, cnt = this._e.childElementCount;
        if (end > start && end <= cnt && start > -1) {
            rng = document.createRange();
            rng.setStart(this._e, start);
            rng.setEnd(this._e, end);
        }
        return rng;
    };
    GridPanel.prototype._renderColHdrRow = function (rng, state) {
        var row = this._e.children[0];
        if (!row) {
            row = wjcCore.createElement('<div class="wj-row" tabindex="-1" role="row"></div>', this._e);
        }
        wjcCore.setAttribute(row, 'aria-selected', null);
        var ctc = 0, rhBinding = this._g._getRowHeaderPath();
        if (rhBinding) {
            ctc = this._renderRowHdrCell(row, -1, rhBinding.path);
        }
        for (var c = 0; c < this.columns.frozen && c < this.columns.length; c++) {
            ctc = this._renderColHdrCell(row, c, rng, state, ctc);
        }
        for (var c = rng.leftCol; c <= rng.rightCol && c > -1; c++) {
            ctc = this._renderColHdrCell(row, c, rng, state, ctc);
        }
        this._removeExtraCells(row, ctc);
        return 1;
    };
    GridPanel.prototype._renderColHdrCell = function (row, c, rng, state, ctr) {
        var col = this.columns[c];
        if (col.renderSize <= 0) {
            return ctr;
        }
        var cell = row.children[ctr];
        if (!cell) {
            cell = wjcCore.createElement('<div class="wj-cell" tabindex="-1" role="columnheader"></div>', row);
        }
        if (!state) {
            cell.textContent = this.columns[c].header;
            wjcCore.setCss(cell, {
                position: 'fixed',
                top: -32000,
                height: .1,
                left: col.pos,
                width: col.renderWidth,
                overflow: 'hidden',
                opacity: '0',
                pointerEvents: 'none'
            });
        }
        var g = this.grid;
        if (g.allowSorting) {
            var attVal = 'none', bcol = g._getBindingColumn(this, 0, col);
            switch (bcol.currentSort) {
                case '+':
                    attVal = 'ascending';
                    break;
                case '-':
                    attVal = 'descending';
                    break;
            }
            wjcCore.setAttribute(cell, 'aria-sort', attVal);
        }
        cell[GridPanel._INDEX_KEY] = { row: -1, col: c, panel: this };
        return ctr + 1;
    };
    GridPanel.prototype._renderRowHdrCell = function (row, r, value) {
        var cell = row.children[0];
        if (!cell) {
            cell = wjcCore.createElement('<div class="wj-cell" tabindex="-1"></div>', row);
        }
        cell.setAttribute('role', r < 0 ? 'columnheader' : 'rowheader');
        cell.textContent = value ? value.toString() : '';
        wjcCore.setCss(cell, {
            position: 'fixed',
            left: -32000,
            top: -32000,
            width: .1,
            height: .1,
            overflow: 'hidden',
            opacity: '0'
        });
        cell[GridPanel._INDEX_KEY] = { row: r, col: -1, panel: this };
        return 1;
    };
    GridPanel.prototype._renderRow = function (r, rng, state, ctr) {
        var g = this._g, gr = this.rows[r], sz = gr.renderSize;
        if (sz <= 0) {
            return ctr;
        }
        var row = this._e.children[ctr];
        if (!row) {
            row = wjcCore.createElement('<div class="wj-row" tabindex="-1"></div>', this._e);
            if (this._ct == CellType.Cell) {
                row.setAttribute('role', 'row');
            }
        }
        if (this._ct == CellType.Cell) {
            var sm = SelectionMode;
            switch (g.selectionMode) {
                case sm.Row:
                case sm.RowRange:
                case sm.ListBox:
                    var selected = gr.isSelected || this._g._selHdl.selection.containsRow(r);
                    wjcCore.setAttribute(row, 'aria-selected', selected ? true : false);
            }
        }
        var ctc = 0;
        if (this._ct == CellType.Cell) {
            var rhBinding = this._g._getRowHeaderPath();
            if (rhBinding) {
                ctc = this._renderRowHdrCell(row, r, rhBinding.getValue(gr.dataItem));
            }
        }
        for (var c = 0; c < this.columns.frozen && c < this.columns.length; c++) {
            ctc = this._renderCell(row, r, c, rng, state, ctc);
        }
        for (var c = rng.leftCol; c <= rng.rightCol && c > -1; c++) {
            ctc = this._renderCell(row, r, c, rng, state, ctc);
        }
        this._removeExtraCells(row, ctc);
        return ctr + 1;
    };
    GridPanel.prototype._renderCell = function (row, r, c, rng, state, ctr) {
        var g = this._g, mrng = g.getMergedRange(this, r, c);
        if (mrng) {
            for (var over = Math.max(rng.row, mrng.row); over < r; over++) {
                if (this.rows[over].isVisible)
                    return ctr;
            }
            for (var over = Math.max(rng.col, mrng.col); over < c; over++) {
                if (this.columns[over].isVisible)
                    return ctr;
            }
        }
        var col = this.columns[c];
        if (col.renderSize <= 0) {
            if (!mrng || mrng.getRenderSize(this).width <= 0) {
                return ctr;
            }
        }
        var selected = false;
        if (this.cellType == CellType.Cell) {
            var sel = g._selHdl.selection;
            selected = (sel.row == r && sel.col == c) || (mrng && mrng.contains(sel.row, sel.col));
        }
        var cell = row.children[ctr];
        var selState = this.getSelectedState(r, c, mrng), ss = SelectedState;
        if (cell && state) {
            wjcCore.toggleClass(cell, 'wj-state-selected', selState == ss.Cursor);
            wjcCore.toggleClass(cell, 'wj-state-multi-selected', selState == ss.Selected);
            if (selected) {
                this._activeCell = cell;
            }
            return ctr + 1;
        }
        if (!cell) {
            cell = document.createElement('div');
            cell.tabIndex = -1;
            if (this._ct == CellType.Cell) {
                cell.setAttribute('role', 'gridcell');
            }
            row.appendChild(cell);
        }
        if (selected) {
            this._activeCell = cell;
        }
        g.cellFactory.updateCell(this, r, c, cell, mrng);
        cell[GridPanel._INDEX_KEY] = { row: r, col: c, rng: mrng, panel: this };
        return ctr + 1;
    };
    GridPanel.prototype._removeExtraCells = function (row, count) {
        while (row.childElementCount > count) {
            var cell = row.lastElementChild;
            row.removeChild(cell);
            this._cf.disposeCell(cell);
        }
    };
    GridPanel.prototype._getViewRange = function () {
        var g = this._g, sp = g._ptScrl, rows = this._rows, cols = this._cols, rng = new CellRange(0, 0, rows.length - 1, cols.length - 1);
        if (this._ct == CellType.Cell || this._ct == CellType.RowHeader) {
            var y = -sp.y + this._offsetY, h = g._szClient.height, fz = Math.min(rows.frozen, rows.length - 1);
            if (fz > 0) {
                var fzs = rows[fz - 1].pos;
                y += fzs;
                h -= fzs;
            }
            rng.row = Math.min(rows.length - 1, Math.max(rows.frozen, rows.getItemAt(y + 1)));
            rng.row2 = rows.getItemAt(y + h + 1);
            if (g._clipToScreen) {
                var rc = g.hostElement.getBoundingClientRect();
                if (rc.top < 0) {
                    rng.row = Math.max(rng.row, rows.getItemAt(-rc.top - g._ptScrl.y) - 1);
                }
                if (rc.bottom > innerHeight) {
                    rng.row2 = Math.min(rng.row2, rows.getItemAt(-rc.top - g._ptScrl.y + innerHeight) + 1);
                }
            }
        }
        if (this._ct == CellType.Cell || this._ct == CellType.ColumnHeader) {
            var x = -sp.x, w = g._szClient.width, fz = Math.min(cols.frozen, cols.length - 1);
            if (fz > 0) {
                var fzs = cols[fz - 1].pos;
                x += fzs;
                w -= fzs;
            }
            rng.col = Math.min(cols.length - 1, Math.max(cols.frozen, cols.getItemAt(x + 1)));
            rng.col2 = cols.getItemAt(x + w + 1);
        }
        if (rows.length <= rows.frozen) {
            rng.row = rng.row2 = -1;
        }
        if (cols.length <= cols.frozen) {
            rng.col = rng.col2 = -1;
        }
        return rng;
    };
    GridPanel.prototype._getFrozenPos = function () {
        var fzr = this._rows.frozen, fzc = this._cols.frozen, fzrow = fzr > 0 ? this._rows[fzr - 1] : null, fzcol = fzc > 0 ? this._cols[fzc - 1] : null, fzy = fzrow ? fzrow.pos + fzrow.renderSize : 0, fzx = fzcol ? fzcol.pos + fzcol.renderSize : 0;
        return new wjcCore.Point(fzx, fzy);
    };
    GridPanel._INDEX_KEY = 'wj-cell-index';
    return GridPanel;
}());
exports.GridPanel = GridPanel;
'use strict';
var CellFactory = (function () {
    function CellFactory() {
    }
    CellFactory.prototype.updateCell = function (p, r, c, cell, rng, updateContent) {
        var g = p.grid, rtl = g.rightToLeft, ct = p.cellType, rows = p.rows, cols = p.columns, row = rows[r], col = cols[c], r2 = r, c2 = c, gr = (row instanceof GroupRow ? row : null), nr = (row instanceof _NewRowTemplate ? row : null), cellWidth = col.renderWidth, cellHeight = row.renderHeight, cl = 'wj-cell', css = { display: '' };
        if (updateContent != false && cell.firstElementChild) {
            if (cell.childNodes.length != 1 || cell.firstElementChild.type != 'checkbox') {
                cell.textContent = '';
            }
        }
        if (rng && !rng.isSingleCell) {
            r = rng.row;
            c = rng.col;
            r2 = rng.row2;
            c2 = rng.col2;
            row = rows[r];
            col = cols[c];
            gr = row instanceof GroupRow ? row : null;
            var sz = rng.getRenderSize(p);
            cellHeight = sz.height;
            cellWidth = sz.width;
        }
        var bcol = g._getBindingColumn(p, r, col);
        var checkBox = bcol.dataType == wjcCore.DataType.Boolean && !bcol.dataMap;
        var cpos = col.pos, rpos = row.pos;
        if (g._useFrozenDiv() && ct == CellType.Cell && !g.editRange) {
            if (r < rows.frozen && c >= cols.frozen) {
                cpos += g._ptScrl.x;
            }
            if (c < cols.frozen && r >= rows.frozen) {
                rpos += g._ptScrl.y;
            }
        }
        else {
            if (r < rows.frozen) {
                rpos -= g._ptScrl.y;
            }
            if (c < cols.frozen) {
                cpos -= g._ptScrl.x;
            }
        }
        if (rtl) {
            css.right = cpos + 'px';
        }
        else {
            css.left = cpos + 'px';
        }
        css.top = (rpos - p._getOffsetY()) + 'px';
        css.width = cellWidth + 'px';
        css.height = cellHeight + 'px';
        css.zIndex = '';
        if (r < rows.frozen || c < cols.frozen) {
            css.zIndex = (r < rows.frozen && c < cols.frozen) ? 2 : 1;
        }
        if (ct == CellType.Cell) {
            if (gr) {
                cl += ' wj-group';
            }
            if (g.showAlternatingRows && row.visibleIndex % 2 != 0) {
                if (!rng || (rng.row == rng.row2)) {
                    cl += ' wj-alt';
                }
            }
            if (r < rows.frozen || c < cols.frozen) {
                cl += ' wj-frozen';
            }
            if (nr) {
                cl += ' wj-new';
            }
            if (row.cssClass) {
                cl += ' ' + row.cssClass;
            }
            if (bcol.cssClass) {
                cl += ' ' + bcol.cssClass;
            }
        }
        else {
            cl += ' wj-header';
            if (g.showAlternatingRows && r % 2 != 0) {
                cl += ' wj-header-alt';
            }
        }
        if (ct == CellType.Cell || ct == CellType.RowHeader) {
            if (g._getShowErrors()) {
                var error = g._getError(p, r, c);
                wjcCore.setAttribute(cell, 'title', error);
                if (error) {
                    cl += ' wj-state-invalid';
                }
            }
        }
        var selState = p.getSelectedState(r, c, rng);
        if (selState != SelectedState.None &&
            ct == CellType.Cell && !checkBox &&
            g.editRange && g.editRange.contains(r, c)) {
            selState = SelectedState.None;
        }
        switch (selState) {
            case SelectedState.Cursor:
                cl += ' wj-state-selected';
                break;
            case SelectedState.Selected:
                cl += ' wj-state-multi-selected';
                break;
        }
        if (r2 == rows.frozen - 1) {
            cl += ' wj-frozen-row';
        }
        if (c2 == cols.frozen - 1) {
            cl += ' wj-frozen-col';
        }
        if (bcol.wordWrap || row.wordWrap) {
            cl += ' wj-wrap';
        }
        css.textAlign = bcol.getAlignment();
        css.paddingLeft = css.paddingRight = css.paddingTop = css.paddingBottom = '';
        if (ct == CellType.Cell) {
            if (g.rows.maxGroupLevel > -1) {
                if (c == g.columns.firstVisibleIndex && g.treeIndent) {
                    var level = gr ? Math.max(0, gr.level) : (g.rows.maxGroupLevel + 1), indent = g.treeIndent * level + g._cellPadding;
                    if (rtl) {
                        css.paddingRight = indent + 'px';
                    }
                    else {
                        css.paddingLeft = indent + 'px';
                    }
                }
            }
        }
        if (updateContent != false) {
            var data = p.getCellData(r, c, false), content = p.getCellData(r, c, true);
            if (ct == CellType.Cell && c == g.columns.firstVisibleIndex &&
                gr && gr.hasChildren && !this._isEditingCell(g, r, c)) {
                if (!content) {
                    content = gr.getGroupHeader();
                }
                cell.innerHTML = this._getTreeIcon(gr) + ' ' + content;
                css.textAlign = '';
            }
            else if (ct == CellType.ColumnHeader && bcol.currentSort && g.showSort && (r2 == g._getSortRowIndex() || bcol != col)) {
                cl += ' wj-sort-' + (bcol.currentSort == '+' ? 'asc' : 'desc');
                cell.innerHTML = wjcCore.escapeHtml(content) + '&nbsp;' + this._getSortIcon(bcol);
            }
            else if (ct == CellType.RowHeader && c == g.rowHeaders.columns.length - 1 && !content) {
                var ecv = g.editableCollectionView, editItem = ecv ? ecv.currentEditItem : null;
                if (editItem && row.dataItem == editItem) {
                    cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
                }
                else if (row instanceof _NewRowTemplate) {
                    cell.innerHTML = '<span class="wj-glyph-asterisk"></span>';
                }
            }
            else if (ct == CellType.Cell &&
                bcol.dataType == wjcCore.DataType.Boolean && !bcol.dataMap &&
                (!gr || wjcCore.isBoolean(data))) {
                var chk = cell.firstChild;
                if (!(chk instanceof HTMLInputElement) || chk.type != 'checkbox') {
                    cell.innerHTML = '<input type="checkbox" class="wj-cell-check" tabindex="-1"/>';
                    chk = cell.firstChild;
                }
                chk.checked = data == true ? true : false;
                chk.indeterminate = data == null;
                chk.disabled = !g.canEditCell(r, c);
                if (chk.disabled) {
                    chk.style.cursor = 'default';
                }
                if (g.editRange && g.editRange.contains(r, c)) {
                    g._edtHdl._edt = chk;
                }
            }
            else if (ct == CellType.Cell && this._isEditingCell(g, r, c)) {
                var inpType = bcol.inputType;
                if (!bcol.inputType) {
                    inpType = bcol.dataType == wjcCore.DataType.Number && !bcol.dataMap ? 'tel' : 'text';
                }
                if (!bcol.dataMap && !bcol.mask) {
                    var val = p.getCellData(r, c, false);
                    if (wjcCore.isNumber(val)) {
                        var str = val.toString(), fmt = bcol.format;
                        if (fmt && val != Math.round(val)) {
                            var dec = str.match(/\.(\d+)/)[1].length;
                            fmt = fmt.replace(/([a-z])(\d*)(.*)/ig, '$01' + dec + '$3');
                        }
                        content = wjcCore.Globalize.formatNumber(val, fmt, true);
                    }
                }
                cell.innerHTML = '<input type="' + inpType + '" class="wj-grid-editor wj-form-control">';
                var edt = cell.children[0];
                edt.value = content;
                edt.required = bcol.getIsRequired();
                if (bcol.maxLength) {
                    edt.maxLength = bcol.maxLength;
                }
                edt.style.textAlign = bcol.getAlignment();
                css.paddingTop = css.paddingBottom = '0px';
                if (bcol.mask) {
                    new wjcCore._MaskProvider(edt, bcol.mask);
                }
                g._edtHdl._edt = edt;
            }
            else {
                if (ct == CellType.Cell && (row.isContentHtml || bcol.isContentHtml)) {
                    cell.innerHTML = content;
                }
                else {
                    cell.textContent = content || '';
                }
            }
            if (ct == CellType.Cell && (tryGetModuleWijmoInput()) && bcol.dataMap && g.showDropDown &&
                bcol.showDropDown != false && g.canEditCell(r, c)) {
                if (!CellFactory._ddIcon) {
                    CellFactory._ddIcon = wjcCore.createElement('<div role="button" class="' + CellFactory._WJC_DROPDOWN + '">' +
                        '<span class="wj-glyph-down"></span>' +
                        '</div>');
                }
                var dd = CellFactory._ddIcon.cloneNode(true);
                cell.appendChild(dd);
            }
        }
        var draggable = false;
        switch (ct) {
            case CellType.RowHeader:
                draggable = !gr && !nr && row.allowDragging && (g.allowDragging & AllowDragging.Rows) != 0;
                wjcCore.setAttribute(cell, 'draggable', draggable ? 'true' : null);
                break;
            case CellType.ColumnHeader:
                draggable = col.allowDragging && (g.allowDragging & AllowDragging.Columns) != 0;
                wjcCore.setAttribute(cell, 'draggable', draggable ? 'true' : null);
                break;
        }
        if (cell.className != cl) {
            cell.className = cl;
        }
        var style = cell.style;
        for (var k in css) {
            style[k] = css[k];
        }
        if (g._edtHdl._edt && g._edtHdl._edt.parentElement == cell) {
            var root = g._root, rcRoot = root.getBoundingClientRect(), rcCell = cell.getBoundingClientRect(), maxHei = rcRoot.top + root.clientHeight - rcCell.top, maxWid = rcRoot.left + root.clientWidth - rcCell.left;
            if (rcCell.height > maxHei) {
                cell.style.height = maxHei + 'px';
            }
            if (rcCell.width > maxWid) {
                cell.style.width = maxWid + 'px';
            }
        }
        if (g.itemFormatter) {
            g.itemFormatter(p, r, c, cell);
        }
        if (g.formatItem.hasHandlers) {
            var rng_1 = CellFactory._fmtRng;
            if (!rng_1) {
                rng_1 = CellFactory._fmtRng = new CellRange(r, c, r2, c2);
            }
            else {
                rng_1.setRange(r, c, r2, c2);
            }
            var e = new FormatItemEventArgs(p, rng_1, cell);
            g.onFormatItem(e);
        }
    };
    CellFactory.prototype.disposeCell = function (cell) {
    };
    CellFactory.prototype.getEditorValue = function (g) {
        var edt = g._edtHdl._edt;
        if (edt instanceof HTMLInputElement) {
            if (edt.type == 'checkbox') {
                return edt.checked;
            }
            var maxLen = edt.maxLength;
            if (wjcCore.isNumber(maxLen) && maxLen > -1 && edt.value.length > maxLen) {
                return edt.value.substr(0, maxLen);
            }
            return edt.value;
        }
        return null;
    };
    CellFactory.prototype._isEditingCell = function (g, r, c) {
        return g.editRange && g.editRange.contains(r, c);
    };
    CellFactory.prototype._getTreeIcon = function (gr) {
        var glyph = 'wj-glyph-' +
            (gr.isCollapsed ? '' : 'down-') +
            (gr.grid.rightToLeft ? 'left' : 'right');
        return '<span role="button" class="' + CellFactory._WJC_COLLAPSE + ' ' + glyph + '"></span>';
    };
    CellFactory.prototype._getSortIcon = function (col) {
        return '<span class="wj-glyph-' + (col.currentSort == '+' ? 'up' : 'down') + '"></span>';
    };
    CellFactory._WJC_COLLAPSE = 'wj-elem-collapse';
    CellFactory._WJC_DROPDOWN = 'wj-elem-dropdown';
    return CellFactory;
}());
exports.CellFactory = CellFactory;
'use strict';
var CellRange = (function () {
    function CellRange(r, c, r2, c2) {
        if (r === void 0) { r = -1; }
        if (c === void 0) { c = -1; }
        if (r2 === void 0) { r2 = r; }
        if (c2 === void 0) { c2 = c; }
        this.setRange(r, c, r2, c2);
    }
    CellRange.prototype.setRange = function (r, c, r2, c2) {
        if (r === void 0) { r = -1; }
        if (c === void 0) { c = -1; }
        if (r2 === void 0) { r2 = r; }
        if (c2 === void 0) { c2 = c; }
        this._row = wjcCore.asInt(r);
        this._col = wjcCore.asInt(c);
        this._row2 = wjcCore.asInt(r2);
        this._col2 = wjcCore.asInt(c2);
    };
    Object.defineProperty(CellRange.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (value) {
            this._row = wjcCore.asInt(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "col", {
        get: function () {
            return this._col;
        },
        set: function (value) {
            this._col = wjcCore.asInt(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "row2", {
        get: function () {
            return this._row2;
        },
        set: function (value) {
            this._row2 = wjcCore.asInt(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "col2", {
        get: function () {
            return this._col2;
        },
        set: function (value) {
            this._col2 = wjcCore.asInt(value);
        },
        enumerable: true,
        configurable: true
    });
    CellRange.prototype.clone = function () {
        return new CellRange(this._row, this._col, this._row2, this._col2);
    };
    Object.defineProperty(CellRange.prototype, "rowSpan", {
        get: function () {
            return Math.abs(this._row2 - this._row) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "columnSpan", {
        get: function () {
            return Math.abs(this._col2 - this._col) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "topRow", {
        get: function () {
            return Math.min(this._row, this._row2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "bottomRow", {
        get: function () {
            return Math.max(this._row, this._row2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "leftCol", {
        get: function () {
            return Math.min(this._col, this._col2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "rightCol", {
        get: function () {
            return Math.max(this._col, this._col2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "isValid", {
        get: function () {
            return this._row > -1 && this._col > -1 && this._row2 > -1 && this._col2 > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellRange.prototype, "isSingleCell", {
        get: function () {
            return this._row == this._row2 && this._col == this._col2;
        },
        enumerable: true,
        configurable: true
    });
    CellRange.prototype.contains = function (r, c) {
        var rng = wjcCore.tryCast(r, CellRange);
        if (rng) {
            return rng.topRow >= this.topRow && rng.bottomRow <= this.bottomRow &&
                rng.leftCol >= this.leftCol && rng.rightCol <= this.rightCol;
        }
        if (wjcCore.isInt(r) && wjcCore.isInt(c)) {
            return r >= this.topRow && r <= this.bottomRow &&
                c >= this.leftCol && c <= this.rightCol;
        }
        throw 'contains expects a CellRange or row/column indices.';
    };
    CellRange.prototype.containsRow = function (r) {
        return wjcCore.asInt(r) >= this.topRow && r <= this.bottomRow;
    };
    CellRange.prototype.containsColumn = function (c) {
        return wjcCore.asInt(c) >= this.leftCol && c <= this.rightCol;
    };
    CellRange.prototype.intersects = function (rng) {
        return this.intersectsRow(rng) && this.intersectsColumn(rng);
    };
    CellRange.prototype.intersectsRow = function (rng) {
        return rng && !(this.bottomRow < rng.topRow || this.topRow > rng.bottomRow);
    };
    CellRange.prototype.intersectsColumn = function (rng) {
        return rng && !(this.rightCol < rng.leftCol || this.leftCol > rng.rightCol);
    };
    CellRange.prototype.getRenderSize = function (p) {
        var sz = new wjcCore.Size(0, 0);
        if (this.isValid) {
            for (var r = this.topRow; r <= this.bottomRow; r++) {
                sz.height += p.rows[r].renderSize;
            }
            for (var c = this.leftCol; c <= this.rightCol; c++) {
                sz.width += p.columns[c].renderSize;
            }
        }
        return sz;
    };
    CellRange.prototype.equals = function (rng) {
        return (rng instanceof CellRange) &&
            this._row == rng._row && this._col == rng._col &&
            this._row2 == rng._row2 && this._col2 == rng._col2;
    };
    return CellRange;
}());
exports.CellRange = CellRange;
'use strict';
var RowColFlags;
(function (RowColFlags) {
    RowColFlags[RowColFlags["Visible"] = 1] = "Visible";
    RowColFlags[RowColFlags["AllowResizing"] = 2] = "AllowResizing";
    RowColFlags[RowColFlags["AllowDragging"] = 4] = "AllowDragging";
    RowColFlags[RowColFlags["AllowMerging"] = 8] = "AllowMerging";
    RowColFlags[RowColFlags["AllowSorting"] = 16] = "AllowSorting";
    RowColFlags[RowColFlags["AutoGenerated"] = 32] = "AutoGenerated";
    RowColFlags[RowColFlags["Collapsed"] = 64] = "Collapsed";
    RowColFlags[RowColFlags["ParentCollapsed"] = 128] = "ParentCollapsed";
    RowColFlags[RowColFlags["Selected"] = 256] = "Selected";
    RowColFlags[RowColFlags["ReadOnly"] = 512] = "ReadOnly";
    RowColFlags[RowColFlags["HtmlContent"] = 1024] = "HtmlContent";
    RowColFlags[RowColFlags["WordWrap"] = 2048] = "WordWrap";
    RowColFlags[RowColFlags["HasTemplate"] = 4096] = "HasTemplate";
    RowColFlags[RowColFlags["RowDefault"] = 3] = "RowDefault";
    RowColFlags[RowColFlags["ColumnDefault"] = 23] = "ColumnDefault";
})(RowColFlags = exports.RowColFlags || (exports.RowColFlags = {}));
var RowCol = (function () {
    function RowCol() {
        this._list = null;
        this._pos = 0;
        this._idx = -1;
        this._vidx = -1;
    }
    Object.defineProperty(RowCol.prototype, "visible", {
        get: function () {
            return this._getFlag(RowColFlags.Visible);
        },
        set: function (value) {
            this._setFlag(RowColFlags.Visible, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "isVisible", {
        get: function () {
            if (!this._getFlag(RowColFlags.Visible)) {
                return false;
            }
            if (this._getFlag(RowColFlags.ParentCollapsed) && !(this instanceof _NewRowTemplate)) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "pos", {
        get: function () {
            if (this._list && this._list._dirty) {
                this._list._update();
            }
            return this._pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "index", {
        get: function () {
            if (this._list && this._list._dirty) {
                this._list._update();
            }
            return this._idx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "visibleIndex", {
        get: function () {
            if (this._list && this._list._dirty) {
                this._list._update();
            }
            return this.isVisible ? this._vidx : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "size", {
        get: function () {
            return this._sz;
        },
        set: function (value) {
            if (value != this._sz) {
                this._sz = wjcCore.asNumber(value, true);
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "renderSize", {
        get: function () {
            if (!this.isVisible) {
                return 0;
            }
            var sz = this._sz, list = this._list;
            if (list) {
                if (sz == null || sz < 0) {
                    sz = Math.round((list).defaultSize);
                }
                if (list.minSize != null && sz < list.minSize) {
                    sz = list.minSize;
                }
                if (list.maxSize != null && sz > list.maxSize) {
                    sz = list.maxSize;
                }
            }
            if (this._szMin != null && sz < this._szMin) {
                sz = this._szMin;
            }
            if (this._szMax != null && sz > this._szMax) {
                sz = this._szMax;
            }
            return Math.round(sz);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "allowResizing", {
        get: function () {
            return this._getFlag(RowColFlags.AllowResizing);
        },
        set: function (value) {
            this._setFlag(RowColFlags.AllowResizing, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "allowDragging", {
        get: function () {
            return this._getFlag(RowColFlags.AllowDragging);
        },
        set: function (value) {
            this._setFlag(RowColFlags.AllowDragging, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "allowMerging", {
        get: function () {
            return this._getFlag(RowColFlags.AllowMerging);
        },
        set: function (value) {
            this._setFlag(RowColFlags.AllowMerging, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "isSelected", {
        get: function () {
            return this._getFlag(RowColFlags.Selected);
        },
        set: function (value) {
            if (this._setFlag(RowColFlags.Selected, value, true)) {
                var g = this.grid;
                if (g) {
                    g.refreshCells(false, true, true);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "isReadOnly", {
        get: function () {
            return this._getFlag(RowColFlags.ReadOnly);
        },
        set: function (value) {
            this._setFlag(RowColFlags.ReadOnly, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "isContentHtml", {
        get: function () {
            return this._getFlag(RowColFlags.HtmlContent);
        },
        set: function (value) {
            if (this.isContentHtml != value) {
                this._setFlag(RowColFlags.HtmlContent, value);
                if (this.grid) {
                    this.grid.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "wordWrap", {
        get: function () {
            return this._getFlag(RowColFlags.WordWrap);
        },
        set: function (value) {
            this._setFlag(RowColFlags.WordWrap, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "cssClass", {
        get: function () {
            return this._cssClass;
        },
        set: function (value) {
            if (value != this._cssClass) {
                this._cssClass = wjcCore.asString(value);
                if (this.grid) {
                    this.grid.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "grid", {
        get: function () {
            return this._list ? this._list._g : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowCol.prototype, "collectionView", {
        get: function () {
            return this.grid ? this.grid.collectionView : null;
        },
        enumerable: true,
        configurable: true
    });
    RowCol.prototype.onPropertyChanged = function () {
        if (this._list) {
            this._list._dirty = true;
            this.grid.invalidate();
        }
    };
    RowCol.prototype._getFlag = function (flag) {
        return (this._f & flag) != 0;
    };
    RowCol.prototype._setFlag = function (flag, value, quiet) {
        if (value != this._getFlag(flag)) {
            this._f = value ? (this._f | flag) : (this._f & ~flag);
            if (!quiet) {
                this.onPropertyChanged();
            }
            return true;
        }
        return false;
    };
    return RowCol;
}());
exports.RowCol = RowCol;
var Column = (function (_super) {
    __extends(Column, _super);
    function Column(options) {
        var _this = _super.call(this) || this;
        _this._f = RowColFlags.ColumnDefault;
        _this._hash = Column._ctr.toString(36);
        Column._ctr++;
        if (options) {
            wjcCore.copy(_this, options);
        }
        return _this;
    }
    Object.defineProperty(Column.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "dataType", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            if (this._type != value) {
                this._type = wjcCore.asEnum(value, wjcCore.DataType);
                if (this.grid) {
                    this.grid.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isRequired", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = wjcCore.asBoolean(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "showDropDown", {
        get: function () {
            return this._showDropDown;
        },
        set: function (value) {
            if (value != this._showDropDown) {
                this._showDropDown = wjcCore.asBoolean(value, true);
                if (this.grid) {
                    this.grid.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "dropDownCssClass", {
        get: function () {
            return this._ddCssClass;
        },
        set: function (value) {
            this._ddCssClass = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "inputType", {
        get: function () {
            return this._inpType;
        },
        set: function (value) {
            this._inpType = wjcCore.asString(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "mask", {
        get: function () {
            return this._mask;
        },
        set: function (value) {
            this._mask = wjcCore.asString(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "maxLength", {
        get: function () {
            return this._maxLen;
        },
        set: function (value) {
            this._maxLen = wjcCore.asNumber(value, true, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "binding", {
        get: function () {
            return this._binding ? this._binding.path : null;
        },
        set: function (value) {
            if (value != this.binding) {
                var path = wjcCore.asString(value);
                this._binding = path ? new wjcCore.Binding(path) : null;
                if (!this._type && this.grid && this._binding) {
                    var view = this.grid.collectionView;
                    if (view && view.sourceCollection && view.sourceCollection.length) {
                        var item = view.sourceCollection[0];
                        this._type = wjcCore.getType(this._binding.getValue(item));
                    }
                }
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "sortMemberPath", {
        get: function () {
            return this._bindingSort ? this._bindingSort.path : null;
        },
        set: function (value) {
            if (value != this.sortMemberPath) {
                var path = wjcCore.asString(value);
                this._bindingSort = path ? new wjcCore.Binding(path) : null;
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "width", {
        get: function () {
            if (this._szStar != null) {
                return this._szStar;
            }
            else {
                return this.size;
            }
        },
        set: function (value) {
            if (Column._parseStarSize(value) != null) {
                this._szStar = value;
                this.onPropertyChanged();
            }
            else {
                this._szStar = null;
                this.size = wjcCore.asNumber(value, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "minWidth", {
        get: function () {
            return this._szMin;
        },
        set: function (value) {
            if (value != this._szMin) {
                this._szMin = wjcCore.asNumber(value, true, true);
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "maxWidth", {
        get: function () {
            return this._szMax;
        },
        set: function (value) {
            if (value != this._szMax) {
                this._szMax = wjcCore.asNumber(value, true, true);
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "quickAutoSize", {
        get: function () {
            return this._quickSize;
        },
        set: function (value) {
            this._quickSize = wjcCore.asBoolean(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Column.prototype._getQuickAutoSize = function () {
        if (!this.grid._getQuickAutoSize()) {
            return false;
        }
        return wjcCore.isBoolean(this._quickSize)
            ? this._quickSize
            : !this.isContentHtml && !this._getFlag(RowColFlags.HasTemplate);
    };
    Object.defineProperty(Column.prototype, "renderWidth", {
        get: function () {
            return this.renderSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "align", {
        get: function () {
            return this._align;
        },
        set: function (value) {
            if (this._align != value) {
                this._align = value;
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Column.prototype.getAlignment = function () {
        var value = this._align;
        if (value == null) {
            value = '';
            if (!this._map) {
                switch (this._type) {
                    case wjcCore.DataType.Boolean:
                        value = 'center';
                        break;
                    case wjcCore.DataType.Number:
                        value = 'right';
                        break;
                }
            }
        }
        return value;
    };
    Column.prototype.getIsRequired = function () {
        if (this._required != null) {
            return this._required;
        }
        if (this.dataType == wjcCore.DataType.String) {
            return (this.dataMap != null) || (this._mask && this._mask.length > 0);
        }
        return true;
    };
    Object.defineProperty(Column.prototype, "header", {
        get: function () {
            return this._hdr ? this._hdr : this.binding;
        },
        set: function (value) {
            if (this._hdr != value) {
                this._hdr = value;
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "dataMap", {
        get: function () {
            return this._map;
        },
        set: function (value) {
            if (this._map != value) {
                if (this._map) {
                    this._map.mapChanged.removeHandler(this.onPropertyChanged, this);
                }
                if (wjcCore.isArray(value)) {
                    value = new DataMap(value, null, null);
                }
                this._map = wjcCore.asType(value, DataMap, true);
                if (this._map) {
                    this._map.mapChanged.addHandler(this.onPropertyChanged, this);
                }
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "format", {
        get: function () {
            return this._fmt;
        },
        set: function (value) {
            if (this._fmt != value) {
                this._fmt = value;
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "allowSorting", {
        get: function () {
            return this._getFlag(RowColFlags.AllowSorting);
        },
        set: function (value) {
            this._setFlag(RowColFlags.AllowSorting, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "currentSort", {
        get: function () {
            if (this.grid && this.grid.collectionView && this.grid.collectionView.canSort) {
                var sds = this.grid.collectionView.sortDescriptions;
                for (var i = 0; i < sds.length; i++) {
                    if (sds[i].property == this._getBindingSort()) {
                        return sds[i].ascending ? '+' : '-';
                    }
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "aggregate", {
        get: function () {
            return this._agg != null ? this._agg : wjcCore.Aggregate.None;
        },
        set: function (value) {
            if (value != this._agg) {
                this._agg = wjcCore.asEnum(value, wjcCore.Aggregate);
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Column.prototype._getBindingSort = function () {
        return this.sortMemberPath ? this.sortMemberPath :
            this.binding ? this.binding :
                null;
    };
    Column._parseStarSize = function (value) {
        if (wjcCore.isString(value) && value.length > 0 && value[value.length - 1] == '*') {
            var sz = value.length == 1 ? 1 : value.substr(0, value.length - 1) * 1;
            if (sz > 0 && !isNaN(sz)) {
                return sz;
            }
        }
        return null;
    };
    Column._ctr = 0;
    return Column;
}(RowCol));
exports.Column = Column;
var Row = (function (_super) {
    __extends(Row, _super);
    function Row(dataItem) {
        var _this = _super.call(this) || this;
        _this._f = RowColFlags.ColumnDefault;
        _this._data = dataItem;
        return _this;
    }
    Object.defineProperty(Row.prototype, "dataItem", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "height", {
        get: function () {
            return this.size;
        },
        set: function (value) {
            this.size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "renderHeight", {
        get: function () {
            return this.renderSize;
        },
        enumerable: true,
        configurable: true
    });
    return Row;
}(RowCol));
exports.Row = Row;
var GroupRow = (function (_super) {
    __extends(GroupRow, _super);
    function GroupRow() {
        var _this = _super.call(this) || this;
        _this._level = -1;
        _this.isReadOnly = true;
        return _this;
    }
    Object.defineProperty(GroupRow.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            wjcCore.asInt(value);
            if (value != this._level) {
                this._level = value;
                this.onPropertyChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupRow.prototype, "hasChildren", {
        get: function () {
            if (this.grid != null && this._list != null) {
                this._list._update();
                var rNext = this.index < this._list.length - 1
                    ? this._list[this.index + 1]
                    : null;
                var gr = wjcCore.tryCast(rNext, GroupRow), nr = wjcCore.tryCast(rNext, _NewRowTemplate);
                return rNext != null && nr == null && (gr == null || gr.level > this.level);
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupRow.prototype, "isCollapsed", {
        get: function () {
            return this._getFlag(RowColFlags.Collapsed);
        },
        set: function (value) {
            wjcCore.asBoolean(value);
            if (value != this.isCollapsed && this._list != null) {
                this._setCollapsed(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    GroupRow.prototype.getGroupHeader = function () {
        var grid = this.grid, fmt = grid.groupHeaderFormat ? grid.groupHeaderFormat : wjcCore.culture.FlexGrid.groupHeaderFormat, group = wjcCore.tryCast(this.dataItem, wjcCore.CollectionViewGroup);
        if (group && fmt) {
            var propName = group.groupDescription['propertyName'], value = group.name, col = grid.getColumn(propName);
            var isHtml = this.isContentHtml;
            if (col) {
                isHtml = isHtml || col.isContentHtml;
                if (col.header) {
                    propName = col.header;
                }
                if (col.dataMap) {
                    value = col.dataMap.getDisplayValue(value);
                }
                else if (col.format) {
                    value = wjcCore.Globalize.format(value, col.format);
                }
            }
            var count = group.getAggregate(wjcCore.Aggregate.CntAll, null, grid.collectionView);
            return wjcCore.format(fmt, {
                name: wjcCore.escapeHtml(propName),
                value: isHtml ? value : wjcCore.escapeHtml(value),
                level: group.level,
                count: count
            });
        }
        return '';
    };
    GroupRow.prototype._setCollapsed = function (collapsed) {
        var _this = this;
        var g = this.grid, rows = g.rows, rng = this.getCellRange(), e = new CellRangeEventArgs(g.cells, new CellRange(this.index, -1)), gr;
        g.onGroupCollapsedChanging(e);
        if (e.cancel) {
            return;
        }
        g.deferUpdate(function () {
            _this._setFlag(RowColFlags.Collapsed, collapsed);
            for (var r = rng.topRow + 1; r <= rng.bottomRow && r > -1 && r < rows.length; r++) {
                rows[r]._setFlag(RowColFlags.ParentCollapsed, collapsed);
                gr = wjcCore.tryCast(rows[r], GroupRow);
                if (gr != null && gr.isCollapsed) {
                    r = gr.getCellRange().bottomRow;
                }
            }
        });
        g.onGroupCollapsedChanged(e);
    };
    GroupRow.prototype.getCellRange = function () {
        var rows = this._list, top = this.index, bottom = rows.length - 1;
        for (var r = top + 1; r <= bottom; r++) {
            var gr = wjcCore.tryCast(rows[r], GroupRow);
            if (gr != null && gr.level <= this.level) {
                bottom = r - 1;
                break;
            }
        }
        return new CellRange(top, 0, bottom, this.grid.columns.length - 1);
    };
    return GroupRow;
}(Row));
exports.GroupRow = GroupRow;
var RowColCollection = (function (_super) {
    __extends(RowColCollection, _super);
    function RowColCollection(g, defaultSize) {
        var _this = _super.call(this) || this;
        _this._frozen = 0;
        _this._vlen = 0;
        _this._szDef = 28;
        _this._szTot = 0;
        _this._dirty = false;
        _this._g = wjcCore.asType(g, FlexGrid);
        _this._szDef = wjcCore.asNumber(defaultSize, false, true);
        return _this;
    }
    Object.defineProperty(RowColCollection.prototype, "defaultSize", {
        get: function () {
            return this._szDef;
        },
        set: function (value) {
            if (this._szDef != value) {
                this._szDef = wjcCore.asNumber(value, false, true);
                this._dirty = true;
                this._g.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowColCollection.prototype, "frozen", {
        get: function () {
            return this._frozen;
        },
        set: function (value) {
            if (value != this._frozen) {
                this._frozen = wjcCore.asNumber(value, false, true);
                this._dirty = true;
                this._g.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    RowColCollection.prototype.isFrozen = function (index) {
        return index < this.frozen;
    };
    Object.defineProperty(RowColCollection.prototype, "minSize", {
        get: function () {
            return this._szMin;
        },
        set: function (value) {
            if (value != this._szMin) {
                this._szMin = wjcCore.asNumber(value, true, true);
                this._dirty = true;
                this._g.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowColCollection.prototype, "maxSize", {
        get: function () {
            return this._szMax;
        },
        set: function (value) {
            if (value != this._szMax) {
                this._szMax = wjcCore.asNumber(value, true, true);
                this._dirty = true;
                this._g.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    RowColCollection.prototype.getTotalSize = function () {
        if (this._dirty) {
            this._update();
        }
        return this._szTot;
    };
    Object.defineProperty(RowColCollection.prototype, "visibleLength", {
        get: function () {
            if (this._dirty) {
                this._update();
            }
            return this._vlen;
        },
        enumerable: true,
        configurable: true
    });
    RowColCollection.prototype.getItemAt = function (position) {
        if (this._dirty) {
            this._update();
        }
        if (position <= 0 && this.length > 0) {
            return 0;
        }
        position = Math.round(position);
        var len = this.length, min = 0, max = len - 1, cur, item;
        while (min <= max) {
            cur = (min + max) >>> 1;
            item = this[cur];
            if (item._pos > position && cur > 0) {
                max = cur - 1;
            }
            else if (item._pos + item.renderSize <= position && cur < len - 1) {
                min = cur + 1;
            }
            else {
                while (cur > 0 && !this[cur].visible) {
                    cur--;
                }
                while (cur < len - 1 && !this[cur].visible) {
                    cur++;
                }
                return cur;
            }
        }
        return max;
    };
    RowColCollection.prototype.getNextCell = function (index, move, pageSize) {
        var i;
        switch (move) {
            case SelMove.Next:
                for (i = index + 1; i < this.length; i++) {
                    if (this[i].renderSize > 0)
                        return i;
                }
                break;
            case SelMove.Prev:
                for (i = index - 1; i >= 0; i--) {
                    if (this[i].renderSize > 0)
                        return i;
                }
                break;
            case SelMove.End:
                for (i = this.length - 1; i >= 0; i--) {
                    if (this[i].renderSize > 0)
                        return i;
                }
                break;
            case SelMove.Home:
                for (i = 0; i < this.length; i++) {
                    if (this[i].renderSize > 0)
                        return i;
                }
                break;
            case SelMove.NextPage:
                i = this.getItemAt(this[index].pos + pageSize);
                return i < 0 ? this.getNextCell(index, SelMove.End, pageSize) :
                    i == index && i < this.length - 1 ? i + 1 :
                        i;
            case SelMove.PrevPage:
                i = this.getItemAt(this[index].pos - pageSize);
                return i < 0 ? this.getNextCell(index, SelMove.Home, pageSize) :
                    i == index && i > 0 ? i - 1 :
                        i;
        }
        return index;
    };
    RowColCollection.prototype.canMoveElement = function (src, dst) {
        if (dst == src) {
            return false;
        }
        if (src < 0 || src >= this.length || dst >= this.length) {
            return false;
        }
        if (dst < 0)
            dst = this.length - 1;
        var start = Math.min(src, dst), end = Math.max(src, dst);
        for (var i = start; i <= end; i++) {
            if (!this[i].allowDragging) {
                return false;
            }
        }
        if (this[dst] instanceof _NewRowTemplate) {
            return false;
        }
        return true;
    };
    RowColCollection.prototype.moveElement = function (src, dst) {
        if (this.canMoveElement(src, dst)) {
            var e = this[src];
            this.removeAt(src);
            if (dst < 0)
                dst = this.length;
            this.insert(dst, e);
        }
    };
    RowColCollection.prototype.onCollectionChanged = function (e) {
        if (e === void 0) { e = wjcCore.NotifyCollectionChangedEventArgs.reset; }
        this._dirty = true;
        this._g.invalidate();
        _super.prototype.onCollectionChanged.call(this, e);
    };
    RowColCollection.prototype.push = function (item) {
        item._list = this;
        return _super.prototype.push.call(this, item);
    };
    RowColCollection.prototype.splice = function (index, count, item) {
        if (item) {
            item._list = this;
        }
        return _super.prototype.splice.call(this, index, count, item);
    };
    RowColCollection.prototype.beginUpdate = function () {
        this._update();
        _super.prototype.beginUpdate.call(this);
    };
    RowColCollection.prototype._update = function () {
        if (this._dirty && !this.isUpdating) {
            this._dirty = false;
            var vlen = 0, pos = 0, sz = void 0, rc = void 0;
            for (var i = 0; i < this.length; i++) {
                rc = this[i];
                rc._idx = i;
                rc._vidx = vlen;
                rc._list = this;
                rc._pos = pos;
                sz = rc.renderSize;
                if (sz > 0) {
                    pos += sz;
                    vlen++;
                }
            }
            this._vlen = vlen;
            this._szTot = pos;
            return true;
        }
        return false;
    };
    return RowColCollection;
}(wjcCore.ObservableArray));
exports.RowColCollection = RowColCollection;
var ColumnCollection = (function (_super) {
    __extends(ColumnCollection, _super);
    function ColumnCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._firstVisible = -1;
        return _this;
    }
    ColumnCollection.prototype.getColumn = function (name) {
        var index = wjcCore.isNumber(name) ? name : this.indexOf(name);
        return index > -1 ? this[index] : null;
    };
    ColumnCollection.prototype.indexOf = function (name) {
        if (name instanceof Column) {
            return _super.prototype.indexOf.call(this, name);
        }
        for (var i = 0; i < this.length; i++) {
            if (this[i].name == name) {
                return i;
            }
        }
        for (var i = 0; i < this.length; i++) {
            if (this[i].binding == name) {
                return i;
            }
        }
        return -1;
    };
    Object.defineProperty(ColumnCollection.prototype, "firstVisibleIndex", {
        get: function () {
            if (this._dirty) {
                this._update();
            }
            return this._firstVisible;
        },
        enumerable: true,
        configurable: true
    });
    ColumnCollection.prototype._update = function () {
        if (_super.prototype._update.call(this)) {
            this._firstVisible = -1;
            for (var i = 0; i < this.length; i++) {
                if ((this[i]).visible) {
                    this._firstVisible = i;
                    break;
                }
            }
            return true;
        }
        return false;
    };
    ColumnCollection.prototype._updateStarSizes = function (szAvailable) {
        var starCount = 0, lastStarCol;
        for (var i = 0; i < this.length; i++) {
            var col = this[i];
            if (col.isVisible) {
                if (col._szStar) {
                    starCount += Column._parseStarSize(col._szStar);
                    lastStarCol = col;
                }
                else {
                    szAvailable -= col.renderWidth;
                }
            }
        }
        if (lastStarCol) {
            var lastWidth = szAvailable;
            for (var i = 0; i < this.length; i++) {
                var col = this[i];
                if (col.isVisible) {
                    if (col._szStar) {
                        if (col == lastStarCol && lastWidth > 0) {
                            col._sz = lastWidth;
                        }
                        else {
                            col._sz = Math.max(0, Math.round(Column._parseStarSize(col._szStar) / starCount * szAvailable));
                            lastWidth -= col.renderWidth;
                        }
                    }
                }
            }
            this._dirty = true;
            this._update();
            return true;
        }
        return false;
    };
    return ColumnCollection;
}(RowColCollection));
exports.ColumnCollection = ColumnCollection;
var RowCollection = (function (_super) {
    __extends(RowCollection, _super);
    function RowCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._maxLevel = -1;
        return _this;
    }
    Object.defineProperty(RowCollection.prototype, "maxGroupLevel", {
        get: function () {
            if (this._dirty) {
                this._update();
            }
            return this._maxLevel;
        },
        enumerable: true,
        configurable: true
    });
    RowCollection.prototype._update = function () {
        if (_super.prototype._update.call(this)) {
            this._maxLevel = -1;
            for (var i = 0; i < this.length; i++) {
                var gr = wjcCore.tryCast(this[i], GroupRow);
                if (gr && gr.level > this._maxLevel) {
                    this._maxLevel = gr.level;
                }
            }
            return true;
        }
        return false;
    };
    return RowCollection;
}(RowColCollection));
exports.RowCollection = RowCollection;
'use strict';
var HitTestInfo = (function () {
    function HitTestInfo(grid, pt) {
        this._row = -1;
        this._col = -1;
        this._edge = 0;
        var g;
        if (grid instanceof Element) {
            var cell = wjcCore.closest(grid, '.wj-cell'), index = cell ? cell[GridPanel._INDEX_KEY] : null;
            if (index) {
                this._row = index.row;
                this._col = index.col;
                this._rng = index.rng;
                this._p = index.panel;
                this._g = index.panel.grid;
            }
            return;
        }
        if (grid instanceof FlexGrid) {
            g = this._g = grid;
        }
        else if (grid instanceof GridPanel) {
            this._p = grid;
            g = this._g = this._p.grid;
        }
        else {
            throw 'First parameter should be a FlexGrid or GridPanel.';
        }
        var mouseEvent;
        if (pt instanceof MouseEvent) {
            mouseEvent = pt;
            if (pt.type == 'mousedown') {
                g._rcBounds = null;
            }
        }
        pt = wjcCore.mouseToPage(pt);
        this._pt = pt.clone();
        var rc = g.controlRect, sz = g._szClient, tlp = g.topLeftCells, etl = g._eTL, hdrVis = g.headersVisibility, hve = HeadersVisibility, tlWid = (hdrVis & hve.Row) ? tlp.columns.getTotalSize() : 0, tlHei = (hdrVis & hve.Column) ? tlp.rows.getTotalSize() : 0, tlHeiSticky = (hdrVis & hve.Column) ? tlHei + etl.offsetTop : 0, ebl = g._eBL, blHei = ebl.offsetHeight;
        pt.x -= rc.left;
        pt.y -= rc.top;
        if (this._g.rightToLeft) {
            pt.x = rc.width - pt.x;
        }
        if (!this._p &&
            pt.x >= 0 && pt.y >= etl.offsetTop &&
            sz && pt.x <= sz.width + tlWid && pt.y <= sz.height + tlHeiSticky) {
            if (pt.y < tlHeiSticky) {
                this._p = pt.x < tlWid ? g.topLeftCells : g.columnHeaders;
            }
            else if (pt.y < ebl.offsetTop) {
                this._p = pt.x < tlWid ? g.rowHeaders : g.cells;
            }
            else {
                this._p = pt.x < tlWid ? g.bottomLeftCells : g.columnFooters;
            }
        }
        if (this._p != null) {
            var rows = this._p.rows, cols = this._p.columns, ct = this._p.cellType, cte = CellType, ptFrz = this._p._getFrozenPos(), totHei = (ct == cte.TopLeft || ct == cte.ColumnHeader) ? tlHei :
                (ct == cte.BottomLeft || ct == cte.ColumnFooter) ? blHei :
                    rows.getTotalSize(), totWid = (ct == cte.TopLeft || ct == cte.BottomLeft || ct == cte.RowHeader) ? tlWid :
                cols.getTotalSize();
            if (ct == cte.RowHeader || ct == cte.Cell) {
                pt.y -= tlHei;
                if (pt.y > ptFrz.y || ptFrz.y <= 0) {
                    pt.y -= g._ptScrl.y;
                    pt.y += this._p._getOffsetY();
                }
            }
            else if (ct == cte.BottomLeft || ct == cte.ColumnFooter) {
                pt.y -= ebl.offsetTop;
            }
            if (ct == cte.ColumnHeader || ct == cte.Cell || ct == cte.ColumnFooter) {
                pt.x -= tlWid;
                if (pt.x > ptFrz.x || ptFrz.x <= 0) {
                    pt.x -= g._ptScrl.x;
                }
            }
            if (ct == cte.ColumnHeader || ct == cte.TopLeft) {
                pt.y -= (tlHeiSticky - tlHei);
            }
            this._edge = 0;
            var szEdge = HitTestInfo._SZEDGE[this._g.isTouching ? 1 : 0];
            if (this._g.isTouching) {
                szEdge = HitTestInfo._SZEDGE[1];
                pt.x -= szEdge / 2;
            }
            this._row = pt.y > totHei ? -1 : rows.getItemAt(pt.y);
            this._col = pt.x > totWid ? -1 : cols.getItemAt(pt.x);
            if (this._row < 0 || this._col < 0) {
                this._p = null;
                return;
            }
            if (this._col > -1) {
                var col = cols[this._col];
                if (pt.x - col.pos <= szEdge) {
                    this._edge |= 1;
                }
                if (col.pos + col.renderSize - pt.x <= szEdge) {
                    this._edge |= 4;
                }
            }
            if (this._row > -1) {
                var row = rows[this._row];
                if (pt.y - row.pos <= szEdge) {
                    this._edge |= 2;
                }
                if (row.pos + row.renderSize - pt.y <= szEdge) {
                    this._edge |= 8;
                }
            }
        }
        if (!(this._edge & 8) && mouseEvent instanceof MouseEvent) {
            var cell = wjcCore.closest(mouseEvent.target, '.wj-cell'), index = cell ? cell[GridPanel._INDEX_KEY] : null;
            if (index && !index.rng && index.panel == this._p && this._row != index.row) {
                this._row = index.row;
            }
        }
    }
    Object.defineProperty(HitTestInfo.prototype, "point", {
        get: function () {
            return this._pt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "cellType", {
        get: function () {
            return this._p ? this._p.cellType : CellType.None;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "panel", {
        get: function () {
            return this._p;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "grid", {
        get: function () {
            return this._p ? this._p.grid : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "row", {
        get: function () {
            return this._row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "col", {
        get: function () {
            return this._col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "range", {
        get: function () {
            if (!this._rng) {
                this._rng = new CellRange(this._row, this._col);
            }
            return this._rng;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "edgeLeft", {
        get: function () {
            return (this._edge & 1) != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "edgeTop", {
        get: function () {
            return (this._edge & 2) != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "edgeRight", {
        get: function () {
            return (this._edge & 4) != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HitTestInfo.prototype, "edgeBottom", {
        get: function () {
            return (this._edge & 8) != 0;
        },
        enumerable: true,
        configurable: true
    });
    HitTestInfo._SZEDGE = [5, 30];
    return HitTestInfo;
}());
exports.HitTestInfo = HitTestInfo;
'use strict';
var AllowMerging;
(function (AllowMerging) {
    AllowMerging[AllowMerging["None"] = 0] = "None";
    AllowMerging[AllowMerging["Cells"] = 1] = "Cells";
    AllowMerging[AllowMerging["ColumnHeaders"] = 2] = "ColumnHeaders";
    AllowMerging[AllowMerging["RowHeaders"] = 4] = "RowHeaders";
    AllowMerging[AllowMerging["AllHeaders"] = 6] = "AllHeaders";
    AllowMerging[AllowMerging["All"] = 7] = "All";
})(AllowMerging = exports.AllowMerging || (exports.AllowMerging = {}));
var MergeManager = (function () {
    function MergeManager(g) {
        this._g = g;
    }
    MergeManager.prototype.getMergedRange = function (p, r, c, clip) {
        if (clip === void 0) { clip = true; }
        var rng, vr, ct = p.cellType, cols = p.columns, rows = p.rows, row = rows[r], col = cols[c];
        if (row instanceof _NewRowTemplate) {
            return null;
        }
        if (row instanceof GroupRow && row.dataItem instanceof wjcCore.CollectionViewGroup) {
            rng = new CellRange(r, c);
            if (col.aggregate == wjcCore.Aggregate.None) {
                while (rng.col > 0 &&
                    cols[rng.col - 1].aggregate == wjcCore.Aggregate.None &&
                    rng.col != cols.frozen) {
                    rng.col--;
                }
                while (rng.col2 < cols.length - 1 &&
                    cols[rng.col2 + 1].aggregate == wjcCore.Aggregate.None &&
                    rng.col2 + 1 != cols.frozen) {
                    rng.col2++;
                }
            }
            while (rng.col < c && !cols[rng.col].visible) {
                rng.col++;
            }
            return rng.isSingleCell ? null : rng;
        }
        var done = false;
        switch (this._g.allowMerging) {
            case AllowMerging.None:
                done = true;
                break;
            case AllowMerging.Cells:
                done = ct != CellType.Cell;
                break;
            case AllowMerging.ColumnHeaders:
                done = ct != CellType.ColumnHeader && ct != CellType.TopLeft;
                break;
            case AllowMerging.RowHeaders:
                done = ct != CellType.RowHeader && ct != CellType.TopLeft;
                break;
            case AllowMerging.AllHeaders:
                done = ct == CellType.Cell;
                break;
        }
        if (done) {
            return null;
        }
        if (cols[c].allowMerging) {
            rng = new CellRange(r, c);
            var rMin = 0, rMax = rows.length - 1;
            if (r >= rows.frozen) {
                if (clip && (ct == CellType.Cell || ct == CellType.RowHeader)) {
                    vr = p._getViewRange();
                    rMin = vr.topRow;
                    rMax = vr.bottomRow;
                }
            }
            else {
                rMax = rows.frozen - 1;
            }
            for (var tr = r - 1; tr >= rMin && this._mergeCell(p, tr, c, r, c); tr--) {
                rng.row = tr;
            }
            for (var br = r + 1; br <= rMax && this._mergeCell(p, r, c, br, c); br++) {
                rng.row2 = br;
            }
            while (rng.row < r && !rows[rng.row].visible) {
                rng.row++;
            }
            if (!rng.isSingleCell) {
                return rng;
            }
        }
        if (rows[r].allowMerging) {
            rng = new CellRange(r, c);
            var cMin = 0, cMax = cols.length - 1;
            if (c >= cols.frozen) {
                if (clip && (ct == CellType.Cell || ct == CellType.ColumnHeader)) {
                    vr = p._getViewRange();
                    cMin = vr.leftCol;
                    cMax = vr.rightCol;
                }
            }
            else {
                cMax = cols.frozen - 1;
            }
            for (var cl = c - 1; cl >= cMin && this._mergeCell(p, r, cl, r, c); cl--) {
                rng.col = cl;
            }
            for (var cr = c + 1; cr <= cMax && this._mergeCell(p, r, c, r, cr); cr++) {
                rng.col2 = cr;
            }
            while (rng.col < c && !cols[rng.col].visible) {
                rng.col++;
            }
            if (!rng.isSingleCell) {
                return rng;
            }
        }
        return null;
    };
    MergeManager.prototype._mergeCell = function (p, r1, c1, r2, c2) {
        var row1 = p.rows[r1], row2 = p.rows[r2];
        if (row1 instanceof GroupRow || row1 instanceof _NewRowTemplate ||
            row2 instanceof GroupRow || row2 instanceof _NewRowTemplate) {
            return false;
        }
        if (r1 != r2 && p.rows.isFrozen(r1) != p.rows.isFrozen(r2)) {
            return false;
        }
        if (c1 != c2 && p.columns.isFrozen(c1) != p.columns.isFrozen(c2)) {
            return false;
        }
        if (r1 != r2) {
            if (c1 > 0) {
                if ((row1.allowMerging && this._mergeCell(p, r1, c1 - 1, r1, c1)) ||
                    (row2.allowMerging && this._mergeCell(p, r2, c1 - 1, r2, c1))) {
                    return false;
                }
            }
            if (c2 < p.columns.length - 1) {
                if ((row1.allowMerging && this._mergeCell(p, r1, c2, r1, c2 + 1)) ||
                    (row2.allowMerging && this._mergeCell(p, r2, c2, r2, c2 + 1))) {
                    return false;
                }
            }
        }
        if (p.getCellData(r1, c1, true) != p.getCellData(r2, c2, true)) {
            return false;
        }
        return true;
    };
    return MergeManager;
}());
exports.MergeManager = MergeManager;
'use strict';
var DataMap = (function () {
    function DataMap(itemsSource, selectedValuePath, displayMemberPath) {
        this.mapChanged = new wjcCore.Event();
        if (wjcCore.isArray(itemsSource) && !selectedValuePath && !displayMemberPath) {
            var arr = [];
            for (var i = 0; i < itemsSource.length; i++) {
                arr.push({ value: itemsSource[i] });
            }
            itemsSource = arr;
            selectedValuePath = displayMemberPath = 'value';
        }
        this._cv = wjcCore.asCollectionView(itemsSource);
        this._keyPath = wjcCore.asString(selectedValuePath, false);
        this._displayPath = wjcCore.asString(displayMemberPath, false);
        this._cv.collectionChanged.addHandler(this.onMapChanged, this);
    }
    Object.defineProperty(DataMap.prototype, "sortByDisplayValues", {
        get: function () {
            return this._sortByKey != true;
        },
        set: function (value) {
            this._sortByKey = !wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataMap.prototype, "collectionView", {
        get: function () {
            return this._cv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataMap.prototype, "selectedValuePath", {
        get: function () {
            return this._keyPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataMap.prototype, "displayMemberPath", {
        get: function () {
            return this._displayPath;
        },
        enumerable: true,
        configurable: true
    });
    DataMap.prototype.getKeyValue = function (displayValue) {
        var index = this._indexOf(displayValue, this._displayPath, false);
        return index > -1 ? this._cv.sourceCollection[index][this._keyPath] : null;
    };
    DataMap.prototype.getDisplayValue = function (key) {
        if (!this._hash) {
            this._hash = {};
            var arr = this._cv.sourceCollection;
            if (arr && this._keyPath && this._displayPath) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    var item = arr[i], k = item[this._keyPath], v = item[this._displayPath];
                    this._hash[k] = v;
                }
            }
        }
        var value = this._hash[key];
        return value != null ? value : key;
    };
    DataMap.prototype.getDisplayValues = function (dataItem) {
        var values = [];
        if (this._cv && this._displayPath) {
            var items = this._cv.items;
            for (var i = 0; i < items.length; i++) {
                values.push(items[i][this._displayPath]);
            }
        }
        return values;
    };
    DataMap.prototype.getKeyValues = function () {
        var values = [];
        if (this._cv && this._keyPath) {
            var items = this._cv.items;
            for (var i = 0; i < items.length; i++) {
                values.push(items[i][this._keyPath]);
            }
        }
        return values;
    };
    Object.defineProperty(DataMap.prototype, "isEditable", {
        get: function () {
            return this._editable;
        },
        set: function (value) {
            this._editable = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    DataMap.prototype.onMapChanged = function (e) {
        this._hash = null;
        this.mapChanged.raise(this, e);
    };
    DataMap.prototype._indexOf = function (value, path, caseSensitive) {
        var index = -1, firstMatch = -1;
        if (this._cv && path) {
            var sval = value != null ? value.toString() : '', lcval = caseSensitive ? sval : sval.toLowerCase();
            var items = this._cv.sourceCollection;
            for (var i = 0; i < items.length; i++) {
                var item = items[i], val = item[path];
                if (val == value) {
                    index = i;
                }
                else if (!caseSensitive && val.length == lcval.length && val.toLowerCase() == lcval) {
                    index = i;
                }
                else if (val != null && val.toString() == sval) {
                    index = i;
                }
                if (index == i) {
                    if (!this._cv.filter || this._cv.filter(item)) {
                        return index;
                    }
                    else if (firstMatch < 0) {
                        firstMatch = index;
                    }
                }
            }
        }
        return firstMatch;
    };
    return DataMap;
}());
exports.DataMap = DataMap;
'use strict';
var SelectionMode;
(function (SelectionMode) {
    SelectionMode[SelectionMode["None"] = 0] = "None";
    SelectionMode[SelectionMode["Cell"] = 1] = "Cell";
    SelectionMode[SelectionMode["CellRange"] = 2] = "CellRange";
    SelectionMode[SelectionMode["Row"] = 3] = "Row";
    SelectionMode[SelectionMode["RowRange"] = 4] = "RowRange";
    SelectionMode[SelectionMode["ListBox"] = 5] = "ListBox";
})(SelectionMode = exports.SelectionMode || (exports.SelectionMode = {}));
var SelectedState;
(function (SelectedState) {
    SelectedState[SelectedState["None"] = 0] = "None";
    SelectedState[SelectedState["Selected"] = 1] = "Selected";
    SelectedState[SelectedState["Cursor"] = 2] = "Cursor";
})(SelectedState = exports.SelectedState || (exports.SelectedState = {}));
var SelMove;
(function (SelMove) {
    SelMove[SelMove["None"] = 0] = "None";
    SelMove[SelMove["Next"] = 1] = "Next";
    SelMove[SelMove["Prev"] = 2] = "Prev";
    SelMove[SelMove["NextPage"] = 3] = "NextPage";
    SelMove[SelMove["PrevPage"] = 4] = "PrevPage";
    SelMove[SelMove["Home"] = 5] = "Home";
    SelMove[SelMove["End"] = 6] = "End";
    SelMove[SelMove["NextCell"] = 7] = "NextCell";
    SelMove[SelMove["PrevCell"] = 8] = "PrevCell";
})(SelMove = exports.SelMove || (exports.SelMove = {}));
var _SelectionHandler = (function () {
    function _SelectionHandler(g) {
        this._sel = new CellRange(0, 0);
        this._mode = SelectionMode.CellRange;
        this._g = g;
    }
    Object.defineProperty(_SelectionHandler.prototype, "selectionMode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            if (value != this._mode) {
                var sm = SelectionMode;
                if (value == sm.ListBox || this._mode == sm.ListBox) {
                    var rows = this._g.rows;
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i], sel = (value == SelectionMode.ListBox) ? this._sel.containsRow(i) : false;
                        row._setFlag(RowColFlags.Selected, sel, true);
                    }
                }
                switch (value) {
                    case sm.None:
                        this._sel.setRange(-1, -1);
                        break;
                    case sm.Cell:
                        this._sel.row2 = this._sel.row;
                        this._sel.col2 = this._sel.col;
                        break;
                    case sm.Row:
                        this._sel.row2 = this._sel.row;
                        break;
                }
                this._mode = value;
                this._g.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SelectionHandler.prototype, "selection", {
        get: function () {
            return this._sel;
        },
        set: function (value) {
            this.select(value);
        },
        enumerable: true,
        configurable: true
    });
    _SelectionHandler.prototype.select = function (rng, show) {
        if (show === void 0) { show = true; }
        if (wjcCore.isNumber(rng) && wjcCore.isNumber(show)) {
            rng = new CellRange(rng, show);
            show = true;
        }
        rng = wjcCore.asType(rng, CellRange);
        var g = this._g, oldSel = this._sel, newSel = rng, lbMode = false, sm = SelectionMode;
        switch (g.selectionMode) {
            case sm.Cell:
                rng.row2 = rng.row;
                rng.col2 = rng.col;
                break;
            case sm.Row:
                rng.row2 = rng.row;
                break;
            case sm.ListBox:
                lbMode = true;
                break;
        }
        var noChange = newSel.equals(oldSel);
        if (lbMode && newSel.row > -1 && !g.rows[newSel.row].isSelected) {
            noChange = false;
        }
        if (noChange) {
            if (show) {
                g.scrollIntoView(newSel.row, newSel.col);
            }
            return;
        }
        var e = new CellRangeEventArgs(g.cells, newSel);
        if (!g.onSelectionChanging(e)) {
            return;
        }
        if (lbMode) {
            if (newSel.row != oldSel.row ||
                newSel.rowSpan > 1 || oldSel.rowSpan > 1) {
                for (var i = 0; i < g.rows.length; i++) {
                    g.rows[i]._setFlag(RowColFlags.Selected, newSel.containsRow(i), true);
                }
                g.refreshCells(false, true, true);
            }
        }
        newSel.row = Math.min(newSel.row, g.rows.length - 1);
        newSel.row2 = Math.min(newSel.row2, g.rows.length - 1);
        this._sel = newSel;
        g.refreshCells(false, true, true);
        if (show) {
            g.scrollIntoView(newSel.row, newSel.col);
        }
        if (g.collectionView) {
            var index = g._getCvIndex(newSel.row);
            g.collectionView.moveCurrentToPosition(index);
        }
        g.onSelectionChanged(e);
    };
    _SelectionHandler.prototype.moveSelection = function (rowMove, colMove, extend) {
        var row, col, g = this._g, rows = g.rows, cols = g.columns, rng = this._getReferenceCell(rowMove, colMove, extend), pageSize = Math.max(0, g._szClient.height - g.columnHeaders.height);
        if (colMove == SelMove.NextCell) {
            col = cols.getNextCell(rng.col, SelMove.Next, pageSize);
            row = rng.row;
            if (col == rng.col) {
                row = rows.getNextCell(row, SelMove.Next, pageSize);
                if (row > rng.row) {
                    col = cols.getNextCell(0, SelMove.Next, pageSize);
                    col = cols.getNextCell(col, SelMove.Prev, pageSize);
                }
            }
            g.select(row, col);
        }
        else if (colMove == SelMove.PrevCell) {
            col = cols.getNextCell(rng.col, SelMove.Prev, pageSize);
            row = rng.row;
            if (col == rng.col) {
                row = rows.getNextCell(row, SelMove.Prev, pageSize);
                if (row < rng.row) {
                    col = cols.getNextCell(cols.length - 1, SelMove.Prev, pageSize);
                    col = cols.getNextCell(col, SelMove.Next, pageSize);
                }
            }
            g.select(row, col);
        }
        else {
            row = rows.getNextCell(rng.row, rowMove, pageSize);
            col = cols.getNextCell(rng.col, colMove, pageSize);
            if (extend) {
                var sel = g._selHdl._sel;
                g.select(new CellRange(row, col, sel.row2, sel.col2));
            }
            else {
                g.select(row, col);
            }
        }
    };
    _SelectionHandler.prototype._getReferenceCell = function (rowMove, colMove, extend) {
        var g = this._g, sel = g._selHdl._sel, rng = g.getMergedRange(g.cells, sel.row, sel.col);
        if (!rng || rng.isSingleCell) {
            return sel;
        }
        rng = rng.clone();
        switch (rowMove) {
            case SelMove.Next:
            case SelMove.NextCell:
                rng.row = rng.bottomRow;
                break;
            case SelMove.None:
                rng.row = sel.row;
                break;
        }
        switch (colMove) {
            case SelMove.Next:
            case SelMove.NextCell:
                rng.col = rng.rightCol;
                break;
            case SelMove.None:
                rng.col = sel.col;
                break;
        }
        return rng;
    };
    _SelectionHandler.prototype._adjustSelection = function (rng) {
        switch (this._mode) {
            case SelectionMode.Cell:
                return new CellRange(rng.row, rng.col, rng.row, rng.col);
            case SelectionMode.Row:
                return new CellRange(rng.row, 0, rng.row, this._g.columns.length - 1);
            case SelectionMode.RowRange:
            case SelectionMode.ListBox:
                return new CellRange(rng.row, 0, rng.row2, this._g.columns.length - 1);
        }
        return rng;
    };
    return _SelectionHandler;
}());
exports._SelectionHandler = _SelectionHandler;
'use strict';
var KeyAction;
(function (KeyAction) {
    KeyAction[KeyAction["None"] = 0] = "None";
    KeyAction[KeyAction["MoveDown"] = 1] = "MoveDown";
    KeyAction[KeyAction["MoveAcross"] = 2] = "MoveAcross";
    KeyAction[KeyAction["Cycle"] = 3] = "Cycle";
    KeyAction[KeyAction["CycleOut"] = 4] = "CycleOut";
})(KeyAction = exports.KeyAction || (exports.KeyAction = {}));
var _KeyboardHandler = (function () {
    function _KeyboardHandler(g) {
        this._kaTab = KeyAction.None;
        this._kaEnter = KeyAction.MoveDown;
        this._g = g;
        var host = g.hostElement;
        g.addEventListener(host, 'keypress', this._keypress.bind(this));
        g.addEventListener(host, 'keydown', this._keydown.bind(this));
    }
    _KeyboardHandler.prototype._keydown = function (e) {
        var g = this._g, sel = g.selection, ctrl = e.ctrlKey || e.metaKey, shift = e.shiftKey, target = e.target, handled = true;
        this._altDown = false;
        if (g._wantsInput(e.target)) {
            return;
        }
        if (!g.isRangeValid(sel) || e.defaultPrevented) {
            return;
        }
        if (g.activeEditor && g._edtHdl._keydown(e)) {
            return;
        }
        var gr = wjcCore.tryCast(g.rows[sel.row], GroupRow), ecv = g.editableCollectionView, keyCode = e.keyCode;
        if (g.autoClipboard) {
            if (ctrl && (keyCode == 67 || keyCode == 45)) {
                var args = new CellRangeEventArgs(g.cells, sel);
                if (g.onCopying(args)) {
                    var text = g.getClipString() + '\r\n';
                    wjcCore.Clipboard.copy(text);
                    g.onCopied(args);
                }
                e.stopPropagation();
                return;
            }
            if ((ctrl && keyCode == 86) || (shift && keyCode == 45)) {
                if (!g.isReadOnly) {
                    var args_1 = new CellRangeEventArgs(g.cells, sel);
                    if (g.onPasting(args_1)) {
                        wjcCore.Clipboard.paste(function (text) {
                            g.setClipString(text);
                            g.onPasted(args_1);
                        });
                    }
                }
                e.stopPropagation();
                return;
            }
        }
        if (g.rightToLeft) {
            switch (keyCode) {
                case wjcCore.Key.Left:
                    keyCode = wjcCore.Key.Right;
                    break;
                case wjcCore.Key.Right:
                    keyCode = wjcCore.Key.Left;
                    break;
            }
        }
        var smv = SelMove, sm = SelectionMode;
        switch (keyCode) {
            case wjcCore.Key.Space:
                if (shift && sel.isValid) {
                    switch (g.selectionMode) {
                        case sm.CellRange:
                        case sm.Row:
                        case sm.RowRange:
                        case sm.ListBox:
                            g.select(new CellRange(sel.row, 0, sel.row, g.columns.length - 1));
                            break;
                    }
                }
                else if (ctrl && sel.isValid) {
                    switch (g.selectionMode) {
                        case sm.CellRange:
                            g.select(new CellRange(0, sel.col, g.rows.length - 1, sel.col));
                            break;
                    }
                }
                else {
                    handled = this._startEditing(true, e);
                    if (handled) {
                        setTimeout(function () {
                            var edt = g.activeEditor;
                            if (edt) {
                                if (edt.disabled || edt.readOnly) {
                                    g.finishEditing();
                                }
                                else if (edt.type == 'checkbox') {
                                    edt.checked = !edt.checked;
                                    g.finishEditing();
                                }
                                else {
                                    wjcCore.setSelectionRange(edt, edt.value.length);
                                }
                            }
                        });
                    }
                }
                break;
            case 65:
                if (ctrl) {
                    switch (g.selectionMode) {
                        case sm.CellRange:
                        case sm.Row:
                        case sm.RowRange:
                        case sm.ListBox:
                            g.select(new CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
                            break;
                    }
                }
                else {
                    handled = false;
                }
                break;
            case wjcCore.Key.Left:
                if (ctrl || e.altKey) {
                    handled = false;
                }
                else {
                    if (sel.isValid && sel.col == 0 && gr != null && !gr.isCollapsed && gr.hasChildren) {
                        gr.isCollapsed = true;
                    }
                    else {
                        this._moveSel(smv.None, ctrl ? smv.Home : smv.Prev, shift);
                    }
                }
                break;
            case wjcCore.Key.Right:
                if (ctrl || e.altKey) {
                    handled = false;
                }
                else {
                    if (sel.isValid && sel.col == 0 && gr != null && gr.isCollapsed) {
                        gr.isCollapsed = false;
                    }
                    else {
                        this._moveSel(smv.None, ctrl ? smv.End : smv.Next, shift);
                    }
                }
                break;
            case wjcCore.Key.Up:
                if (ctrl) {
                    handled = false;
                }
                else {
                    this._altDown = e.altKey;
                    if (e.altKey) {
                        handled = g._edtHdl._toggleListBox(e);
                    }
                    else {
                        this._moveSel(smv.Prev, smv.None, shift);
                    }
                }
                break;
            case wjcCore.Key.Down:
                if (ctrl) {
                    handled = false;
                }
                else {
                    this._altDown = e.altKey;
                    if (e.altKey) {
                        handled = g._edtHdl._toggleListBox(e);
                    }
                    else {
                        this._moveSel(smv.Next, smv.None, shift);
                    }
                }
                break;
            case wjcCore.Key.PageUp:
                this._altDown = e.altKey;
                this._moveSel(e.altKey ? smv.Home : smv.PrevPage, smv.None, shift);
                break;
            case wjcCore.Key.PageDown:
                this._altDown = e.altKey;
                this._moveSel(e.altKey ? smv.End : smv.NextPage, smv.None, shift);
                break;
            case wjcCore.Key.Home:
                this._moveSel(ctrl ? smv.Home : smv.None, smv.Home, shift);
                break;
            case wjcCore.Key.End:
                this._moveSel(ctrl ? smv.End : smv.None, smv.End, shift);
                break;
            case wjcCore.Key.Tab:
                handled = this._performKeyAction(g.keyActionTab, shift);
                break;
            case wjcCore.Key.Enter:
                handled = this._performKeyAction(g.keyActionEnter, shift);
                if (!shift && ecv && ecv.currentEditItem != null) {
                    g._edtHdl._commitRowEdits();
                }
                break;
            case wjcCore.Key.Escape:
                handled = false;
                if (ecv) {
                    if (ecv.currentAddItem || ecv.currentEditItem) {
                        var ee = new CellRangeEventArgs(g.cells, g.selection);
                        ee.cancel = true;
                        g.onRowEditEnding(ee);
                        if (ecv.currentAddItem) {
                            ecv.cancelNew();
                        }
                        if (ecv.currentEditItem) {
                            ecv.cancelEdit();
                        }
                        g.onRowEditEnded(ee);
                        handled = true;
                    }
                }
                g._mouseHdl.resetMouseState();
                break;
            case wjcCore.Key.Delete:
            case wjcCore.Key.Back:
                handled = this._deleteSel(e);
                break;
            case wjcCore.Key.F2:
                handled = this._startEditing(true, e);
                break;
            case wjcCore.Key.F4:
                handled = g._edtHdl._toggleListBox(e);
                break;
            default:
                handled = false;
                break;
        }
        if (handled) {
            if (!g.containsFocus()) {
                g.focus();
            }
            e.preventDefault();
            e.stopPropagation();
        }
    };
    _KeyboardHandler.prototype._performKeyAction = function (action, shift) {
        var ka = KeyAction, smv = SelMove;
        switch (action) {
            case ka.MoveDown:
                this._moveSel(shift ? smv.Prev : smv.Next, smv.None, false);
                return true;
            case ka.MoveAcross:
                this._moveSel(smv.None, shift ? smv.Prev : smv.Next, false);
                return true;
            case ka.Cycle:
                this._moveSel(smv.None, shift ? smv.PrevCell : smv.NextCell, false);
                return true;
            case ka.CycleOut:
                var sel = this._g.selection;
                this._moveSel(smv.None, shift ? smv.PrevCell : smv.NextCell, false);
                return !sel.equals(this._g.selection);
        }
        return false;
    };
    _KeyboardHandler.prototype._keypress = function (e) {
        var g = this._g;
        if (g._wantsInput(e.target) || e.defaultPrevented) {
            return;
        }
        if (this._altDown) {
            e.preventDefault();
            return;
        }
        if (g.activeEditor) {
            g._edtHdl._keypress(e);
        }
        else if (e.charCode > wjcCore.Key.Space) {
            if (this._startEditing(false, e) && g.activeEditor) {
                var edt = wjcCore.getActiveElement();
                if (edt instanceof HTMLInputElement && edt.type != 'checkbox') {
                    var sel = g._selHdl.selection, txt = g.getCellData(sel.row, sel.col, true), val = g.getCellData(sel.row, sel.col, false);
                    edt.value = String.fromCharCode(e.charCode);
                    if (wjcCore.isNumber(val) && txt.indexOf('%') > -1) {
                        edt.value += '%';
                    }
                    wjcCore.setSelectionRange(edt, 1);
                    edt.dispatchEvent(g._edtHdl._evtInput);
                    g._edtHdl._keypress(e);
                    e.preventDefault();
                }
            }
        }
    };
    _KeyboardHandler.prototype._moveSel = function (rowMove, colMove, extend) {
        if (this._g.selectionMode != SelectionMode.None) {
            this._g._selHdl.moveSelection(rowMove, colMove, extend);
        }
    };
    _KeyboardHandler.prototype._deleteSel = function (evt) {
        var g = this._g, ecv = g.editableCollectionView, sel = g.selection, rows = g.rows, selRows = [], rng = new CellRange(), e = new CellEditEndingEventArgs(g.cells, rng, evt), sm = SelectionMode;
        if (g.allowDelete && !g.isReadOnly &&
            (ecv == null || (ecv.canRemove && !ecv.isAddingNew && !ecv.isEditingItem))) {
            switch (g.selectionMode) {
                case sm.CellRange:
                    if (sel.leftCol == 0 && sel.rightCol == g.columns.length - 1) {
                        for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                            selRows.push(rows[i]);
                        }
                    }
                    break;
                case sm.ListBox:
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].isSelected) {
                            selRows.push(rows[i]);
                        }
                    }
                    break;
                case sm.Row:
                    if (sel.topRow > -1) {
                        selRows.push(rows[sel.topRow]);
                    }
                    break;
                case sm.RowRange:
                    for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                        selRows.push(rows[i]);
                    }
                    break;
            }
        }
        if (selRows.length > 0) {
            g.deferUpdate(function () {
                if (ecv)
                    ecv.beginUpdate();
                for (var i = selRows.length - 1; i >= 0; i--) {
                    var r = selRows[i];
                    rng.setRange(r.index, -1);
                    if (g.onDeletingRow(e)) {
                        if (ecv && r.dataItem) {
                            ecv.remove(r.dataItem);
                        }
                        else {
                            g.rows.removeAt(r.index);
                        }
                        g.onDeletedRow(e);
                    }
                }
                if (ecv)
                    ecv.endUpdate();
            });
            if (g.selectionMode == sm.ListBox) {
                var index = g.selection.row;
                if (index > -1 && index < g.rows.length) {
                    g.rows[index].isSelected = true;
                }
            }
            if (g.childItemsPath && g.collectionView) {
                g.collectionView.refresh();
            }
            return true;
        }
        if (!g.isReadOnly && selRows.length == 0) {
            var ecvUpdating_1 = false, sp_1 = g.scrollPosition;
            g.deferUpdate(function () {
                for (var sr = sel.topRow; sr <= sel.bottomRow; sr++) {
                    var row = g.rows[sr];
                    if (!row.isReadOnly) {
                        for (var sc = sel.leftCol; sc <= sel.rightCol; sc++) {
                            var bcol = g._getBindingColumn(g.cells, sr, g.columns[sc]);
                            if (!bcol.getIsRequired() && !bcol.isReadOnly) {
                                if (g.getCellData(sr, sc, true)) {
                                    rng.setRange(sr, sc);
                                    e.cancel = false;
                                    if (g.onBeginningEdit(e)) {
                                        if (ecv) {
                                            if (!ecvUpdating_1) {
                                                ecvUpdating_1 = true;
                                                ecv.beginUpdate();
                                            }
                                            ecv.editItem(row.dataItem);
                                            g._edtHdl._edItem = ecv.currentEditItem;
                                        }
                                        g.setCellData(sr, sc, '', true, false);
                                        g.onCellEditEnding(e);
                                        g.onCellEditEnded(e);
                                    }
                                }
                            }
                        }
                    }
                }
                g.selection = sel;
                g.scrollPosition = sp_1;
                if (ecvUpdating_1) {
                    ecv.endUpdate();
                }
            });
            return true;
        }
        return false;
    };
    _KeyboardHandler.prototype._startEditing = function (fullEdit, evt, r, c) {
        return this._g._edtHdl.startEditing(fullEdit, r, c, true, evt);
    };
    return _KeyboardHandler;
}());
exports._KeyboardHandler = _KeyboardHandler;
'use strict';
var _AR_ALLCELLS = 4;
var _WJC_DRAGSRC = 'wj-state-dragsrc';
var AllowResizing;
(function (AllowResizing) {
    AllowResizing[AllowResizing["None"] = 0] = "None";
    AllowResizing[AllowResizing["Columns"] = 1] = "Columns";
    AllowResizing[AllowResizing["Rows"] = 2] = "Rows";
    AllowResizing[AllowResizing["Both"] = 3] = "Both";
    AllowResizing[AllowResizing["ColumnsAllCells"] = AllowResizing.Columns | _AR_ALLCELLS] = "ColumnsAllCells";
    AllowResizing[AllowResizing["RowsAllCells"] = AllowResizing.Rows | _AR_ALLCELLS] = "RowsAllCells";
    AllowResizing[AllowResizing["BothAllCells"] = AllowResizing.Both | _AR_ALLCELLS] = "BothAllCells";
})(AllowResizing = exports.AllowResizing || (exports.AllowResizing = {}));
var AutoSizeMode;
(function (AutoSizeMode) {
    AutoSizeMode[AutoSizeMode["None"] = 0] = "None";
    AutoSizeMode[AutoSizeMode["Headers"] = 1] = "Headers";
    AutoSizeMode[AutoSizeMode["Cells"] = 2] = "Cells";
    AutoSizeMode[AutoSizeMode["Both"] = 3] = "Both";
})(AutoSizeMode = exports.AutoSizeMode || (exports.AutoSizeMode = {}));
var AllowDragging;
(function (AllowDragging) {
    AllowDragging[AllowDragging["None"] = 0] = "None";
    AllowDragging[AllowDragging["Columns"] = 1] = "Columns";
    AllowDragging[AllowDragging["Rows"] = 2] = "Rows";
    AllowDragging[AllowDragging["Both"] = 3] = "Both";
})(AllowDragging = exports.AllowDragging || (exports.AllowDragging = {}));
var _MouseHandler = (function () {
    function _MouseHandler(g) {
        var _this = this;
        this._tsLast = 0;
        var host = g.hostElement;
        this._g = g;
        this._dvMarker = wjcCore.createElement('<div class="wj-marker">&nbsp;</div>');
        g.addEventListener(host, 'mousedown', function (e) {
            g._rcBounds = null;
            if (!e.defaultPrevented && e.button == 0) {
                var target = e.target;
                if (!g.containsFocus()) {
                    var eFocus = target instanceof HTMLElement && target.tabIndex > -1 ? target : g._eFocus;
                    g._setFocusNoScroll(eFocus);
                }
                setTimeout(function () {
                    if (!e.defaultPrevented) {
                        g.focus();
                    }
                });
                var pGrid = wjcCore.closest(e.target, '.wj-flexgrid');
                if (pGrid != g.hostElement || (!g.activeEditor && g._isInputElement(target))) {
                    var ht = g.hitTest(e);
                    switch (ht.cellType) {
                        case CellType.Cell:
                            g.select(ht.range);
                            break;
                        case CellType.ColumnHeader:
                        case CellType.ColumnFooter:
                            g.scrollIntoView(-1, ht.col);
                            break;
                        case CellType.RowHeader:
                            g.scrollIntoView(ht.row, -1);
                            break;
                    }
                    return;
                }
                g.removeEventListener(document, 'mousemove');
                g.removeEventListener(document, 'mouseup');
                g.addEventListener(document, 'mousemove', mouseMove);
                g.addEventListener(document, 'mouseup', mouseUp);
                _this._isDown = true;
                _this._mousedown(e);
            }
        });
        var mouseMove = function (e) {
            _this._mousemove(e);
        };
        var mouseUp = function (e) {
            _this._isDown = false;
            g.removeEventListener(document, 'mousemove');
            g.removeEventListener(document, 'mouseup');
            _this._mouseup(e);
        };
        g.addEventListener(host, 'mouseup', function (e) {
            _this._tsLast = Date.now();
        });
        g.addEventListener(host, 'mouseenter', function (e) {
            g._rcBounds = null;
        });
        g.addEventListener(host, 'mousemove', this._hover.bind(this));
        g.addEventListener(host, 'dblclick', this._dblclick.bind(this));
        g.addEventListener(host, 'click', this._click.bind(this));
        g.addEventListener(host, 'selectstart', function (e) {
            if (!g._isInputElement(e.target)) {
                e.preventDefault();
            }
        });
        g.addEventListener(host, 'wheel', function (e) {
            var root = g.cells.hostElement.parentElement, delta = e.deltaY;
            if (delta && !e.ctrlKey && !e.metaKey && root.scrollHeight > root.offsetHeight) {
                if (wjcCore.closest(e.target, '.wj-flexgrid') == g.hostElement) {
                    switch (e.deltaMode) {
                        case 1:
                            root.scrollTop += g.rows.defaultSize * (delta < 0 ? -1 : +1);
                            break;
                        case 2:
                            root.scrollTop += root.clientHeight * (delta < 0 ? -1 : +1);
                            break;
                        case 0:
                        default:
                            if (wjcCore.isSafari()) {
                                delta = wjcCore.clamp(delta, -150, 150);
                            }
                            root.scrollTop += delta;
                            break;
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        });
        g.addEventListener(host, 'dragstart', this._dragstart.bind(this));
        g.addEventListener(host, 'dragover', this._dragover.bind(this));
        g.addEventListener(host, 'dragleave', this._dragover.bind(this));
        g.addEventListener(host, 'drop', this._drop.bind(this));
        g.addEventListener(host, 'dragend', this._dragend.bind(this));
        this._enableTouchResizing();
    }
    _MouseHandler.prototype.resetMouseState = function () {
        if (this._dragSource) {
            wjcCore.removeClass(this._dragSource, _WJC_DRAGSRC);
        }
        this._showDragMarker(null);
        var host = this._g.hostElement;
        if (host) {
            host.style.cursor = '';
        }
        var g = this._g;
        g.removeEventListener(document, 'mousemove');
        g.removeEventListener(document, 'mouseup');
        this._tsLast = Date.now();
        this._eMouse = null;
        this._isDown = null;
        this._htDown = null;
        this._lbSelRows = null;
        this._szRowCol = null;
        this._szArgs = null;
        this._dragSource = null;
    };
    _MouseHandler.prototype._enableTouchResizing = function () {
        var _this = this;
        var g = this._g, host = g.hostElement, touchEvents = 'ontouchstart' in window ? ['touchstart', 'touchmove', 'touchend'] :
            'onpointerdown' in window ? ['pointerdown', 'pointermove', 'pointerup'] :
                null;
        if (touchEvents) {
            g.addEventListener(host, touchEvents[0], function (e) {
                if (e.pointerType == null || e.pointerType == 'touch') {
                    if (!wjcCore.closest(e.target, '.wj-elem-filter')) {
                        var cell = wjcCore.closest(e.target, '.wj-cell');
                        if (cell instanceof HTMLElement) {
                            g._rcBounds = null;
                            _this._htDown = null;
                            _this._hover(e);
                            if (_this._szRowCol) {
                                cell.removeAttribute('draggable');
                                host.style.touchAction = 'none';
                                _this._mousedown(e);
                                e.preventDefault();
                            }
                        }
                    }
                }
            });
            g.addEventListener(host, touchEvents[1], function (e) {
                if (e.pointerType == null || e.pointerType == 'touch') {
                    if (_this._szRowCol) {
                        _this._mousemove(e);
                        e.preventDefault();
                    }
                }
            });
            g.addEventListener(host, touchEvents[2], function (e) {
                wjcCore.Control._touching = false;
                if (e.pointerType == null || e.pointerType == 'touch') {
                    if (_this._szRowCol) {
                        if (_this._szArgs) {
                            _this._finishResizing(_this._eMouse);
                        }
                        else {
                            var cell = wjcCore.closest(e.target, '.wj-cell');
                            if (cell instanceof HTMLElement) {
                                cell.click();
                            }
                        }
                        _this.resetMouseState();
                        host.style.touchAction = '';
                    }
                }
            });
        }
    };
    _MouseHandler.prototype._mousedown = function (e) {
        var g = this._g, ht = g.hitTest(e), ct = ht.cellType, ctrlKey = e.ctrlKey || e.metaKey;
        this._selDown = g.selection;
        if (ht.panel == g.cells) {
            if (wjcCore.closestClass(e.target, CellFactory._WJC_DROPDOWN)) {
                g._edtHdl._toggleListBox(e, ht.range);
                e.preventDefault();
                return;
            }
            if (g.editRange && g.editRange.contains(ht.range)) {
                return;
            }
        }
        var ae = wjcCore.getActiveElement();
        if (e.target == ae && g._isInputElement(e.target)) {
            return;
        }
        if (ct == CellType.None) {
            g._edtHdl._commitRowEdits();
            return;
        }
        this._htDown = ht;
        this._eMouse = e;
        if (this._szRowCol != null) {
            if (ae != g._eFocus) {
                g._eFocus.tabIndex = 0;
                g._eFocus.focus();
            }
            this._handleResizing(e);
            return;
        }
        switch (ct) {
            case CellType.Cell:
                if (ctrlKey && g.selectionMode == SelectionMode.ListBox) {
                    this._startListBoxSelection(ht.row);
                }
                this._mouseSelect(e, e.shiftKey);
                break;
            case CellType.RowHeader:
                if ((this._g.allowDragging & AllowDragging.Rows) == 0) {
                    if (ctrlKey && g.selectionMode == SelectionMode.ListBox) {
                        this._startListBoxSelection(ht.row);
                    }
                    this._mouseSelect(e, e.shiftKey);
                }
                break;
        }
        if (ct == CellType.Cell && g.rows.maxGroupLevel > -1) {
            if (wjcCore.closestClass(e.target, CellFactory._WJC_COLLAPSE)) {
                var gr = wjcCore.tryCast(g.rows[ht.row], GroupRow);
                if (gr) {
                    if (ctrlKey) {
                        g.collapseGroupsToLevel(gr.isCollapsed ? gr.level + 1 : gr.level);
                    }
                    else {
                        gr.isCollapsed = !gr.isCollapsed;
                    }
                    this.resetMouseState();
                    return;
                }
            }
        }
    };
    _MouseHandler.prototype._mousemove = function (e) {
        if (this._htDown != null) {
            if (e.buttons == 0) {
                if (this._eMouse && (e.timeStamp - this._eMouse.timeStamp > 600)) {
                    this.resetMouseState();
                    return;
                }
            }
            this._eMouse = e;
            if (this._szRowCol) {
                this._handleResizing(e);
            }
            else {
                switch (this._htDown.cellType) {
                    case CellType.Cell:
                        this._mouseSelect(e, true);
                        break;
                    case CellType.RowHeader:
                        if ((this._g.allowDragging & AllowDragging.Rows) == 0) {
                            this._mouseSelect(e, true);
                        }
                        break;
                }
            }
        }
    };
    _MouseHandler.prototype._mouseup = function (e) {
        if (this._g.isTouching) {
            if (this._dragSource || e.target instanceof HTMLHtmlElement) {
                return;
            }
        }
        var g = this._g, ht = g.hitTest(e), htd = this._htDown, sm = SelectionMode;
        if (htd && !e.defaultPrevented) {
            if (this._szArgs) {
                this._finishResizing(e);
            }
            else if (htd.panel == g.topLeftCells && !this._szArgs) {
                if (ht.panel == htd.panel && ht.row == htd.row && ht.col == htd.col) {
                    if (g.rows.length && g.columns.length) {
                        switch (g.selectionMode) {
                            case sm.CellRange:
                            case sm.RowRange:
                            case sm.ListBox:
                                g.select(new CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
                                break;
                        }
                    }
                }
            }
            else if (htd.panel == g.columnHeaders && !e['dataTransfer']) {
                if (ht.panel == htd.panel && ht.col == htd.col && !ht.edgeRight && ht.col > -1) {
                    this._clickSort(e, ht);
                }
            }
            else if (htd.panel == g.cells) {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    if (ht.panel == htd.panel && ht.range.equals(htd.range)) {
                        if (g.selection.equals(this._selDown)) {
                            g._edtHdl.startEditing(true, ht.row, ht.col, true, e);
                        }
                    }
                }
            }
        }
        this.resetMouseState();
    };
    _MouseHandler.prototype._click = function (e) {
        if (Date.now() - this._tsLast > 50 && !e['pointerType']) {
            this._handleClick(e);
        }
    };
    _MouseHandler.prototype._handleClick = function (e) {
        var g = this._g, target = e.target, ht = new HitTestInfo(target, null);
        if (!e.defaultPrevented && ht.grid == g && !g._isInputElement(target)) {
            if (ht.panel == g.topLeftCells) {
                g.select(new CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
            }
            else if (ht.panel == g.columnHeaders) {
                this._clickSort(e, ht);
            }
            else if (ht.panel == g.rowHeaders) {
                g.select(new CellRange(ht.row, 0, ht.row, g.columns.length - 1));
            }
            else if (ht.panel == g.cells) {
                if (ht.row < 0) {
                    this._clickSort(e, ht);
                }
                else if (wjcCore.closestClass(target, CellFactory._WJC_COLLAPSE)) {
                    var gr = g.rows[ht.row];
                    if (gr instanceof GroupRow) {
                        if (e.ctrlKey) {
                            g.collapseGroupsToLevel(gr.isCollapsed ? gr.level + 1 : gr.level);
                        }
                        else {
                            gr.isCollapsed = !gr.isCollapsed;
                        }
                    }
                }
                else if (wjcCore.closestClass(target, CellFactory._WJC_DROPDOWN)) {
                    g._edtHdl._toggleListBox(e, ht.range);
                }
                else {
                    g.select(ht.range);
                }
            }
        }
    };
    _MouseHandler.prototype._clickSort = function (e, ht) {
        var g = this._g, cv = g.collectionView, ctrlKey = e.ctrlKey || e.metaKey;
        if (!cv || !cv.canSort || !g.allowSorting) {
            return;
        }
        var row = ht.range.bottomRow, col = ht.panel.columns[ht.col], bcol = g._getBindingColumn(ht.panel, ht.row, col), bindingSort = bcol ? bcol._getBindingSort() : null;
        if (!bcol.allowSorting || !bindingSort) {
            return;
        }
        var sds = ht.grid.collectionView.sortDescriptions, asc = null;
        for (var i = 0; i < sds.length; i++) {
            if (sds[i].property == bindingSort) {
                asc = !sds[i].ascending;
                break;
            }
        }
        if (asc == null) {
            if (ctrlKey) {
                return;
            }
            asc = true;
        }
        var args = new CellRangeEventArgs(ht.panel, ht.range);
        if (g.onSortingColumn(args)) {
            g._edtHdl._commitRowEdits();
            if (ctrlKey) {
                sds.clear();
            }
            else {
                sds.splice(0, sds.length, new wjcCore.SortDescription(bindingSort, asc));
            }
            g.onSortedColumn(args);
        }
    };
    _MouseHandler.prototype._dblclick = function (e) {
        var g = this._g, ht = g.hitTest(e), ct = ht.cellType, sel = g.selection, rng = ht.range, args;
        if (e.defaultPrevented) {
            return;
        }
        if (ht.edgeRight && (g.allowResizing & AllowResizing.Columns)) {
            if (ct == CellType.ColumnHeader || (ct == CellType.Cell && (g.allowResizing & _AR_ALLCELLS))) {
                e.preventDefault();
                if (e.ctrlKey && sel.containsColumn(ht.col)) {
                    rng = sel;
                }
                for (var c = rng.leftCol; c <= rng.rightCol; c++) {
                    if (g.columns[c].allowResizing) {
                        args = new CellRangeEventArgs(g.cells, new CellRange(-1, c));
                        if (g.onAutoSizingColumn(args) && g.onResizingColumn(args)) {
                            g.autoSizeColumn(c);
                            g.onResizedColumn(args);
                            g.onAutoSizedColumn(args);
                        }
                    }
                }
            }
            else if (ct == CellType.TopLeft) {
                if (ht.panel.columns[ht.col].allowResizing) {
                    e.preventDefault();
                    args = new CellRangeEventArgs(ht.panel, new CellRange(-1, ht.col));
                    if (g.onAutoSizingColumn(args) && g.onResizingColumn(args)) {
                        g.autoSizeColumn(ht.col, true);
                        g.onAutoSizedColumn(args);
                        g.onResizedColumn(args);
                    }
                }
            }
            this.resetMouseState();
            return;
        }
        if (ht.edgeBottom && (g.allowResizing & AllowResizing.Rows)) {
            if (ct == CellType.RowHeader || (ct == CellType.Cell && (g.allowResizing & _AR_ALLCELLS))) {
                if (e.ctrlKey && sel.containsRow(ht.row)) {
                    rng = sel;
                }
                for (var r = rng.topRow; r <= rng.bottomRow; r++) {
                    if (g.rows[r].allowResizing) {
                        args = new CellRangeEventArgs(g.cells, new CellRange(r, -1));
                        if (g.onAutoSizingRow(args) && g.onResizingRow(args)) {
                            g.autoSizeRow(r);
                            g.onResizedRow(args);
                            g.onAutoSizedRow(args);
                        }
                    }
                }
            }
            else if (ct == CellType.TopLeft) {
                if (ht.panel.rows[ht.row].allowResizing) {
                    args = new CellRangeEventArgs(ht.panel, new CellRange(ht.row, -1));
                    if (g.onAutoSizingRow(args) && g.onResizingRow(args)) {
                        g.autoSizeRow(ht.row, true);
                        g.onResizedRow(args);
                        g.onAutoSizedRow(args);
                    }
                }
            }
            this.resetMouseState();
            return;
        }
    };
    _MouseHandler.prototype._hover = function (e) {
        if (this._htDown == null) {
            var g = this._g, ht = g.hitTest(e), p = ht.panel, ct = ht.cellType, cursor = '';
            this._szRowCol = null;
            if (ct == CellType.ColumnHeader || ct == CellType.TopLeft || (ct == CellType.Cell && (g.allowResizing & _AR_ALLCELLS))) {
                if (ht.edgeRight && (g.allowResizing & AllowResizing.Columns) != 0) {
                    this._szRowCol = this._getResizeCol(ht);
                }
            }
            if (ct == CellType.RowHeader || ct == CellType.TopLeft || (ct == CellType.Cell && (g.allowResizing & _AR_ALLCELLS))) {
                if (ht.edgeBottom && (g.allowResizing & AllowResizing.Rows) != 0) {
                    this._szRowCol = this._getResizeRow(ht);
                }
            }
            if (this._szRowCol instanceof Column) {
                cursor = 'col-resize';
            }
            else if (this._szRowCol instanceof Row) {
                cursor = 'row-resize';
            }
            this._szStart = this._szRowCol ? this._szRowCol.renderSize : 0;
            g.hostElement.style.cursor = cursor;
            return ht;
        }
        return null;
    };
    _MouseHandler.prototype._getResizeCol = function (ht) {
        var cols = ht.panel.columns, col = cols[ht.col];
        for (var c = ht.col + 1; c < cols.length; c++) {
            var newCol = cols[c];
            if (newCol.visible) {
                if (newCol.size < 1) {
                    col = newCol;
                }
                break;
            }
        }
        if (ht.col == cols.length - 1) {
            if (ht.cellType == CellType.TopLeft || ht.cellType == CellType.RowHeader) {
                cols = this._g.columns;
                for (var c = 0; c < cols.length; c++) {
                    var newCol = cols[c];
                    if (newCol.visible) {
                        if (newCol.size < 1) {
                            col = newCol;
                        }
                        break;
                    }
                }
            }
        }
        return col.allowResizing ? col : null;
    };
    _MouseHandler.prototype._getResizeRow = function (ht) {
        var rows = ht.panel.rows, row = rows[ht.row];
        for (var r = ht.row + 1; r < rows.length; r++) {
            var newRow = rows[r];
            if (newRow.visible) {
                if (newRow.size < 1) {
                    row = newRow;
                }
                break;
            }
        }
        if (ht.row == rows.length - 1) {
            if (ht.cellType == CellType.TopLeft || ht.cellType == CellType.ColumnHeader) {
                rows = this._g.rows;
                for (var r = 0; r < rows.length; r++) {
                    var newRow = rows[r];
                    if (newRow.visible) {
                        if (newRow.size < 1) {
                            row = newRow;
                        }
                        break;
                    }
                }
            }
        }
        return row.allowResizing ? row : null;
    };
    _MouseHandler.prototype._mouseSelect = function (e, extend) {
        var _this = this;
        var g = this._g;
        if (this._htDown && this._htDown.panel && g.selectionMode != SelectionMode.None) {
            var ht = new HitTestInfo(this._htDown.panel, e);
            this._handleSelection(ht, extend);
            if (!wjcCore.isIE9() && e.button >= 0 && e.target != g._root) {
                ht = new HitTestInfo(g, e);
                if (ht.cellType != CellType.Cell && ht.cellType != CellType.RowHeader) {
                    setTimeout(function () {
                        _this._mouseSelect(_this._eMouse, extend);
                    }, 100);
                }
            }
        }
    };
    _MouseHandler.prototype._handleResizing = function (e) {
        e.preventDefault();
        if (this._szRowCol instanceof Column) {
            var g = this._g, pageX = wjcCore.mouseToPage(e).x, sz = Math.round(Math.max(_MouseHandler._SZ_MIN, this._szStart + (pageX - this._htDown.point.x) * (g.rightToLeft ? -1 : 1)));
            if (this._szRowCol.renderSize != sz) {
                if (this._szArgs == null) {
                    var panel = g.rowHeaders.columns.indexOf(this._szRowCol) > -1 ? g.rowHeaders : g.cells;
                    this._szArgs = new CellRangeEventArgs(panel, new CellRange(-1, this._szRowCol.index));
                }
                this._szArgs.cancel = false;
                if (g.onResizingColumn(this._szArgs)) {
                    if (g.deferResizing) {
                        this._showResizeMarker(sz);
                    }
                    else {
                        this._szRowCol.width = sz;
                    }
                }
            }
        }
        if (this._szRowCol instanceof Row) {
            var g = this._g, pageY = wjcCore.mouseToPage(e).y, sz = Math.round(Math.max(_MouseHandler._SZ_MIN, this._szStart + (pageY - this._htDown.point.y)));
            if (this._szRowCol.renderSize != sz) {
                if (this._szArgs == null) {
                    var panel = g.columnHeaders.rows.indexOf(this._szRowCol) > -1 ? g.columnHeaders : g.cells;
                    this._szArgs = new CellRangeEventArgs(panel, new CellRange(this._szRowCol.index, -1));
                }
                this._szArgs.cancel = false;
                if (g.onResizingRow(this._szArgs)) {
                    if (g.deferResizing) {
                        this._showResizeMarker(sz);
                    }
                    else {
                        this._szRowCol.height = sz;
                    }
                }
            }
        }
    };
    _MouseHandler.prototype._dragstart = function (e) {
        var g = this._g, ht = this._htDown;
        if (!ht) {
            return;
        }
        this._dragSource = null;
        if (!this._szRowCol) {
            var args = new CellRangeEventArgs(ht.panel, ht.range);
            if (ht.cellType == CellType.ColumnHeader && (g.allowDragging & AllowDragging.Columns) &&
                ht.col > -1 && g.columns[ht.col].allowDragging) {
                if (g.onDraggingColumn(args)) {
                    this._dragSource = e.target;
                }
                else {
                    e.preventDefault();
                }
            }
            else if (ht.cellType == CellType.RowHeader && (g.allowDragging & AllowDragging.Rows) &&
                ht.row > -1 && g.rows[ht.row].allowDragging) {
                var row = g.rows[ht.row];
                if (!(row instanceof GroupRow) && !(row instanceof _NewRowTemplate)) {
                    if (g.onDraggingRow(args)) {
                        this._dragSource = e.target;
                    }
                    else {
                        e.preventDefault();
                    }
                }
            }
        }
        if (this._dragSource && e.dataTransfer && !e.defaultPrevented) {
            wjcCore._startDrag(e.dataTransfer, 'move');
            e.stopPropagation();
            wjcCore.addClass(this._dragSource, _WJC_DRAGSRC);
            g.beginUpdate();
            this._updating = true;
        }
    };
    _MouseHandler.prototype._dragend = function (e) {
        if (this._updating) {
            this._g.endUpdate();
            this._updating = false;
        }
        this.resetMouseState();
    };
    _MouseHandler.prototype._dragover = function (e) {
        var g = this._g, ht = g.hitTest(e), valid = false;
        var args = new CellRangeEventArgs(g.cells, ht.range);
        if (this._htDown && ht.cellType == this._htDown.cellType) {
            if (ht.cellType == CellType.ColumnHeader) {
                args.cancel = !g.columns.canMoveElement(this._htDown.col, ht.col);
                valid = g.onDraggingColumnOver(args);
            }
            else if (ht.cellType == CellType.RowHeader) {
                args.cancel = !g.rows.canMoveElement(this._htDown.row, ht.row);
                valid = g.onDraggingRowOver(args);
            }
        }
        if (valid) {
            e.dataTransfer.dropEffect = 'move';
            this._showDragMarker(ht);
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this._showDragMarker(null);
        }
    };
    _MouseHandler.prototype._drop = function (e) {
        var g = this._g, ht = g.hitTest(e);
        if (this._htDown && ht.cellType == this._htDown.cellType) {
            var sel = g.selection, args = new CellRangeEventArgs(g.cells, ht.range, this._htDown);
            if (ht.cellType == CellType.ColumnHeader) {
                g.columns.moveElement(this._htDown.col, ht.col);
                g.select(sel.row, ht.col);
                g.onDraggedColumn(args);
            }
            else if (ht.cellType == CellType.RowHeader) {
                g.rows.moveElement(this._htDown.row, ht.row);
                g.select(ht.row, sel.col);
                g.onDraggedRow(args);
            }
        }
        this.resetMouseState();
    };
    _MouseHandler.prototype._showResizeMarker = function (sz) {
        var g = this._g;
        var t = this._dvMarker, host = g.cells.hostElement;
        if (t.parentElement != host) {
            host.appendChild(t);
        }
        var ct = this._szArgs.panel.cellType, css;
        if (this._szRowCol instanceof Column) {
            css = {
                left: this._szRowCol.pos + sz - 1,
                top: -1000,
                right: '',
                bottom: 0,
                width: 3,
                height: ''
            };
            if (g.rightToLeft) {
                css.left = host.clientWidth - css.left - css.width;
            }
            if (ct == CellType.TopLeft || ct == CellType.RowHeader) {
                css.left -= g.topLeftCells.hostElement.offsetWidth;
            }
        }
        else {
            css = {
                left: -1000,
                top: this._szRowCol.pos + sz - 1,
                right: 0,
                bottom: '',
                width: '',
                height: 3,
            };
            if (ct == CellType.TopLeft || ct == CellType.ColumnHeader) {
                css.top -= g.topLeftCells.hostElement.offsetHeight;
            }
        }
        wjcCore.setCss(t, css);
    };
    _MouseHandler.prototype._showDragMarker = function (ht) {
        var g = this._g;
        var t = this._dvMarker;
        if (!ht || !ht.panel) {
            wjcCore.removeChild(t);
            this._rngTarget = null;
            return;
        }
        if (ht.range.equals(this._rngTarget)) {
            return;
        }
        this._rngTarget = ht.range;
        var host = ht.panel.hostElement;
        if (t.parentElement != host) {
            host.appendChild(t);
        }
        var css = {
            left: 0,
            top: 0,
            width: 6,
            height: 6,
            right: '',
            bottom: ''
        };
        switch (ht.cellType) {
            case CellType.ColumnHeader:
                css.height = ht.panel.height;
                var col = g.columns[ht.col];
                css.left = col.pos - css.width / 2;
                if (ht.col > this._htDown.col) {
                    css.left += col.renderWidth;
                }
                if (g.rightToLeft) {
                    css.left = t.parentElement.clientWidth - css.left - css.width;
                }
                break;
            case CellType.RowHeader:
                css.width = ht.panel.width;
                var row = g.rows[ht.row];
                css.top = row.pos - css.height / 2;
                if (ht.row > this._htDown.row) {
                    css.top += row.renderHeight;
                }
                break;
        }
        wjcCore.setCss(t, css);
    };
    _MouseHandler.prototype._finishResizing = function (e) {
        var g = this._g, sel = g.selection, args = this._szArgs, ctrl = this._eMouse && this._eMouse.ctrlKey;
        if (args && !args.cancel) {
            if (args.col > -1) {
                var rc = args.col, pageX = wjcCore.mouseToPage(e).x, sz = Math.round(Math.max(_MouseHandler._SZ_MIN, this._szStart + (pageX - this._htDown.point.x) * (this._g.rightToLeft ? -1 : 1)));
                args.panel.columns[rc].width = Math.round(sz);
                g.onResizedColumn(args);
                if (ctrl && this._htDown.cellType == CellType.ColumnHeader && sel.containsColumn(rc)) {
                    for (var c = sel.leftCol; c <= sel.rightCol; c++) {
                        if (g.columns[c].allowResizing && c != rc) {
                            args = new CellRangeEventArgs(g.cells, new CellRange(-1, c));
                            if (g.onResizingColumn(args)) {
                                g.columns[c].size = g.columns[rc].size;
                                g.onResizedColumn(args);
                            }
                        }
                    }
                }
            }
            if (args.row > -1) {
                var rc = args.row, pageY = wjcCore.mouseToPage(e).y, sz = Math.round(Math.max(_MouseHandler._SZ_MIN, this._szStart + (pageY - this._htDown.point.y)));
                args.panel.rows[rc].height = Math.round(sz);
                g.onResizedRow(args);
                if (ctrl && this._htDown.cellType == CellType.RowHeader && sel.containsRow(rc)) {
                    for (var r = sel.topRow; r <= sel.bottomRow; r++) {
                        if (g.rows[r].allowResizing && r != rc) {
                            args = new CellRangeEventArgs(g.cells, new CellRange(r, -1));
                            if (g.onResizingRow(args)) {
                                g.rows[r].size = g.rows[rc].size;
                                g.onResizedRow(args);
                            }
                        }
                    }
                }
            }
        }
    };
    _MouseHandler.prototype._startListBoxSelection = function (row) {
        var rows = this._g.rows;
        this._lbSelState = !rows[row].isSelected;
        this._lbSelRows = {};
        for (var r = 0; r < rows.length; r++) {
            if (rows[r].isSelected) {
                this._lbSelRows[r] = true;
            }
        }
    };
    _MouseHandler.prototype._handleSelection = function (ht, extend) {
        var g = this._g, rows = g.rows, sel = g._selHdl.selection, rng = new CellRange(ht.row, ht.col);
        if (ht.row > -1 && ht.col > -1) {
            if (this._lbSelRows != null) {
                var changed = false;
                rng = new CellRange(ht.row, ht.col, this._htDown.row, this._htDown.col);
                for (var r = 0; r < rows.length; r++) {
                    var selected = rng.containsRow(r) ? this._lbSelState : this._lbSelRows[r] != null;
                    if (selected != rows[r].isSelected) {
                        var e = new CellRangeEventArgs(g.cells, new CellRange(r, sel.col, r, sel.col2));
                        if (g.onSelectionChanging(e)) {
                            rows[r]._setFlag(RowColFlags.Selected, selected, true);
                            changed = true;
                            g.onSelectionChanged(e);
                        }
                    }
                }
                if (changed) {
                    g.refreshCells(false, true, true);
                }
                g.scrollIntoView(ht.row, ht.col);
            }
            else {
                if (ht.cellType == CellType.RowHeader) {
                    rng.col = 0;
                    rng.col2 = g.columns.length - 1;
                }
                if (extend) {
                    rng.row2 = sel.row2;
                    rng.col2 = sel.col2;
                }
                g.select(rng);
            }
        }
    };
    _MouseHandler._SZ_MIN = 0;
    return _MouseHandler;
}());
exports._MouseHandler = _MouseHandler;
'use strict';
var _WJC_CHECKBOX = 'wj-cell-check';
var _EditHandler = (function () {
    function _EditHandler(g) {
        var _this = this;
        this._fullEdit = false;
        this._list = null;
        this._g = g;
        this._evtInput = document.createEvent('HTMLEvents');
        this._evtInput.initEvent('input', true, false);
        g.selectionChanging.addHandler(function (s, e) {
            if (_this.finishEditing()) {
                var oldrow = g._selHdl.selection.row;
                if (oldrow != e.row) {
                    var len = g.rows.length, olditem = oldrow > -1 && oldrow < len ? g.rows[oldrow].dataItem : null, newitem = e.row > -1 && e.row < len ? g.rows[e.row].dataItem : null;
                    if (olditem != newitem) {
                        _this._commitRowEdits();
                    }
                }
            }
            else {
                e.cancel = true;
            }
        });
        g.lostFocus.addHandler(function () {
            if (!g.containsFocus()) {
                var ae = wjcCore.getActiveElement();
                if (!ae || getComputedStyle(ae).position != 'fixed') {
                    _this._commitRowEdits();
                }
            }
        });
        g.addEventListener(g.hostElement, 'mousedown', function (e) {
            if (e.defaultPrevented || e.button != 0) {
                return;
            }
            if (g._mouseHdl._szRowCol) {
                return;
            }
            var sel = g.selection, ht = g.hitTest(e);
            if (ht.cellType != CellType.Cell && ht.cellType != CellType.None) {
                _this.finishEditing();
            }
            else if (ht.cellType != CellType.None) {
                var edt = wjcCore.tryCast(e.target, HTMLInputElement);
                if (_this._isNativeCheckbox(edt)) {
                    if (edt != _this.activeEditor) {
                        e.preventDefault();
                        if (_this.startEditing(false, ht.row, ht.col, true, e)) {
                            edt = _this.activeEditor;
                        }
                    }
                    if (edt && edt.type == 'checkbox' && !edt.disabled && !edt.readOnly) {
                        edt.checked = !edt.checked;
                        edt.focus();
                        _this.finishEditing();
                    }
                }
            }
        }, true);
        g.addEventListener(g.hostElement, 'click', function (e) {
            if (_this._isNativeCheckbox(e.target)) {
                e.preventDefault();
            }
        });
    }
    _EditHandler.prototype.startEditing = function (fullEdit, r, c, focus, evt) {
        if (fullEdit === void 0) { fullEdit = true; }
        var g = this._g;
        r = wjcCore.asNumber(r, true, true);
        c = wjcCore.asNumber(c, true, true);
        if (r == null) {
            r = g.selection.row;
        }
        if (c == null) {
            c = g.selection.col;
        }
        if (focus == null) {
            focus = true;
        }
        if (!this._allowEditing(r, c)) {
            return false;
        }
        var rng = g.getMergedRange(g.cells, r, c, false);
        if (!rng) {
            rng = new CellRange(r, c);
        }
        var item = g.rows[r].dataItem;
        g.select(rng, true);
        if (!g.rows[r] || item != g.rows[r].dataItem) {
            return false;
        }
        if (rng.equals(this._rng)) {
            return true;
        }
        if (this.activeEditor && !this.finishEditing()) {
            return false;
        }
        var e = new CellRangeEventArgs(g.cells, rng, evt);
        if (!g.onBeginningEdit(e)) {
            return false;
        }
        var ecv = g.editableCollectionView, itemEditStarting = false;
        if (ecv) {
            item = g.rows[r].dataItem;
            itemEditStarting = item != ecv.currentEditItem;
            if (itemEditStarting) {
                g.onRowEditStarting(e);
            }
            ecv.editItem(item);
            if (itemEditStarting) {
                g.onRowEditStarted(e);
                this._edItem = item;
            }
        }
        this._fullEdit = wjcCore.asBoolean(fullEdit);
        this._rng = rng;
        this._list = null;
        var map = g.columns[c].dataMap;
        if (map) {
            this._list = map.getDisplayValues(item);
        }
        if (rng.isSingleCell) {
            this._updateEditorCell(r, c, itemEditStarting);
        }
        else {
            g.refresh(false);
        }
        var edt = this._edt;
        if (edt) {
            if (edt.type == 'checkbox') {
                this._fullEdit = false;
            }
            else if (focus) {
                if (wjcCore.isNumber(g.getCellData(r, c, false)) && edt.value.indexOf('%') > -1) {
                    var val = edt.value, start = 0, end = val.length;
                    while (end > 0 && val[end - 1] == '%')
                        end--;
                    while (start < end && val[start] == '%')
                        start++;
                    wjcCore.setSelectionRange(edt, start, end);
                }
                else {
                    wjcCore.setSelectionRange(edt, 0, edt.value.length);
                }
                g._setFocusNoScroll(edt);
            }
            g.onPrepareCellForEdit(e);
            if (edt.disabled || edt.readOnly) {
                return false;
            }
        }
        return edt != null && !edt.disabled && !edt.readOnly;
    };
    _EditHandler.prototype.finishEditing = function (cancel) {
        if (cancel === void 0) { cancel = false; }
        var edt = this._edt;
        if (!edt) {
            this._removeListBox();
            return true;
        }
        var g = this._g, rng = this._rng, e = new CellEditEndingEventArgs(g.cells, rng), focus = g.containsFocus();
        var cstEdtHost = g.hostElement.querySelector('.wj-control.wj-state-focused');
        if (cstEdtHost) {
            var cstEdt = wjcCore.Control.getControl(cstEdtHost);
            if (cstEdt) {
                cstEdt.onLostFocus(e);
            }
        }
        e.cancel = cancel;
        if (!cancel && g.validateEdits) {
            var error = this._getValidationError();
            if (error) {
                e.cancel = true;
                var cell_1 = edt.parentElement;
                if (cell_1) {
                    wjcCore.toggleClass(cell_1, 'wj-state-invalid', true);
                    cell_1.title = error;
                    e.stayInEditMode = true;
                }
            }
        }
        if (!g.onCellEditEnding(e) && e.stayInEditMode) {
            if (focus) {
                setTimeout(function () {
                    edt.select();
                });
            }
            else {
                edt.select();
            }
            return false;
        }
        if (!e.cancel) {
            e.data = g.cells.getCellData(rng.topRow, rng.leftCol, false);
            var value = g.cellFactory.getEditorValue(g);
            for (var r = rng.topRow; r <= rng.bottomRow && r < g.rows.length; r++) {
                for (var c = rng.leftCol; c <= rng.rightCol && c < g.columns.length; c++) {
                    g.cells.setCellData(r, c, value, true, false);
                }
            }
        }
        this._edt = null;
        this._rng = null;
        this._list = null;
        this._removeListBox();
        var cell = wjcCore.closest(edt, '.wj-cell');
        if (wjcCore.contains(cell, wjcCore.getActiveElement())) {
            cell.focus();
        }
        if (e.cancel || !e.refresh) {
            this._updateEditorCell(rng.row, rng.col, false);
        }
        else {
            g.refresh(false);
        }
        if (focus) {
            g.focus();
        }
        g.onCellEditEnded(e);
        return true;
    };
    Object.defineProperty(_EditHandler.prototype, "activeEditor", {
        get: function () {
            return this._edt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_EditHandler.prototype, "editRange", {
        get: function () {
            return this._rng;
        },
        enumerable: true,
        configurable: true
    });
    _EditHandler.prototype.getClipString = function (rng) {
        var g = this._g, clipString = '', firstRow = true, firstCell = true, sm = SelectionMode;
        if (!rng) {
            rng = g.selection;
            switch (g.selectionMode) {
                case sm.Row:
                case sm.RowRange:
                    rng.col = 0;
                    rng.col2 = g.columns.length - 1;
                    break;
                case sm.ListBox:
                    rng.col = 0;
                    rng.col2 = g.columns.length - 1;
                    for (var i = 0; i < g.rows.length; i++) {
                        if (g.rows[i].isSelected && g.rows[i].isVisible) {
                            rng.row = rng.row2 = i;
                            if (clipString)
                                clipString += '\n';
                            clipString += this.getClipString(rng);
                        }
                    }
                    return clipString;
            }
        }
        rng = wjcCore.asType(rng, CellRange);
        for (var r = rng.topRow; r <= rng.bottomRow; r++) {
            if (!g.rows[r].isVisible)
                continue;
            if (!firstRow)
                clipString += '\n';
            firstRow = false;
            for (var c = rng.leftCol, firstCell_1 = true; c <= rng.rightCol; c++) {
                if (!g.columns[c].isVisible)
                    continue;
                if (!firstCell_1)
                    clipString += '\t';
                firstCell_1 = false;
                var cell = g.cells.getCellData(r, c, true).toString();
                cell = cell.replace(/\t/g, ' ');
                if (cell.indexOf('\n') > -1) {
                    cell = '"' + cell.replace(/"/g, '""') + '"';
                }
                clipString += cell;
            }
        }
        return clipString;
    };
    _EditHandler.prototype.setClipString = function (text, rng) {
        var _this = this;
        var g = this._g;
        var autoRange = rng == null, sm = SelectionMode;
        if (!rng) {
            rng = g.selection;
            switch (g.selectionMode) {
                case sm.Row:
                case sm.RowRange:
                case sm.ListBox:
                    rng.col = 0;
                    rng.col2 = g.columns.length - 1;
                    break;
            }
        }
        rng = wjcCore.asType(rng, CellRange);
        var rows = this._parseClipString(wjcCore.asString(text));
        if (autoRange && !rng.isSingleCell && rows.length) {
            this._expandClipRows(rows, rng);
        }
        var rngPaste = new CellRange(rng.topRow, rng.leftCol);
        var ecv = g.editableCollectionView, row = rng.topRow, pasted = false, e;
        g.deferUpdate(function () {
            if (ecv) {
                ecv.beginUpdate();
            }
            for (var i = 0; i < rows.length && row < g.rows.length; i++, row++) {
                if (!g.rows[row].isVisible) {
                    i--;
                    continue;
                }
                var cells = rows[i], col = rng.leftCol;
                for (var j = 0; j < cells.length && col < g.columns.length; j++, col++) {
                    if (!g.columns[col].isVisible) {
                        j--;
                        continue;
                    }
                    if (_this._allowEditing(row, col)) {
                        e = new CellRangeEventArgs(g.cells, new CellRange(row, col), cells[j]);
                        if (g.onPastingCell(e)) {
                            if (ecv) {
                                ecv.editItem(g.rows[row].dataItem);
                                _this._edItem = ecv.currentEditItem;
                            }
                            if (g.cells.setCellData(row, col, e.data)) {
                                g.onPastedCell(e);
                                pasted = true;
                            }
                        }
                        rngPaste.row2 = Math.max(rngPaste.row2, row);
                        rngPaste.col2 = Math.max(rngPaste.col2, col);
                    }
                }
            }
            if (ecv) {
                ecv.endUpdate();
            }
            g.select(rngPaste);
        });
    };
    _EditHandler.prototype._isNativeCheckbox = function (edt) {
        return edt instanceof HTMLInputElement &&
            edt.type == 'checkbox' &&
            !edt.disabled && !edt.readOnly &&
            wjcCore.hasClass(edt, _WJC_CHECKBOX) &&
            wjcCore.closest(edt, '.wj-flexgrid') == this._g.hostElement;
    };
    _EditHandler.prototype._parseClipString = function (text) {
        var rows = [];
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        text = text.replace(/\n+$/g, '');
        var start = 0, end = 0;
        for (start = 0; start < text.length; start++) {
            var quoted = text[start] == '"' && text[start + 1] >= ' ', quoting = false, done = false;
            for (end = start; end < text.length && !done; end++) {
                var char = text[end];
                switch (char) {
                    case '"':
                        if (quoted) {
                            quoting = !quoting;
                        }
                        break;
                    case '\t':
                    case '\n':
                        if (!quoting) {
                            this._parseClipCell(rows, text, start, end, char == '\n');
                            start = end;
                            done = true;
                        }
                        break;
                }
            }
            if (end == text.length) {
                this._parseClipCell(rows, text, start, text.length, false);
                break;
            }
        }
        if (rows.length == 0) {
            rows.push(['']);
        }
        return rows;
    };
    _EditHandler.prototype._parseClipCell = function (rows, text, start, end, newRow) {
        if (!rows.length) {
            rows.push([]);
        }
        var cell = text.substr(start, end - start), len = cell.length;
        if (len > 1 && cell[0] == '"' && cell[len - 1] == '"') {
            cell = cell.substr(1, len - 2);
            cell = cell.replace(/""/g, '"');
        }
        rows[rows.length - 1].push(cell);
        if (newRow) {
            rows.push([]);
        }
    };
    _EditHandler.prototype._expandClipRows = function (rows, rng) {
        var srcRows = rows.length, srcCols = 0;
        for (var i = 0; i < srcRows; i++) {
            srcCols = Math.max(srcCols, rows[i].length);
            ;
        }
        var g = this._g, dstRows = 0, dstCols = 0;
        for (var r = rng.topRow; r <= rng.bottomRow; r++) {
            if (g.rows[r].isVisible) {
                dstRows++;
            }
        }
        for (var c = rng.leftCol; c <= rng.rightCol; c++) {
            if (g.columns[c].isVisible) {
                dstCols++;
            }
        }
        if (dstRows > 1 || dstCols > 1) {
            if (dstRows == 1)
                dstRows = srcRows;
            if (dstCols == 1)
                dstCols = srcCols;
            if (dstCols % srcCols == 0 && dstRows % srcRows == 0) {
                for (var c = srcCols; c < dstCols; c++) {
                    for (var r = 0; r < srcRows; r++) {
                        rows[r].push(rows[r % srcRows][c % srcCols]);
                    }
                }
                for (var r = srcRows; r < dstRows; r++) {
                    rows.push(rows[r % srcRows]);
                }
            }
        }
    };
    _EditHandler.prototype._updateEditorCell = function (r, c, updateHdr) {
        var g = this._g, edt = g.cells.getCellElement(r, c), frozen = g._useFrozenDiv() && (r < g.frozenRows || c < g.frozenColumns);
        if (edt && !frozen && !g._hasPendingUpdates()) {
            this._updateCell(edt);
            updateHdr = updateHdr || g._getHasValidation();
            if (updateHdr && (g.headersVisibility & HeadersVisibility.Row)) {
                var p = g.rowHeaders, hdrIndex = p.columns.length - 1, hdrCell = p.getCellElement(r, hdrIndex);
                if (hdrCell) {
                    this._updateCell(hdrCell);
                }
            }
        }
        else {
            g.refresh(false);
        }
    };
    _EditHandler.prototype._updateCell = function (cell) {
        var ht = new HitTestInfo(cell, null), clsUpdating = FlexGrid._WJS_UPDATING;
        if (ht.panel) {
            wjcCore.addClass(cell, clsUpdating);
            ht.grid.cellFactory.updateCell(ht.panel, ht.row, ht.col, cell, ht.range);
            wjcCore.removeClass(cell, clsUpdating);
        }
    };
    _EditHandler.prototype._getValidationError = function () {
        var g = this._g;
        if (g._getHasValidation()) {
            var r = this._rng.row, c = this._rng.col, newVal = g.cellFactory.getEditorValue(g), oldVal = g.getCellData(r, c, false);
            if (g.setCellData(r, c, newVal, true, false)) {
                var error = g._getError(g.cells, r, c);
                g.setCellData(r, c, oldVal, true, false);
                return error;
            }
        }
        return null;
    };
    _EditHandler.prototype._allowEditing = function (r, c) {
        var g = this._g;
        if (g.isReadOnly || g.selectionMode == SelectionMode.None)
            return false;
        if (r < 0 || r >= g.rows.length || g.rows[r].isReadOnly || !g.rows[r].isVisible)
            return false;
        if (c < 0 || c >= g.columns.length)
            return false;
        var col = g._getBindingColumn(g.cells, r, g.columns[c]);
        if (!col || col.isReadOnly || !col.isVisible)
            return false;
        return true;
    };
    _EditHandler.prototype._commitRowEdits = function () {
        var g = this._g;
        if (this.finishEditing() && this._edItem) {
            var ecv = g.editableCollectionView;
            if (ecv && ecv.currentEditItem) {
                var e = new CellRangeEventArgs(g.cells, g.selection);
                g.onRowEditEnding(e);
                ecv.commitEdit();
                g.onRowEditEnded(e);
            }
            this._edItem = null;
        }
    };
    _EditHandler.prototype._keydown = function (e) {
        switch (e.keyCode) {
            case wjcCore.Key.F2:
                this._fullEdit = !this._fullEdit;
                e.preventDefault();
                return true;
            case wjcCore.Key.F4:
                this._toggleListBox(e);
                e.preventDefault();
                return true;
            case wjcCore.Key.Space:
                var edt = this._edt;
                if (edt && edt.type == 'checkbox' && !edt.disabled && !edt.readOnly) {
                    edt.checked = !edt.checked;
                    this.finishEditing();
                    e.preventDefault();
                }
                return true;
            case wjcCore.Key.Enter:
            case wjcCore.Key.Tab:
                e.preventDefault();
                return !this.finishEditing();
            case wjcCore.Key.Escape:
                e.preventDefault();
                this.finishEditing(true);
                return true;
            case wjcCore.Key.Up:
            case wjcCore.Key.Down:
            case wjcCore.Key.Left:
            case wjcCore.Key.Right:
            case wjcCore.Key.PageUp:
            case wjcCore.Key.PageDown:
            case wjcCore.Key.Home:
            case wjcCore.Key.End:
                if (this._lbx) {
                    return this._keydownListBox(e);
                }
                if (e.altKey) {
                    switch (e.keyCode) {
                        case wjcCore.Key.Up:
                        case wjcCore.Key.Down:
                            this._toggleListBox(e);
                            e.preventDefault();
                            return true;
                    }
                }
                if (!this._fullEdit) {
                    if (this.finishEditing()) {
                        return false;
                    }
                }
        }
        return true;
    };
    _EditHandler.prototype._keydownListBox = function (e) {
        var handled = true;
        if (this._lbx) {
            switch (e.keyCode) {
                case wjcCore.Key.Up:
                    if (e.altKey) {
                        this._toggleListBox(e);
                    }
                    else if (this._lbx.selectedIndex > 0) {
                        this._lbx.selectedIndex--;
                    }
                    break;
                case wjcCore.Key.Down:
                    if (e.altKey) {
                        this._toggleListBox(e);
                    }
                    else {
                        this._lbx.selectedIndex++;
                    }
                    break;
                case wjcCore.Key.Home:
                case wjcCore.Key.PageUp:
                    this._lbx.selectedIndex = 0;
                    break;
                case wjcCore.Key.End:
                case wjcCore.Key.PageDown:
                    this._lbx.selectedIndex = this._lbx.collectionView.items.length - 1;
                    break;
                default:
                    handled = false;
                    break;
            }
        }
        if (handled) {
            e.preventDefault();
            return true;
        }
        return false;
    };
    _EditHandler.prototype._keypress = function (e) {
        var edt = this._edt;
        if (edt && edt.type != 'checkbox' &&
            this._list && this._list.length > 0 && e.charCode >= 32) {
            var start = edt.selectionStart, text = edt.value.substr(0, start);
            if (e.target == edt) {
                start++;
                text += String.fromCharCode(e.charCode);
            }
            text = text.toLowerCase();
            for (var i = 0; i < this._list.length; i++) {
                if (this._list[i].toLowerCase().indexOf(text) == 0) {
                    edt.value = this._list[i];
                    wjcCore.setSelectionRange(edt, start, this._list[i].length);
                    edt.dispatchEvent(this._evtInput);
                    e.preventDefault();
                    break;
                }
            }
        }
    };
    _EditHandler.prototype._toggleListBox = function (evt, rng) {
        var g = this._g, sel = g._selHdl.selection;
        if (!rng) {
            rng = sel;
        }
        if (this._lbx) {
            this._removeListBox();
            if (sel.contains(rng)) {
                if (g.activeEditor) {
                    g.activeEditor.focus();
                }
                else if (!g.containsFocus()) {
                    g.focus();
                }
                return true;
            }
        }
        var lbxFocus = g.isTouching;
        var bcol = g._getBindingColumn(g.cells, rng.row, g.columns[rng.col]);
        if (!(tryGetModuleWijmoInput()) || !bcol.dataMap || bcol.showDropDown === false) {
            return false;
        }
        if (!(tryGetModuleWijmoInput()) || !this.startEditing(true, rng.row, rng.col, !lbxFocus, evt)) {
            return false;
        }
        this._lbx = this._createListBox();
        this._lbx.showSelection();
        if (lbxFocus) {
            this._lbx.focus();
        }
        return true;
    };
    _EditHandler.prototype._createListBox = function () {
        var _this = this;
        var g = this._g, rng = this._rng, row = g.rows[rng.row], col = g._getBindingColumn(g.cells, rng.row, g.columns[rng.col]), div = document.createElement('div'), lbx = new (tryGetModuleWijmoInput()).ListBox(div);
        this._removeListBox();
        wjcCore.addClass(div, 'wj-dropdown-panel wj-grid-listbox');
        lbx.maxHeight = row.renderHeight * 4;
        lbx.isContentHtml = col.isContentHtml;
        lbx.itemsSource = col.dataMap.getDisplayValues(row.dataItem);
        lbx.selectedValue = g.activeEditor
            ? g.activeEditor.value
            : g.getCellData(rng.row, rng.col, true);
        wjcCore.addClass(div, col.dropDownCssClass);
        lbx.addEventListener(lbx.hostElement, 'click', function () {
            _this._removeListBox();
            g.focus();
            _this.finishEditing();
        });
        lbx.lostFocus.addHandler(function () {
            _this._removeListBox();
        });
        lbx.selectedIndexChanged.addHandler(function () {
            var edt = g.activeEditor;
            if (edt) {
                edt.value = _this._lbx.selectedValue;
                edt.dispatchEvent(_this._evtInput);
                wjcCore.setSelectionRange(edt, 0, edt.value.length);
            }
        });
        var cell = g.cells.getCellElement(rng.row, rng.col);
        if (cell) {
            wjcCore.showPopup(div, cell, false, false, false);
        }
        else {
            wjcCore.showPopup(div, g.getCellBoundingRect(rng.row, rng.col));
            div[wjcCore.Control._OWNR_KEY] = g.hostElement;
        }
        return lbx;
    };
    _EditHandler.prototype._removeListBox = function () {
        var lbx = this._lbx;
        if (lbx) {
            this._lbx = null;
            wjcCore.hidePopup(lbx.hostElement, function () {
                lbx.dispose();
            });
        }
    };
    return _EditHandler;
}());
exports._EditHandler = _EditHandler;
'use strict';
var _AddNewHandler = (function () {
    function _AddNewHandler(g) {
        this._nrt = new _NewRowTemplate();
        this._g = g;
        this._keydownBnd = this._keydown.bind(this);
        this._attach();
    }
    Object.defineProperty(_AddNewHandler.prototype, "newRowAtTop", {
        get: function () {
            return this._top;
        },
        set: function (value) {
            if (value != this.newRowAtTop) {
                this._top = wjcCore.asBoolean(value);
                this.updateNewRowTemplate();
            }
        },
        enumerable: true,
        configurable: true
    });
    _AddNewHandler.prototype.updateNewRowTemplate = function () {
        var g = this._g, ecv = g.editableCollectionView, rows = g.rows;
        var needTemplate = ecv && ecv.canAddNew && g.allowAddNew && !g.isReadOnly;
        var index = rows.indexOf(this._nrt), newRowPos = this._top ? 0 : rows.length - 1, insert = false;
        if (!needTemplate && index > -1) {
            var sel = g.selection;
            if (sel.row == index) {
                g.select(sel.row - 1, sel.col);
            }
            rows.removeAt(index);
        }
        else if (needTemplate) {
            if (index < 0) {
                insert = true;
            }
            else if (index != newRowPos) {
                rows.removeAt(index);
                insert = true;
            }
            if (insert) {
                if (this._top) {
                    rows.insert(0, this._nrt);
                }
                else {
                    rows.push(this._nrt);
                }
            }
            if (this._nrt) {
                this._nrt._setFlag(RowColFlags.ParentCollapsed, false);
            }
        }
    };
    _AddNewHandler.prototype._attach = function () {
        var g = this._g;
        if (g) {
            g.beginningEdit.addHandler(this._beginningEdit, this);
            g.pastingCell.addHandler(this._beginningEdit, this);
            g.rowEditEnded.addHandler(this._rowEditEnded, this);
            g.loadedRows.addHandler(this.updateNewRowTemplate, this);
            g.hostElement.addEventListener('keydown', this._keydownBnd, true);
        }
    };
    _AddNewHandler.prototype._detach = function () {
        var g = this._g;
        if (g) {
            g.beginningEdit.removeHandler(this._beginningEdit);
            g.pastingCell.removeHandler(this._beginningEdit);
            g.rowEditEnded.removeHandler(this._rowEditEnded);
            g.loadedRows.removeHandler(this.updateNewRowTemplate);
            g.hostElement.removeEventListener('keydown', this._keydownBnd, true);
        }
    };
    _AddNewHandler.prototype._keydown = function (e) {
        if (!e.defaultPrevented && e.keyCode == wjcCore.Key.Escape) {
            if (this._g.activeEditor == null && this._top && this._nrt.dataItem) {
                this._nrt.dataItem = null;
                this._g.invalidate();
            }
        }
    };
    _AddNewHandler.prototype._beginningEdit = function (sender, e) {
        if (!e.cancel) {
            var row = this._g.rows[e.row];
            if (wjcCore.tryCast(row, _NewRowTemplate)) {
                var ecv = this._g.editableCollectionView;
                if (ecv && ecv.canAddNew) {
                    if (this._top) {
                        if (this._nrt.dataItem == null) {
                            var newItem = null, src = ecv.sourceCollection, creator = ecv['newItemCreator'];
                            if (wjcCore.isFunction(creator)) {
                                newItem = creator();
                            }
                            else if (src && src.length) {
                                newItem = new src[0].constructor();
                            }
                            else {
                                newItem = {};
                            }
                            this._nrt.dataItem = newItem;
                        }
                    }
                    else {
                        var newItem = (ecv.currentAddItem && ecv.currentAddItem == row.dataItem)
                            ? ecv.currentAddItem
                            : ecv.addNew();
                        ecv.moveCurrentTo(newItem);
                        this.updateNewRowTemplate();
                        this._g.refresh(true);
                        this._g.onRowAdded(e);
                        if (e.cancel) {
                            ecv.cancelNew();
                        }
                    }
                }
            }
        }
    };
    _AddNewHandler.prototype._rowEditEnded = function (sender, e) {
        var _this = this;
        var ecv = this._g.editableCollectionView, item = this._nrt.dataItem;
        if (ecv) {
            if (ecv.isAddingNew) {
                ecv.commitNew();
            }
            else if (item && !e.cancel) {
                this._nrt.dataItem = null;
                var newItem = ecv.addNew();
                for (var k in item) {
                    newItem[k] = item[k];
                }
                this._g.onRowAdded(e);
                if (e.cancel) {
                    ecv.cancelNew();
                }
                else {
                    ecv.commitNew();
                }
                setTimeout(function () {
                    _this._g.select(0, _this._g.columns.firstVisibleIndex);
                    _this.updateNewRowTemplate();
                }, 20);
            }
        }
    };
    return _AddNewHandler;
}());
exports._AddNewHandler = _AddNewHandler;
var _NewRowTemplate = (function (_super) {
    __extends(_NewRowTemplate, _super);
    function _NewRowTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return _NewRowTemplate;
}(Row));
exports._NewRowTemplate = _NewRowTemplate;
'use strict';
var _ImeHandler = (function () {
    function _ImeHandler(g) {
        this._g = g;
        this._tbx = wjcCore.createElement('<input class="wj-grid-editor wj-form-control wj-grid-ime"/>');
        wjcCore.setCss(this._tbx, _ImeHandler._cssHidden);
        g.cells.hostElement.parentElement.appendChild(this._tbx);
        this._updateImeFocus();
        var host = g.hostElement;
        g.addEventListener(this._tbx, 'compositionstart', this._compositionstart.bind(this));
        g.addEventListener(host, 'blur', this._updateImeFocus.bind(this), true);
        g.addEventListener(host, 'focus', this._updateImeFocus.bind(this), true);
        g.addEventListener(host, 'mousedown', this._mousedown.bind(this), true);
        g.addEventListener(host, 'mouseup', this._mouseup.bind(this), true);
        g.cellEditEnded.addHandler(this._cellEditEnded, this);
        g.selectionChanged.addHandler(this._updateImeFocus, this);
    }
    _ImeHandler.prototype.dispose = function () {
        var g = this._g, host = g.hostElement;
        g.removeEventListener(this._tbx, 'compositionstart');
        g.removeEventListener(host, 'blur');
        g.removeEventListener(host, 'focus');
        g.removeEventListener(host, 'mousedown');
        g.removeEventListener(host, 'mouseup');
        g.cellEditEnded.removeHandler(this._cellEditEnded);
        g.selectionChanged.removeHandler(this._updateImeFocus);
        wjcCore.removeChild(this._tbx);
    };
    _ImeHandler.prototype._cellEditEnded = function () {
        wjcCore.setCss(this._tbx, _ImeHandler._cssHidden);
        this._tbx.value = '';
    };
    _ImeHandler.prototype._compositionstart = function () {
        var _this = this;
        var g = this._g;
        if (g.activeEditor == null) {
            var sel = g._selHdl.selection;
            if (g.startEditing(false, sel.row, sel.col, false)) {
                sel = g.editRange;
                var host = g.cells.hostElement, left = g.columns[sel.col].pos + host.offsetLeft, top_1 = g.rows[sel.row].pos + host.offsetTop, rc = g.getCellBoundingRect(sel.row, sel.col);
                if (!sel.isSingleCell) {
                    var cell = g.cells.getCellElement(sel.row, sel.col);
                    rc.width = cell.offsetWidth;
                    rc.height = cell.offsetHeight;
                }
                if (sel.row < g.frozenRows) {
                    top_1 += host.parentElement.scrollTop;
                }
                if (sel.col < g.frozenColumns) {
                    left += host.parentElement.scrollLeft;
                }
                var edt_1 = g.activeEditor, zIndex = edt_1 && edt_1.parentElement ? edt_1.parentElement.style.zIndex : '';
                wjcCore.setCss(this._tbx, {
                    position: 'absolute',
                    pointerEvents: '',
                    opacity: '',
                    left: left,
                    top: top_1,
                    width: rc.width - 1,
                    height: rc.height - 1,
                    zIndex: zIndex
                });
                if (edt_1 instanceof HTMLInputElement) {
                    var atts = ['minLength', 'maxLength', 'pattern'];
                    atts.forEach(function (att) {
                        wjcCore.setAttribute(_this._tbx, att, edt_1.getAttribute(att));
                    });
                }
                g._edtHdl._edt = this._tbx;
            }
        }
    };
    _ImeHandler.prototype._mousedown = function (e) {
        this._mouseDown = true;
        this._updateImeFocus();
    };
    _ImeHandler.prototype._mouseup = function (e) {
        this._mouseDown = false;
        this._updateImeFocus();
    };
    _ImeHandler.prototype._updateImeFocus = function () {
        var g = this._g, ae = wjcCore.getActiveElement();
        if (!g.activeEditor && !g.isTouching && !this._mouseDown &&
            wjcCore.contains(g.hostElement, ae)) {
            var tbx = this._tbx;
            if (this._enableIme()) {
                if (ae != tbx) {
                    tbx.disabled = false;
                    tbx.select();
                }
            }
            else {
                tbx.disabled = true;
            }
        }
    };
    _ImeHandler.prototype._enableIme = function () {
        var g = this._g, sel = g.selection, col = sel.isValid ? g._getBindingColumn(g.cells, sel.row, g.columns[sel.col]) : null;
        if (!g.canEditCell(sel.row, sel.col)) {
            return false;
        }
        if (!col || col.dataType == wjcCore.DataType.Boolean) {
            return false;
        }
        return true;
    };
    _ImeHandler._cssHidden = {
        position: 'fixed',
        pointerEvents: 'none',
        opacity: 0,
        left: -10,
        top: -10,
        width: 0
    };
    return _ImeHandler;
}());
exports._ImeHandler = _ImeHandler;
//# sourceMappingURL=wijmo.grid.js.map