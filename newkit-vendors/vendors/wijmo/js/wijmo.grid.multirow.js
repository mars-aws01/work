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
var wjcSelf = require("wijmo/wijmo.grid.multirow");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['multirow'] = wjcSelf;
'use strict';
var _MultiRow = (function (_super) {
    __extends(_MultiRow, _super);
    function _MultiRow(dataItem, dataIndex, recordIndex) {
        var _this = _super.call(this, dataItem) || this;
        _this._idxData = dataIndex;
        _this._idxRecord = recordIndex;
        return _this;
    }
    Object.defineProperty(_MultiRow.prototype, "recordIndex", {
        get: function () {
            return this._idxRecord;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MultiRow.prototype, "dataIndex", {
        get: function () {
            return this._idxData;
        },
        enumerable: true,
        configurable: true
    });
    return _MultiRow;
}(wjcGrid.Row));
exports._MultiRow = _MultiRow;
'use strict';
var _Cell = (function (_super) {
    __extends(_Cell, _super);
    function _Cell(options) {
        var _this = _super.call(this) || this;
        _this._row = _this._col = 0;
        _this._rowspan = _this._colspan = 1;
        if (options) {
            wjcCore.copy(_this, options);
        }
        return _this;
    }
    Object.defineProperty(_Cell.prototype, "colspan", {
        get: function () {
            return this._colspan;
        },
        set: function (value) {
            this._colspan = wjcCore.asInt(value, false, true);
        },
        enumerable: true,
        configurable: true
    });
    return _Cell;
}(wjcGrid.Column));
exports._Cell = _Cell;
'use strict';
var _CellGroup = (function (_super) {
    __extends(_CellGroup, _super);
    function _CellGroup(grid, options) {
        var _this = _super.call(this) || this;
        _this._colstart = 0;
        _this._g = grid;
        if (options) {
            wjcCore.copy(_this, options);
        }
        if (!_this._cells) {
            throw 'Cell group with no cells?';
        }
        var r = 0, c = 0, totalCellSpan = 0;
        for (var i = 0; i < _this._cells.length; i++) {
            var cell = _this._cells[i];
            if (c + cell.colspan > _this._colspan) {
                r++;
                c = 0;
            }
            cell._row = r;
            cell._col = c;
            c += cell.colspan;
            totalCellSpan += cell.colspan;
        }
        _this._rowspan = r + 1;
        if (_this._colspan > totalCellSpan) {
            _this._colspan = totalCellSpan;
        }
        for (var i = 0; i < _this._cells.length; i++) {
            var cell = _this._cells[i];
            if (i == _this._cells.length - 1 || _this._cells[i + 1]._row > cell._row) {
                c = cell._col;
                cell._colspan = _this._colspan - c;
            }
        }
        return _this;
    }
    _CellGroup.prototype._copy = function (key, value) {
        if (key == 'cells') {
            this._cells = [];
            if (wjcCore.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    var cell = new _Cell(value[i]);
                    if (!value[i].header && cell.binding) {
                        value.header = wjcCore.toHeaderCase(cell.binding);
                    }
                    this._cells.push(cell);
                    this._colspan = Math.max(this._colspan, cell.colspan);
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(_CellGroup.prototype, "cells", {
        get: function () {
            return this._cells;
        },
        enumerable: true,
        configurable: true
    });
    _CellGroup.prototype.closeGroup = function (rowsPerItem) {
        if (rowsPerItem > this._rowspan) {
            for (var i = 0; i < this._cells.length; i++) {
                var cell = this._cells[i];
                if (cell._row == this._rowspan - 1) {
                    cell._rowspan = rowsPerItem - cell._row;
                }
            }
            this._rowspan = rowsPerItem;
        }
        this._cols = new wjcGrid.ColumnCollection(this._g, this._g.columns.defaultSize);
        this._rng = new Array(rowsPerItem * this._colspan);
        for (var i = 0; i < this._cells.length; i++) {
            var cell = this._cells[i];
            for (var r = 0; r < cell._rowspan; r++) {
                for (var c = 0; c < cell._colspan; c++) {
                    var index = (cell._row + r) * this._colspan + (cell._col) + c;
                    this._cols.setAt(index, cell);
                    var rng = new wjcGrid.CellRange(0 - r, 0 - c, 0 - r + cell._rowspan - 1, 0 - c + cell._colspan - 1);
                    if (!rng.isSingleCell) {
                        this._rng[index] = rng;
                    }
                }
            }
        }
        this._rng[-1] = new wjcGrid.CellRange(0, this._colstart, 0, this._colstart + this._colspan - 1);
    };
    _CellGroup.prototype.getColumnWidth = function (c) {
        for (var i = 0; i < this._cells.length; i++) {
            var cell = this._cells[i];
            if (cell._col == c && cell.colspan == 1) {
                return cell.width;
            }
        }
        return null;
    };
    _CellGroup.prototype.getMergedRange = function (p, r, c) {
        if (r < 0) {
            return this._rng[-1];
        }
        var row = p.rows[r], rs = row.recordIndex != null ? row.recordIndex : r % this._rowspan, cs = c - this._colstart, rng = this._rng[rs * this._colspan + cs];
        if (p.cellType == wjcGrid.CellType.ColumnHeader) {
            r++;
        }
        return rng
            ? new wjcGrid.CellRange(r + rng.row, c + rng.col, r + rng.row2, c + rng.col2)
            : null;
    };
    _CellGroup.prototype.getBindingColumn = function (p, r, c) {
        if (r < 0) {
            return this;
        }
        var row = p.rows[r], rs = (row && row.recordIndex != null) ? row.recordIndex : r % this._rowspan, cs = c - this._colstart;
        return this._cols[rs * this._colspan + cs];
    };
    _CellGroup.prototype.getColumn = function (name) {
        return this._cols.getColumn(name);
    };
    return _CellGroup;
}(_Cell));
exports._CellGroup = _CellGroup;
'use strict';
var _MergeManager = (function (_super) {
    __extends(_MergeManager, _super);
    function _MergeManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _MergeManager.prototype.getMergedRange = function (p, r, c, clip) {
        if (clip === void 0) { clip = true; }
        var grid = p.grid;
        switch (p.cellType) {
            case wjcGrid.CellType.Cell:
            case wjcGrid.CellType.RowHeader:
                if (p.rows[r] instanceof wjcGrid.GroupRow) {
                    return _super.prototype.getMergedRange.call(this, p, r, c, clip);
                }
        }
        switch (p.cellType) {
            case wjcGrid.CellType.Cell:
            case wjcGrid.CellType.ColumnHeader:
                var group = grid._cellGroupsByColumn[c];
                wjcCore.assert(group instanceof _CellGroup, 'Failed to get the group!');
                var rng = (p.cellType == wjcGrid.CellType.ColumnHeader)
                    ? group.getMergedRange(p, r - 1, c)
                    : group.getMergedRange(p, r, c);
                if (rng && p.columns.frozen) {
                    var frz = p.columns.frozen;
                    if (rng.col < frz && rng.col2 >= frz) {
                        if (c < frz) {
                            rng.col2 = frz - 1;
                        }
                        else {
                            rng.col = frz;
                        }
                    }
                }
                if (rng && p.rows.frozen && p.cellType == wjcGrid.CellType.Cell) {
                    var frz = p.rows.frozen;
                    if (rng.row < frz && rng.row2 >= frz) {
                        if (r < frz) {
                            rng.row2 = frz - 1;
                        }
                        else {
                            rng.row = frz;
                        }
                    }
                }
                return rng;
            case wjcGrid.CellType.RowHeader:
                var rpi = grid._rowsPerItem, row = p.rows[r], top_1 = r - row.recordIndex, bot = Math.min(top_1 + rpi - 1, p.rows.length - 1);
                return new wjcGrid.CellRange(top_1, 0, bot, p.columns.length - 1);
            case wjcGrid.CellType.TopLeft:
                return new wjcGrid.CellRange(0, 0, p.rows.length - 1, p.columns.length - 1);
        }
        return null;
    };
    return _MergeManager;
}(wjcGrid.MergeManager));
exports._MergeManager = _MergeManager;
'use strict';
var _AddNewHandler = (function (_super) {
    __extends(_AddNewHandler, _super);
    function _AddNewHandler(grid) {
        var _this = this;
        var old = grid._addHdl;
        old._detach();
        _this = _super.call(this, grid) || this;
        return _this;
    }
    _AddNewHandler.prototype.updateNewRowTemplate = function () {
        var ecv = this._g.editableCollectionView, g = this._g, rows = g.rows;
        var needTemplate = ecv && ecv.canAddNew && g.allowAddNew && !g.isReadOnly;
        var hasTemplate = true;
        for (var i = rows.length - g.rowsPerItem; i < rows.length; i++) {
            if (!(rows[i] instanceof _NewRowTemplate)) {
                hasTemplate = false;
                break;
            }
        }
        if (needTemplate && !hasTemplate) {
            for (var i = 0; i < g.rowsPerItem; i++) {
                var nrt = new _NewRowTemplate(i);
                rows.push(nrt);
            }
        }
        if (!needTemplate && hasTemplate) {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i] instanceof _NewRowTemplate) {
                    rows.removeAt(i);
                    i--;
                }
            }
        }
    };
    return _AddNewHandler;
}(wjcGrid._AddNewHandler));
exports._AddNewHandler = _AddNewHandler;
var _NewRowTemplate = (function (_super) {
    __extends(_NewRowTemplate, _super);
    function _NewRowTemplate(indexInRecord) {
        var _this = _super.call(this) || this;
        _this._idxRecord = indexInRecord;
        return _this;
    }
    Object.defineProperty(_NewRowTemplate.prototype, "recordIndex", {
        get: function () {
            return this._idxRecord;
        },
        enumerable: true,
        configurable: true
    });
    return _NewRowTemplate;
}(wjcGrid._NewRowTemplate));
'use strict';
var MultiRow = (function (_super) {
    __extends(MultiRow, _super);
    function MultiRow(element, options) {
        var _this = _super.call(this, element) || this;
        _this._rowsPerItem = 1;
        _this._cellBindingGroups = [];
        _this._centerVert = true;
        _this._collapsedHeaders = false;
        _this.collapsedHeadersChanging = new wjcCore.Event();
        _this.collapsedHeadersChanged = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-multirow');
        var hdr = _this.columnHeaders.hostElement.parentElement, btn = wjcCore.createElement('<div class="wj-hdr-collapse"><span></span></div>');
        btn.style.display = 'none';
        hdr.appendChild(btn);
        _this._btnCollapse = btn;
        _this._updateButtonGlyph();
        _this.addEventListener(btn, 'mousedown', function (e) {
            switch (_this.collapsedHeaders) {
                case null:
                case false:
                    _this._collapsedHeadersWasNull = _this.collapsedHeaders == null;
                    _this.collapsedHeaders = true;
                    break;
                case true:
                    _this.collapsedHeaders = _this._collapsedHeadersWasNull ? null : false;
                    break;
            }
            e.preventDefault();
            _this.focus();
        }, true);
        _this.autoGenerateColumns = false;
        _this.mergeManager = new _MergeManager(_this);
        var host = _this.hostElement;
        _this.removeEventListener(host, 'dragover');
        _this.removeEventListener(host, 'dragleave');
        _this.removeEventListener(host, 'dragdrop');
        _this._addHdl = new _AddNewHandler(_this);
        _this.formatItem.addHandler(_this._formatItem, _this);
        _this.addEventListener(_this.rowHeaders.hostElement, 'click', function (e) {
            if (!e.defaultPrevented && _this.selectionMode != wjcGrid.SelectionMode.None) {
                var ht = _this.hitTest(e);
                if (ht.panel == _this.rowHeaders && ht.row > -1) {
                    var sel = _this.selection, topRow = _this.rows[sel.topRow], botRow = _this.selectionMode != wjcGrid.SelectionMode.Row
                        ? _this.rows[sel.bottomRow]
                        : topRow;
                    if (topRow && topRow.recordIndex != null) {
                        var top_2 = topRow.index - topRow.recordIndex, bot = botRow.index - botRow.recordIndex + _this.rowsPerItem - 1, cnt = _this.columns.length - 1, rng = sel.row != sel.topRow
                            ? new wjcGrid.CellRange(bot, 0, top_2, cnt)
                            : new wjcGrid.CellRange(top_2, 0, bot, cnt);
                        _this.select(rng);
                        e.preventDefault();
                    }
                }
            }
        }, true);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(MultiRow.prototype, "layoutDefinition", {
        get: function () {
            return this._layoutDef;
        },
        set: function (value) {
            this._layoutDef = wjcCore.asArray(value);
            this._rowsPerItem = 1;
            this._cellBindingGroups = this._parseCellGroups(this._layoutDef);
            for (var i = 0; i < this._cellBindingGroups.length; i++) {
                var group = this._cellBindingGroups[i];
                this._rowsPerItem = Math.max(this._rowsPerItem, group._rowspan);
            }
            this._bindGrid(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiRow.prototype, "rowsPerItem", {
        get: function () {
            return this._rowsPerItem;
        },
        enumerable: true,
        configurable: true
    });
    MultiRow.prototype.getBindingColumn = function (p, r, c) {
        return this._getBindingColumn(p, r, p.columns[c]);
    };
    MultiRow.prototype.getColumn = function (name) {
        var groups = this._cellBindingGroups;
        for (var i = 0; i < groups.length; i++) {
            var col = groups[i].getColumn(name);
            groups[i].getBindingColumn;
            if (col) {
                return col;
            }
        }
        return null;
    };
    Object.defineProperty(MultiRow.prototype, "centerHeadersVertically", {
        get: function () {
            return this._centerVert;
        },
        set: function (value) {
            if (value != this._centerVert) {
                this._centerVert = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiRow.prototype, "collapsedHeaders", {
        get: function () {
            return this._collapsedHeaders;
        },
        set: function (value) {
            if (value != this._collapsedHeaders) {
                var e = new wjcCore.CancelEventArgs();
                if (this.onCollapsedHeadersChanging(e)) {
                    this._collapsedHeaders = wjcCore.asBoolean(value, true);
                    this._updateCollapsedHeaders();
                    this._updateButtonGlyph();
                    this.onCollapsedHeadersChanged(e);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiRow.prototype, "showHeaderCollapseButton", {
        get: function () {
            return this._btnCollapse.style.display == '';
        },
        set: function (value) {
            if (value != this.showHeaderCollapseButton) {
                this._btnCollapse.style.display = wjcCore.asBoolean(value) ? '' : 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    MultiRow.prototype.onCollapsedHeadersChanging = function (e) {
        this.collapsedHeadersChanging.raise(this, e);
        return !e.cancel;
    };
    MultiRow.prototype.onCollapsedHeadersChanged = function (e) {
        this.collapsedHeadersChanged.raise(this, e);
    };
    MultiRow.prototype._addBoundRow = function (items, index) {
        var item = items[index];
        for (var i = 0; i < this._rowsPerItem; i++) {
            this.rows.push(new _MultiRow(item, index, i));
        }
    };
    MultiRow.prototype._addNode = function (items, index, level) {
        this._addBoundRow(items, index);
    };
    MultiRow.prototype._bindColumns = function () {
        var rows = this.columnHeaders.rows, cnt = this._rowsPerItem + 1;
        while (rows.length > cnt) {
            rows.removeAt(rows.length - 1);
        }
        while (rows.length < cnt) {
            rows.push(new wjcGrid.Row());
        }
        this._updateCollapsedHeaders();
        this.columns.clear();
        this._cellGroupsByColumn = {};
        var item = null, cv = this.collectionView;
        if (cv && cv.sourceCollection && cv.sourceCollection.length) {
            item = cv.sourceCollection[0];
        }
        if (this._cellBindingGroups) {
            for (var i = 0; i < this._cellBindingGroups.length; i++) {
                var group = this._cellBindingGroups[i];
                for (var c = 0; c < group._colspan; c++) {
                    this._cellGroupsByColumn[this.columns.length] = group;
                    var col = new wjcGrid.Column();
                    for (var cellIndex = 0; cellIndex < group.cells.length; cellIndex++) {
                        var cell = group.cells[cellIndex];
                        if (cell._col == c) {
                            if (cell.width) {
                                col.width = cell.width;
                            }
                            if (cell.binding) {
                                col.binding = cell.binding;
                            }
                            if (cell.format) {
                                col.format = cell.format;
                            }
                            if (cell.aggregate != wjcCore.Aggregate.None) {
                                col.aggregate = cell.aggregate;
                            }
                            break;
                        }
                    }
                    this.columns.push(col);
                }
            }
        }
    };
    MultiRow.prototype._updateCollapsedHeaders = function () {
        var rows = this.columnHeaders.rows, ch = this.collapsedHeaders;
        rows[0].visible = ch != false;
        for (var i = 1; i < rows.length; i++) {
            rows[i].visible = ch != true;
        }
    };
    MultiRow.prototype._updateColumnTypes = function () {
        _super.prototype._updateColumnTypes.call(this);
        var view = this.collectionView;
        if (wjcCore.hasItems(view)) {
            var item = view.items[0];
            for (var i = 0; i < this._cellBindingGroups.length; i++) {
                var group = this._cellBindingGroups[i];
                for (var c = 0; c < group._cols.length; c++) {
                    var col = group._cols[c];
                    if (col.dataType == null && col._binding) {
                        col.dataType = wjcCore.getType(col._binding.getValue(item));
                    }
                }
            }
        }
    };
    MultiRow.prototype._getBindingColumn = function (p, r, c) {
        if (p == this.cells || p == this.columnHeaders) {
            var group = this._cellGroupsByColumn[c.index];
            if (p == this.columnHeaders) {
                r--;
            }
            c = group.getBindingColumn(p, r, c.index);
        }
        return c;
    };
    MultiRow.prototype._cvCollectionChanged = function (sender, e) {
        if (this.autoGenerateColumns && this.columns.length == 0) {
            this._bindGrid(true);
        }
        else {
            switch (e.action) {
                case wjcCore.NotifyCollectionChangedAction.Change:
                    this.invalidate();
                    break;
                case wjcCore.NotifyCollectionChangedAction.Add:
                    if (e.index == this.collectionView.items.length - 1) {
                        var index = this.rows.length;
                        while (index > 0 && this.rows[index - 1] instanceof wjcGrid._NewRowTemplate) {
                            index--;
                        }
                        for (var i = 0; i < this._rowsPerItem; i++) {
                            this.rows.insert(index + i, new _MultiRow(e.item, e.index, i));
                        }
                        return;
                    }
                    wjcCore.assert(false, 'added item should be the last one.');
                    break;
                default:
                    this._bindGrid(false);
                    break;
            }
        }
    };
    MultiRow.prototype._parseCellGroups = function (groups) {
        var arr = [], rowsPerItem = 1;
        if (groups) {
            for (var i = 0, colstart = 0; i < groups.length; i++) {
                var group = new _CellGroup(this, groups[i]);
                group._colstart = colstart;
                colstart += group._colspan;
                rowsPerItem = Math.max(rowsPerItem, group._rowspan);
                arr.push(group);
            }
            for (var i = 0; i < arr.length; i++) {
                arr[i].closeGroup(rowsPerItem);
            }
        }
        return arr;
    };
    MultiRow.prototype._formatItem = function (s, e) {
        var rpi = this._rowsPerItem, ct = e.panel.cellType, row = e.panel.rows[e.range.row], row2 = e.panel.rows[e.range.row2];
        if (ct == wjcGrid.CellType.ColumnHeader) {
            wjcCore.toggleClass(e.cell, 'wj-group-header', e.range.row == 0);
        }
        if (ct == wjcGrid.CellType.Cell || ct == wjcGrid.CellType.ColumnHeader) {
            var group = this._cellGroupsByColumn[e.col];
            wjcCore.assert(group instanceof _CellGroup, 'Failed to get the group!');
            wjcCore.toggleClass(e.cell, 'wj-group-start', group._colstart == e.range.col);
            wjcCore.toggleClass(e.cell, 'wj-group-end', group._colstart + group._colspan - 1 == e.range.col2);
        }
        if (rpi > 1) {
            if (ct == wjcGrid.CellType.Cell || ct == wjcGrid.CellType.RowHeader) {
                wjcCore.toggleClass(e.cell, 'wj-record-start', row instanceof _MultiRow ? row.recordIndex == 0 : false);
                wjcCore.toggleClass(e.cell, 'wj-record-end', row2 instanceof _MultiRow ? row2.recordIndex == rpi - 1 : false);
            }
        }
        if (this.showAlternatingRows) {
            wjcCore.toggleClass(e.cell, 'wj-alt', row instanceof _MultiRow ? row.dataIndex % 2 != 0 : false);
        }
        if (this._centerVert) {
            if (e.cell.hasChildNodes && e.range.rowSpan > 1) {
                var div = wjcCore.createElement('<div style="display:table-cell;vertical-align:middle"></div>'), rng = document.createRange();
                rng.selectNodeContents(e.cell);
                rng.surroundContents(div);
                wjcCore.setCss(e.cell, {
                    display: 'table',
                    tableLayout: 'fixed',
                    paddingTop: 0,
                    paddingBottom: 0
                });
            }
            else {
                var padding = e.cell.querySelector('input') ? '0px' : '';
                wjcCore.setCss(e.cell, {
                    display: '',
                    tableLayout: '',
                    paddingTop: padding,
                    paddingBottom: padding
                });
            }
        }
    };
    MultiRow.prototype._updateButtonGlyph = function () {
        var span = this._btnCollapse.querySelector('span');
        if (span instanceof HTMLElement) {
            span.className = this.collapsedHeaders ? 'wj-glyph-left' : 'wj-glyph-down-left';
        }
    };
    return MultiRow;
}(wjcGrid.FlexGrid));
exports.MultiRow = MultiRow;
//# sourceMappingURL=wijmo.grid.multirow.js.map